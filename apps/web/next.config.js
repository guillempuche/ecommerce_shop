const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	// transpilePackages: ['@demo-shop/domain', '@demo-shop/ui-components'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
				port: '',
			},
			{
				protocol: 'http',
				hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
				port: '',
			},
		],
	},

	// // Specify which paths should be generated at build time and which at runtime
	// // Using empty array to skip static generation for all dynamic routes
	// generateStaticParams: async () => [],
	webpack: (config, { dev }) => {
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
