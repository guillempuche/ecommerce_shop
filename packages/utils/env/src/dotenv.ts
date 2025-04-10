import { config } from 'dotenv'
import { Context, Data, Effect, Layer } from 'effect'

import { logUtilsEnv } from '@demo-shop/utils-logging'

export class ErrorDotenv extends Data.TaggedError('ErrorDotenv')<{
	error: globalThis.Error
}> {}

const make = {
	config: ({ path }: { readonly path: string }) =>
		Effect.gen(function* () {
			const output = yield* Effect.sync(() => config({ path }))

			if (output.parsed === undefined || output.error !== undefined) {
				return yield* new ErrorDotenv({
					error: output.error ?? new Error("Env variables couldn't be loaded"),
				})
			}

			logUtilsEnv.info('Loaded env', path, output.parsed)

			return output.parsed
		}),
}

export class Dotenv extends Context.Tag('Dotenv')<Dotenv, typeof make>() {
	static readonly Live = Layer.succeed(this, make)
}
