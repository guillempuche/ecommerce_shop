import { Schema as S } from 'effect'

export const UsecaseProductsGetOne = S.UUID
export type UsecaseProductsGetOne = typeof UsecaseProductsGetOne.Type

export const UsecaseProductsGetAll = S.Struct({
	search: S.optional(S.String),
	limit: S.optional(S.Number),
	offset: S.optional(S.Number),
})
export type UsecaseProductsGetAll = S.Schema.Type<typeof UsecaseProductsGetAll>
