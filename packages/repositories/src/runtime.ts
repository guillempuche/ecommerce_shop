// import { Layer, ManagedRuntime } from 'effect'
// import { ApiBaseUrlLive, ApiKeyLive, EnvConfigProviderLayer } from './api.js'
// import { RepoProductLive } from './product.repo.js'

// const ReposLive = Layer.mergeAll(
// 	RepoProductLive,
// 	// WebClientLive,
// ).pipe(Layer.provide(Layer.provideMerge(EnvConfigProviderLayer, ApiBaseUrlLive)))

// const MainLayer = Layer.mergeAll(
// 	ReposLive,
// ).pipe(Layer.provide(Layer.provideMerge(EnvConfigProviderLayer, ApiBaseUrlLive)))

// export const RuntimeClient = ManagedRuntime.make(MainLayer)
