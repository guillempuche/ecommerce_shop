import { HomePageClient } from '@/components/home_page'
import { fetchProducts } from '@/lib/api_service'

export default async function HomePage() {
	// Server-side data fetching
	const products = await fetchProducts()

	return <HomePageClient products={products} />
}
