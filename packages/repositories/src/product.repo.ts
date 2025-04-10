import { Context, Effect, Layer, Redacted } from 'effect'
import type { ParseError } from 'effect/ParseResult'
import type { Scope } from 'effect/Scope'

import type { EntityProduct } from '@demo-shop/domain'
import { logRepos } from '@demo-shop/utils-logging'
import { ApiConfig, type ApiResponseProductGetAll } from './api.js'
import type {
	UsecaseProductsGetAll,
	UsecaseProductsGetOne,
} from './product.usecase.js'

export class RepoProduct extends Context.Tag('RepoProduct')<
	RepoProduct,
	{
		readonly getAll: ({
			search,
			limit,
			offset,
		}: UsecaseProductsGetAll) => Effect.Effect<
			ApiResponseProductGetAll,
			Error | ParseError,
			Scope
		>
		readonly getById: (
			id: UsecaseProductsGetOne,
		) => Effect.Effect<EntityProduct, Error | ParseError, Scope>
	}
>() {
	static Live = Layer.effect(
		this,
		Effect.gen(function* () {
			const apiConfig = yield* ApiConfig

			return {
				getAll: ({ search, limit, offset }: UsecaseProductsGetAll) =>
					Effect.tryPromise({
						try: async () => {
							const queryParams = new URLSearchParams()
							const targetLimit = limit ?? 20
							const initialOffset = offset ?? 0
							let currentOffset = initialOffset
							const uniqueProducts: Array<ApiResponseProductGetAll[number]> = []
							const seenIds = new Set<string>()

							logRepos.info('Starting product fetch with params', {
								targetLimit,
								initialOffset,
								search,
							})

							while (uniqueProducts.length < targetLimit) {
								queryParams.delete('offset')
								queryParams.delete('limit')

								if (search) {
									queryParams.append('search', search)
								}

								// Request more products than needed to account for potential duplicates
								const fetchLimit = Math.min(targetLimit * 2, 100)
								queryParams.append('limit', fetchLimit.toString())
								queryParams.append('offset', currentOffset.toString())

								const queryString = queryParams.toString()
								const endpoint = queryString
									? `/products?${queryString}`
									: '/products'

								const response = await fetch(
									`${apiConfig.baseUrl}${endpoint}`,
									{
										headers: {
											'x-api-key': Redacted.value(apiConfig.key),
										},
									},
								)

								logRepos.info('API response', {
									status: response.status,
									ok: response.ok,
									statusText: response.statusText,
								})

								if (!response.ok) {
									throw new Error(`HTTP error status: ${response.status}`)
								}

								const data = (await response.json()) as ApiResponseProductGetAll

								// Log useful response info, not the entire object
								logRepos.info('API data received', {
									receivedCount: Array.isArray(data)
										? data.length
										: 'not an array',
									sample: Array.isArray(data) ? data.slice(0, 1) : null,
									uniqueIdsCount: seenIds.size,
								})

								// If we got no more products, break the loop
								if (!Array.isArray(data) || data.length === 0) {
									logRepos.info('No more products available')
									break
								}

								// Add only unique products
								let newUniqueCount = 0
								for (const product of data) {
									if (!seenIds.has(product.id)) {
										seenIds.add(product.id)
										uniqueProducts.push(product)
										newUniqueCount++
										if (uniqueProducts.length >= targetLimit) {
											break
										}
									}
								}

								// If we didn't get enough unique products, fetch more
								if (uniqueProducts.length < targetLimit) {
									currentOffset += data.length
									logRepos.info('Fetching more products', {
										nextOffset: currentOffset,
										remainingNeeded: targetLimit - uniqueProducts.length,
									})
								}
							}

							logRepos.info('Finished fetching products', {
								finalCount: uniqueProducts.length,
								targetLimit,
								totalFetched: seenIds.size,
							})

							return uniqueProducts
						},
						catch: error => error as Error,
					}),
				getById: (id: UsecaseProductsGetOne) =>
					Effect.tryPromise({
						try: async () => {
							const response = await fetch(
								`${apiConfig.baseUrl}/products/${id}`,
								{
									headers: {
										'x-api-key': Redacted.value(apiConfig.key),
									},
								},
							)

							// Log useful response info instead of entire object
							logRepos.info('API response (getById)', {
								id,
								status: response.status,
								ok: response.ok,
								statusText: response.statusText,
							})

							if (!response.ok) {
								throw new Error(`HTTP error status: ${response.status}`)
							}

							const data = await response.json()
							return data as EntityProduct
						},
						catch: error => error as Error,
					}),
			}
		}),
	)
}
