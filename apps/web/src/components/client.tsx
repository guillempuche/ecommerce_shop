'use client'

import StyledComponentsRegistry from '@/lib/styled_components_registry'
import { ThemeProvider } from '@demo-shop/ui-components'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<StyledComponentsRegistry>
			<ThemeProvider theme='light'>{children}</ThemeProvider>
		</StyledComponentsRegistry>
	)
}
