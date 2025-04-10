import type { Metadata } from 'next'
import './global.css'
import { CartProvider } from '@/contexts/cart'
import { ProductProvider } from '@/contexts/product'
import { fetchProducts } from '@/lib/api_service'

export const metadata: Metadata = {
	title: 'Demo Shop',
	description: 'Buy smartphones from the best brands',
	icons: {
		icon: '/favicon.ico',
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Server-side data fetching (SSR)
	const products = await fetchProducts()

	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ProductProvider initialProducts={products}>
					<CartProvider>{children}</CartProvider>
				</ProductProvider>
			</body>
		</html>
	)
}
