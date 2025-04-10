'use client'

import { CartProvider } from '@/contexts/cart'
import StyledComponentsRegistry from '@/lib/styled_components_registry'
import { ThemeProvider } from '@demo-shop/ui-components'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<CartProvider>
			<StyledComponentsRegistry>
				<ThemeProvider initialTheme='light'>{children}</ThemeProvider>
			</StyledComponentsRegistry>
		</CartProvider>
	)
}
