import { Effect } from 'effect'
import type { FastifyPluginAsync } from 'fastify'

import { RepoProduct } from '@demo-shop/repos'

export const routesProduct: FastifyPluginAsync = async fastify => {
	// Get all products
	fastify.get('/products', async (request, reply) => {
		return await Effect.runPromise(
			Effect.scoped(
				Effect.gen(function* () {
					const repo = yield* RepoProduct

					const products = yield* repo.getAll()

					return products
				}).pipe(Effect.provide(RepoProduct.Live)),
			),
		)
	})

	// Get product by ID
	fastify.get('/products/:id', async (request, reply) => {
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
