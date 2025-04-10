import type { Server } from 'node:https'
import formbodyPlugin from '@fastify/formbody'
import { Effect } from 'effect'
import fastify, { type FastifyHttpOptions } from 'fastify'

import { Env } from '@demo-shop/utils-env'
import { logAppServer } from '@demo-shop/utils-logging'
import { routesProduct } from './routes/product.js'

async function main() {
	await Effect.runPromise(Env.load.pipe(Effect.provide(Env.Live)))

	const HOST = process.env.HOST || process.env.SERVER_HOST || '0.0.0.0'
	const PORT = Number.parseInt(
		process.env.PORT || process.env.SERVER_PORT || '3000',
		10,
	)
	const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

	const serverUrl = `${PROTOCOL}://${HOST}:${PORT}`
	logAppServer.info('Starting server at', serverUrl)

	const serverOptions: FastifyHttpOptions<Server> = {
		logger: {
			level: process.env.NODE_ENV === 'local' ? 'debug' : 'info',
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					translateTime: 'SYS:standard',
				},
			},
		},
		trustProxy: true, // Respect Caddy's forwarded headers
	}

	const server = fastify(serverOptions)

	// Register formbody plugin to parse form data (required by SuperTokens)
	logAppServer.info('Registering Formbody plugin')
	server.register(formbodyPlugin)

	logAppServer.info('Setting error handler')
	server.setErrorHandler((err, request, reply) => {
		logAppServer.error(err.toString())

		// Do any other fallback logic if the reply is not yet sent
		if (!reply.sent) {
			reply.status(500).send({ error: 'Internal Server Error' })
		}
	})

	// Routes
	logAppServer.info('Registering routes')
	server.register(routesProduct)

	server.get('/', async () => {
		return { message: 'Welcome to the eCommerce API' }
	})

	// Health check route
	server.get('/check', async () => {
		return { message: 'Health check' }
	})

	try {
		await server.listen({
			host: HOST,
			port: PORT,
		})
		server.log.info(`Server listening at ${server.server.address()}`)
	} catch (error) {
		if (error instanceof Error) {
			logAppServer.error(error.toString())
		} else {
			logAppServer.error('An unknown error occurred')
		}
		process.exit(1)
	}
}

await main()
