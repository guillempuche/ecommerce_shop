import type { Preview } from '@storybook/react'
import React from 'react'

import { ThemeProvider } from '../src/theme_provider'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		Story => (
			<ThemeProvider initialTheme='light'>
				<Story />
			</ThemeProvider>
		),
	],
}

export default preview
