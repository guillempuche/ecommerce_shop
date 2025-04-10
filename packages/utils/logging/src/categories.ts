import { LogLevel } from 'typescript-logging'
import { CategoryProvider } from 'typescript-logging-category-style'

export const rootProvider = CategoryProvider.createProvider('@demo-shop', {
	level: LogLevel.Debug,
})

export const logAppServer = rootProvider
	.getCategory('apps')
	.getChildCategory('server')
export const logRepos = rootProvider.getCategory('repos')
export const logUtilsEnv = rootProvider
	.getCategory('utils')
	.getChildCategory('env')
