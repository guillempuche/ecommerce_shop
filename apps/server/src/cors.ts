import { logAppServer } from '@demo-shop/utils-logging'

/**
 * Get allowed origins from environment variable or use defaults based on environment
 */
export function getCorsConfig() {
	// Parse allowed origins
	const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
		? process.env.CORS_ALLOWED_ORIGINS.split(',')
		: process.env.NODE_ENV === 'production'
			? ['https://your-production-domain.com']
			: ['http://localhost:3000', 'http://localhost:3001']

	logAppServer.info(
		`CORS config loaded. Allowed origins: ${allowedOrigins.join(', ')}`,
	)

	return {
		allowedOrigins,
		allowedMethods: ['GET'],
		maxAge: 86400,
	}
}
