import ClientLayout from '@/components/client'
import { HomePageClient } from '@/components/home_page'
import { fetchProducts } from '@/lib/api_service'

export default async function HomePage() {
	// Server-side data fetching (SSR)
	const products = await fetchProducts()

	return (
		<ClientLayout>
			<HomePageClient products={products} />
		</ClientLayout>
	)
}
