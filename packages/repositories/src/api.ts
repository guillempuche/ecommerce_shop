import { Config, Schema as S } from 'effect'

import { EntityProduct } from '@demo-shop/domain'

export const ApiConfig = Config.all({
	baseUrl: Config.string('API_BASE_URL'),
	key: Config.redacted('API_KEY'),
})

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
