import { Path } from '@effect/platform'
import { NodePath } from '@effect/platform-node'
import { Effect, Layer } from 'effect'

import { logUtilsEnv } from '@demo-shop/utils-logging'
import { Dotenv } from './dotenv.js'

const make = Effect.map(
	Effect.all({
		dotenv: Dotenv,
		path: Path.Path,
	}),
	({ dotenv, path }) => ({
		load: Effect.gen(function* () {
			const env = process.env.NODE_ENV || 'local'
			const isProd = env === 'production'

			// Define potential paths for env files in order of preference
			const envPaths = []

			if (isProd) {
				// Render production-specific paths
				envPaths.push('/etc/secrets/.env.production')
				envPaths.push('/etc/secrets/.env')
			}

			// Standard environment-specific file (.env.local, .env.production)
			envPaths.push(path.resolve(process.cwd(), `.env.${env}`))

			// Default .env file in current directory
			envPaths.push(path.resolve(process.cwd(), '.env'))

			// Monorepo root paths
			envPaths.push(path.resolve(process.cwd(), `../../.env.${env}`))
			envPaths.push(path.resolve(process.cwd(), '../../.env'))

			logUtilsEnv.info(
				`Trying to load environment from ${envPaths.length} potential locations`,
			)

			// Try each path in sequence, stopping at the first success
			let loaded = false
			for (const envPath of envPaths) {
				yield* dotenv.config({ path: envPath }).pipe(
					Effect.tap(() =>
						Effect.sync(() => {
							loaded = true
						}),
					),
					Effect.tap(() =>
						logUtilsEnv.info(`Successfully loaded environment from ${envPath}`),
					),
					Effect.catchTag('ErrorDotenv', () => Effect.void),
				)

				if (loaded) break
			}

			if (!loaded) {
				// If no files could be loaded, log and continue with platform env vars
				logUtilsEnv.warn(
					'No .env files found, using platform environment variables',
				)
			}

			// Log some environment debug info (avoid showing secrets)
			const safeEnvKeys = [
				'NODE_ENV',
				'SERVER_HOST',
				'SERVER_PORT',
				'API_BASE_URL',
				'API_KEY',
				'LOG_LEVEL',
			]
			const safeEnv = safeEnvKeys.reduce<Record<string, string | undefined>>(
				(acc, key) => {
					if (process.env[key]) acc[key] = process.env[key]
					return acc
				},
				{},
			)

			logUtilsEnv.info('Environment configuration', { env: safeEnv })
		}),
	}),
)

export class Env extends Effect.Tag('Env')<
	Env,
	Effect.Effect.Success<typeof make>
>() {
	static readonly Live = Layer.effect(this, make).pipe(
		Layer.provide(Layer.mergeAll(Dotenv.Live, NodePath.layer)),
	)
}
