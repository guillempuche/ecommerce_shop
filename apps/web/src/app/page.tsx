import ClientLayout from '@/components/client'
import { HomePageClient } from '@/components/home_page'

export default async function HomePage() {
	return (
		<ClientLayout>
			<HomePageClient />
		</ClientLayout>
	)
}
