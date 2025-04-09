import { Context, Effect, Layer, Redacted } from 'effect'
import type { ParseError } from 'effect/ParseResult'
import type { Scope } from 'effect/Scope'

import type { EntityProduct } from '@demo-shop/domain'
import { logRepos } from '@demo-shop/utils-logging'
import { ApiConfig, type ApiResponseProductGetAll } from './api.js'

export class RepoProduct extends Context.Tag('RepoProduct')<
	RepoProduct,
	{
		readonly getAll: () => Effect.Effect<
			ApiResponseProductGetAll,
			Error | ParseError,
			Scope
		>
		readonly getById: (
			id: string,
		) => Effect.Effect<EntityProduct, Error | ParseError, Scope>
	}
>() {
	static Live = Layer.effect(
		this,
		Effect.gen(function* () {
			const apiConfig = yield* ApiConfig

			return {
				getAll: () =>
					Effect.tryPromise({
						try: async () => {
							const response = await fetch(`${apiConfig.baseUrl}/products`, {
								headers: {
									'x-api-key': Redacted.value(apiConfig.key),
								},
							})

							logRepos.info('Config', {
								baseUrl: apiConfig.baseUrl,
								key: Redacted.value(apiConfig.key),
							})

							logRepos.info('API response', {
								status: response.status,
								ok: response.ok,
								statusText: response.statusText,
								headers: Object.fromEntries(response.headers.entries()),
							})

							if (!response.ok) {
								throw new Error(`HTTP error status: ${response.status}`)
							}

							const data = await response.json()

							// Log useful response info, not the entire object
							logRepos.info('API data', {
								count: Array.isArray(data) ? data.length : 'not an array',
								sample: Array.isArray(data) ? data.slice(0, 1) : null,
							})

							return data as ApiResponseProductGetAll
						},
						catch: error => error as Error,
					}),
				getById: (id: string) =>
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
