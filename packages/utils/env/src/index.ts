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

			// Fallback to default .env file in current directory
			const defaultEnvFile = '.env'
			const defaultPath = path.resolve(process.cwd(), defaultEnvFile)

			// Additional fallback to monorepo root .env files for Render.com
			const rootPath = path.resolve(process.cwd(), '../../../.env')
			const rootEnvPath = path.resolve(process.cwd(), `../../../.env.${env}`)

			// Try loading in sequence with fallbacks
			yield* dotenv.config({ path: envPath }).pipe(
				Effect.catchTag('ErrorDotenv', () => {
					return dotenv.config({ path: defaultPath }).pipe(
						Effect.catchTag('ErrorDotenv', () => {
							// Try environment-specific file at root
							return dotenv.config({ path: rootEnvPath }).pipe(
								Effect.catchTag('ErrorDotenv', () => {
									// Finally try default .env at root
									return dotenv.config({ path: rootPath }).pipe(
										Effect.catchTag('ErrorDotenv', () => {
											// If all attempts fail, just log and continue
											return Effect.logError(
												'No .env files found, using platform environment variables',
											)
										}),
									)
								}),
							)
						}),
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
