import { notFound } from 'next/navigation'

import { ProductDetailPage } from '@/components/product_detail_page'
import { fetchProductById } from '@/lib/api_service'

interface ProductPageProps {
	params: {
		id: string
	}
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = params

	// Fetch data from the API
	const product = await fetchProductById(id)

	// If product not found, show 404 page
	if (!product) {
		notFound()
	}

	return <ProductDetailPage product={product} />
}
