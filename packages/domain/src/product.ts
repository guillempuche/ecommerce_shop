import { Schema as S } from 'effect'

/**
 * Product color option schema
 */
export const ProductColorOption = S.Struct({
	name: S.String,
	hexCode: S.String,
	imageUrl: S.URL,
}).annotations({ identifier: '@demo-shop/domain/ProductColorOption' })
export type ProductColorOption = S.Schema.Type<typeof ProductColorOption>

/**
 * Product storage option schema
 */
export const ProductStorageOption = S.Struct({
	capacity: S.String,
	price: S.Number,
}).annotations({ identifier: '@demo-shop/domain/ProductStorageOption' })
export type ProductStorageOption = S.Schema.Type<typeof ProductStorageOption>

/**
 * Product specifications schema
 */
export const ProductSpecs = S.Struct({
	screen: S.String,
	resolution: S.String,
	processor: S.String,
	mainCamera: S.String,
	selfieCamera: S.String,
	battery: S.String,
	os: S.String,
	screenRefreshRate: S.String,
}).annotations({ identifier: '@demo-shop/domain/ProductSpecs' })
export type ProductSpecs = S.Schema.Type<typeof ProductSpecs>

/**
 * Product entity schema
 */
export class EntityProduct extends S.Class<EntityProduct>(
	'@demo-shop/domain/EntityProduct',
)({
	id: S.UUID,
	brand: S.String,
	name: S.String,
	description: S.String,
	basePrice: S.Number,
	rating: S.Number,
	specs: ProductSpecs,
	colorOptions: S.Array(ProductColorOption),
	storageOptions: S.Array(ProductStorageOption),
}) {}
