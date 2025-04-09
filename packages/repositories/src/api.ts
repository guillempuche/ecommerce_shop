import { Config, Schema as S } from 'effect'

import { EntityProduct } from '@demo-shop/domain'

// export class ApiConfig extends Context.Tag("ApiConfig")<ApiConfig, {
// 	baseUrl: Config.Config<string>
// 	key: Config.Config<string>
// }>() {}
// export const ApiConfigLive = Layer.effect(
// 	ApiConfig,
// 	Effect.succeed({
// 		baseUrl: Config.string('API_BASE_URL'),
// 		key: Config.redacted('API_KEY'),
// 	})
// )

export const ApiConfig = Config.all({
	baseUrl: Config.string('API_BASE_URL'),
	key: Config.redacted('API_KEY'),
})

// export class ApiBaseUrl extends Context.Tag("ApiBaseUrl")<ApiBaseUrl, string>() {}
// export const ApiBaseUrlLive = Layer.effect(
//   ApiBaseUrl,
//   Config.string('API_BASE_URL')
// )

// export class ApiKey extends Context.Tag("ApiKey")<ApiKey, Redacted.Redacted<string>>() {}
// export const ApiKeyLive = Layer.effect(
//   ApiKey,
//   Config.redacted('API_KEY')
// )

// export const EnvConfigProviderLayer = Layer.setConfigProvider(
//   ConfigProvider.fromEnv()
// )

export const ApiResponseProductSimilar = S.Struct({
	id: S.UUID,
	brand: S.String,
	name: S.String,
	basePrice: S.Number,
	imageUrl: S.URL,
}).annotations({ identifier: '@demo-shop/repos/ApiResponseProductSimilar' })

/**
 * Product list entity schema
 */
export const ApiResponseProductGetAll = S.Array(
	ApiResponseProductSimilar,
).annotations({ identifier: '@demo-shop/repos/ApiResponseProductGetAll' })
export type ApiResponseProductGetAll = S.Schema.Type<
	typeof ApiResponseProductGetAll
>

/**
 * Product entity schema
 */
export const ApiResponseProductGetById = S.Struct({
	...EntityProduct.fields,
	similarProducts: S.Array(ApiResponseProductSimilar),
}).annotations({ identifier: '@demo-shop/repos/ApiResponseProductGetById' })
export type ApiResponseProductGetById = S.Schema.Type<
	typeof ApiResponseProductGetById
>
