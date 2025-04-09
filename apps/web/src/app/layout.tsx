import type { Metadata } from 'next'

import { CartProvider } from '@/contexts/cart'
import StyledComponentsRegistry from '@/lib/styled_components_registry'
import { ThemeProvider } from '@demo-shop/ui-components'
import './global.css'

export const metadata: Metadata = {
	title: 'Demo Shop',
	description: 'Compra smartphones de las mejores marcas',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<CartProvider>
					<StyledComponentsRegistry>
						<ThemeProvider initialTheme='light'>{children}</ThemeProvider>
					</StyledComponentsRegistry>
				</CartProvider>
			</body>
		</html>
	)
}
