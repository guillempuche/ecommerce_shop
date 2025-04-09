'use client'

import type React from 'react'
import styled from 'styled-components'

import { useTheme } from './theme_provider'
import { type ThemeName, themes } from './tokens'

interface ThemeSelectorProps {
	className?: string
}

const ThemeGrid = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const ThemeOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const ThemeNameDisplay = styled.span`
  font-size: 12px;
  color: var(--color-content-primary);
  text-align: center;
`

const ThemeSwatches = styled.div<{ isActive?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  padding: 2px;
  border: 2px solid ${props => (props.isActive ? 'var(--color-content-primary)' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-highlight-hover);
  }
`

const ThemeSwatch = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
`

// Helper to get display name for theme
const getThemeDisplayName = (themeName: ThemeName): string => {
	switch (themeName) {
		case 'light':
			return 'Light'
		default:
			return themeName
	}
}

// Helper to get representative colors for each theme
const getThemeSwatchColors = (themeName: ThemeName) => {
	const themeColors = themes[themeName]

	return {
		primary: themeColors.background.primary,
		secondary: themeColors.content.primary,
		tertiary: themeColors.highlight.default,
		quaternary: themeColors.border.default,
	}
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
	const { currentTheme, setTheme, availableThemes } = useTheme()

	return (
		<ThemeGrid className={className}>
			{availableThemes.map(themeName => {
				const colors = getThemeSwatchColors(themeName)
				const displayName = getThemeDisplayName(themeName)

				return (
					<ThemeOption key={themeName}>
						<ThemeSwatches
							isActive={currentTheme === themeName}
							onClick={() => setTheme(themeName)}
						>
							<ThemeSwatch color={colors.primary} />
							<ThemeSwatch color={colors.secondary} />
							<ThemeSwatch color={colors.tertiary} />
							<ThemeSwatch color={colors.quaternary} />
						</ThemeSwatches>
						<ThemeNameDisplay>{displayName}</ThemeNameDisplay>
					</ThemeOption>
				)
			})}
		</ThemeGrid>
	)
}
