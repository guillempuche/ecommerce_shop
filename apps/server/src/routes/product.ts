import { Effect } from 'effect'
import type { FastifyPluginAsync } from 'fastify'

import { RepoProduct } from '@demo-shop/repos'
import { logAppServer } from '@demo-shop/utils-logging'

export const routesProduct: FastifyPluginAsync = async fastify => {
	// Get all products
	fastify.get('/products', async request => {
		const { search, limit, offset } = request.query as {
			search?: string
			limit?: string
			offset?: string
		}

		// Parse limit and offset with defaults
		const parsedLimit = limit ? Number.parseInt(limit, 10) : 20
		const parsedOffset = offset ? Number.parseInt(offset, 10) : 0

		logAppServer.info('Request', {
			search,
			limit: parsedLimit,
			offset: parsedOffset,
		})

		return await Effect.runPromise(
			Effect.scoped(
				Effect.gen(function* () {
					const repo = yield* RepoProduct

					const products = yield* repo.getAll({
						search,
						limit: parsedLimit,
						offset: parsedOffset,
					})

					return products
				}).pipe(Effect.provide(RepoProduct.Live)),
			),
		)
	})

	// Get product by ID
	fastify.get('/products/:id', async request => {
		const { id } = request.params as { id: string }

		return await Effect.runPromise(
			Effect.scoped(
				Effect.gen(function* () {
					const repo = yield* RepoProduct

					const product = yield* repo.getById(id)

					return product
				}).pipe(Effect.provide(RepoProduct.Live)),
			),
		)
	})
}
