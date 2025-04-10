import ClientLayout from '@/components/client'
import { ProductDetailPage } from '@/components/product_detail_page'
import { fetchProductById } from '@/lib/api_service'

export default async function ProductPage({
	params,
}: {
	params: { id: string }
}) {
	const product = await fetchProductById(params.id)

	if (!product) {
		return <div>Product not found</div>
	}

	return (
		<ClientLayout>
			<ProductDetailPage product={product} />
		</ClientLayout>
	)
}
