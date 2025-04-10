import ClientLayout from '@/components/client'
import { ProductDetailsPage } from '@/components/product_details_page'

export default async function ProductPage({
	params,
}: {
	params: { id: string }
}) {
	return (
		<ClientLayout>
			<ProductDetailsPage productId={params.id} />
		</ClientLayout>
	)
}
