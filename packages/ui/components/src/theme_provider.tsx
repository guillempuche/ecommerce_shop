'use client'

import type React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import {
	GlobalStyle,
	type Theme,
	type ThemeName,
	borderWidth,
	sizes,
	themes,
	typography,
} from './tokens'

interface ThemeProviderProps {
	children: React.ReactNode
	theme?: ThemeName
}

export const ThemeProvider = ({
	children,
	theme = 'light',
}: ThemeProviderProps) => {
	const themeObject: Theme = {
		colors: themes[theme],
		typography,
		sizes,
		borderWidth,
	}

	return (
		<StyledComponentsThemeProvider theme={themeObject}>
			<GlobalStyle theme={themeObject} />
			{children}
		</StyledComponentsThemeProvider>
	)
}
