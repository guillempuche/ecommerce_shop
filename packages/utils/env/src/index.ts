import { Path } from '@effect/platform'
import { NodePath } from '@effect/platform-node'
import { Effect, Layer } from 'effect'

import { Dotenv } from './dotenv.js'

const make = Effect.map(
	Effect.all({
		dotenv: Dotenv,
		path: Path.Path,
	}),
	({ dotenv, path }) => ({
		load: Effect.gen(function* () {
			const env = process.env.NODE_ENV || 'local'

			// Try environment-specific file first (.env.local)
			const envFile = `.env.${env}`
			const envPath = path.resolve(process.cwd(), envFile)

			// Fallback to default .env file
			const defaultEnvFile = '.env'
			const defaultPath = path.resolve(process.cwd(), defaultEnvFile)

			// Try environment-specific file first
			yield* dotenv.config({ path: envPath }).pipe(
				Effect.catchTag('ErrorDotenv', error => {
					// return dotenv.config({ path: defaultPath })
					return Effect.logInfo(
						'No .env files found, using platform environment variables',
					)
				}),
			)
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
