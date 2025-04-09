'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
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

interface ThemeContextProps {
	currentTheme: ThemeName
	setTheme: (theme: ThemeName) => void
	availableThemes: ThemeName[]
}

const ThemeContext = createContext<ThemeContextProps>({
	currentTheme: 'light',
	setTheme: () => {},
	availableThemes: Object.keys(themes) as ThemeName[],
})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
	children: React.ReactNode
	initialTheme?: ThemeName
	storageKey?: string
}

export const ThemeProvider = ({
	children,
	initialTheme = 'light',
	storageKey = 'ui_theme',
}: ThemeProviderProps) => {
	// Try to get theme from local storage or use the initial theme
	const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem(storageKey) as ThemeName
			return savedTheme && themes[savedTheme] ? savedTheme : initialTheme
		}
		return initialTheme
	})

	// Update local storage when theme changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(storageKey, currentTheme)
		}
	}, [currentTheme, storageKey])

	// Create the complete theme object
	const themeObject: Theme = {
		colors: themes[currentTheme],
		typography,
		sizes,
		borderWidth,
	}
	// Set the CSS variables for the theme
	const contextValue = {
		currentTheme,
		setTheme: setCurrentTheme,
		availableThemes: Object.keys(themes) as ThemeName[],
	}

	return (
		<ThemeContext.Provider value={contextValue}>
			{/* @ts-ignore - styled-components typing issue */}
			<StyledComponentsThemeProvider theme={themeObject}>
				{/* @ts-ignore - styled-components typing issue */}
				<GlobalStyle theme={themeObject} />
				{children}
			</StyledComponentsThemeProvider>
		</ThemeContext.Provider>
	)
}
