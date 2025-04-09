const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	transpilePackages: ['@demo-shop/domain', '@demo-shop/ui-components'],
	// experimental: {
	// 	serverActions: true,
	// },
	images: {
		domains: ['prueba-tecnica-api-tienda-moviles.onrender.com'],
	},

	webpack: (config, { dev, isServer }) => {
		// Development mode configuration
		if (dev) {
			// Don't minimize in development
			config.optimization.minimize = false
		} else {
			// Production mode: optimize and minimize
			config.optimization.minimize = true
		}

		return config
	},
}

export default nextConfig
