import { createGlobalStyle } from 'styled-components'

// ================================
// Colors

export interface ThemeColors {
	background: {
		primary: string
		secondary?: string
		disabled: string
	}
	content: {
		primary: string
		secondary?: string
		inverse: string
		disabled: string
		hover: string
	}
	highlight: {
		default: string
		hover: string
		active: string
	}
	border: {
		default: string
	}
	palette: {
		black: string
		white: string
		gray: string
		lightGray: string
		mediumGray: string
	}
}

export type ThemeName = 'light'

const lightTheme: ThemeColors = {
	background: {
		primary: '#FFFFFF',
		disabled: '#F3F2F2',
	},
	content: {
		primary: '#1B1A18',
		inverse: '#FFFFFF',
		disabled: '#C2BFBC',
		hover: '#504D49',
	},
	highlight: {
		default: '#1B1A18',
		hover: '#282624',
		active: '#363331',
	},
	border: {
		default: '#DBD9D7',
	},
	palette: {
		black: '#000000',
		white: '#FFFFFF',
		gray: '#79736D',
		lightGray: '#CCCCCC',
		mediumGray: '#AAAAAA',
	},
}

export const themes: Record<ThemeName, ThemeColors> = {
	light: lightTheme,
}

// ================================
// Typography

export const typography = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
	fontWeights: {
		normal: 300,
	},
	sizes: {
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '20px',
		xl: '24px',
	},
	lineHeight: {
		md: '16px',
	},
} as const

// ================================
// Sizes

export const sizes = {
	button: {
		md: '40px',
		lg: '48px',
	},
} as const

// ================================
// Border

export const borderWidth = {
	md: '0.5px',
	lg: '1px',
} as const

// ================================
// Theme

export interface Theme {
	colors: ThemeColors
	typography: typeof typography
	sizes: typeof sizes
	borderWidth: typeof borderWidth
}

export const theme: Theme = {
	colors: lightTheme,
	typography,
	sizes,
	borderWidth,
}

// ================================
// CSS variables

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  :root {
    --color-background-primary: ${({ theme }) => theme.colors.background.primary};
    --color-background-secondary: ${({ theme }) => theme.colors.background.secondary || theme.colors.background.primary};
    --color-background-disabled: ${({ theme }) => theme.colors.background.disabled};
    
    --color-content-primary: ${({ theme }) => theme.colors.content.primary};
    --color-content-secondary: ${({ theme }) => theme.colors.content.secondary || theme.colors.content.primary};
    --color-content-inverse: ${({ theme }) => theme.colors.content.inverse};
    --color-content-disabled: ${({ theme }) => theme.colors.content.disabled};
    --color-content-hover: ${({ theme }) => theme.colors.content.hover};
    
    --color-highlight-default: ${({ theme }) => theme.colors.highlight.default};
    --color-highlight-hover: ${({ theme }) => theme.colors.highlight.hover};
    --color-highlight-active: ${({ theme }) => theme.colors.highlight.active};
    
    --color-border-default: ${({ theme }) => theme.colors.border.default};
    
    --palette-black: ${({ theme }) => theme.colors.palette.black};
    --palette-white: ${({ theme }) => theme.colors.palette.white};
    --palette-gray: ${({ theme }) => theme.colors.palette.gray};
    --palette-lightgray: ${({ theme }) => theme.colors.palette.lightGray};
    --palette-mediumgray: ${({ theme }) => theme.colors.palette.mediumGray};
    
    --font-family: ${({ theme }) => theme.typography.fontFamily};
    --font-weight-normal: ${({ theme }) => theme.typography.fontWeights.normal};
    --font-size-xs: ${({ theme }) => theme.typography.sizes.xs};
    --font-size-sm: ${({ theme }) => theme.typography.sizes.sm};
    --font-size-md: ${({ theme }) => theme.typography.sizes.md};
    --font-size-lg: ${({ theme }) => theme.typography.sizes.lg};
    --font-size-xl: ${({ theme }) => theme.typography.sizes.xl};
    --line-height-md: ${({ theme }) => theme.typography.lineHeight.md};
    
    --button-size-md: ${({ theme }) => theme.sizes.button.md};
    --button-size-lg: ${({ theme }) => theme.sizes.button.lg};
        
    --border-width-md: ${({ theme }) => theme.borderWidth.md};
    --border-width-lg: ${({ theme }) => theme.borderWidth.lg};

		/* Fluid responsive design - from compact to expansive */
		--space-fluid-xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);    /* 8px to 12px */
		--space-fluid-sm: clamp(0.75rem, 0.6rem + 0.75vw, 1.25rem);  /* 12px to 20px */
		--space-fluid-md: clamp(1rem, 0.75rem + 1.25vw, 2rem);       /* 16px to 32px */
		--space-fluid-lg: clamp(1.5rem, 1rem + 2vw, 3rem);           /* 24px to 48px */
		--space-fluid-xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);         /* 32px to 64px */
		--space-fluid-2xl: clamp(3rem, 2rem + 4vw, 6rem);            /* 48px to 96px */

		/* Larger Jump Combinations */
		--space-fluid-xs-md: clamp(0.5rem, 0.25rem + 1.5vw, 2rem);      /* 8px to 32px */
		--space-fluid-xs-lg: clamp(0.5rem, 0.1rem + 2.5vw, 3rem);       /* 8px to 48px */
		--space-fluid-sm-lg: clamp(0.75rem, 0.25rem + 2.5vw, 3rem);     /* 12px to 48px */
		--space-fluid-sm-xl: clamp(0.75rem, 0.1rem + 3.5vw, 4rem);      /* 12px to 64px */
		--space-fluid-md-lg: clamp(1rem, 0.25rem + 2.5vw, 3rem);       /* 16px to 48px */
		--space-fluid-md-xl: clamp(1rem, 0.25rem + 3.75vw, 4rem);       /* 16px to 64px */
		--space-fluid-md-2xl: clamp(1rem, 0rem + 5vw, 6rem);            /* 16px to 96px */
		--space-fluid-lg-2xl: clamp(1.5rem, 0.5rem + 5vw, 6rem);        /* 24px to 96px */
  }

  /* Base element styling */
  body {
    font-family: var(--font-family);
    color: var(--color-content-primary);
    background-color: var(--color-background-primary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-normal);
  }

  /* Form elements */
  input,
  textarea,
  select {
    font-family: var(--font-family);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-normal);
    color: var(--palette-black);
  }

  /* Focus styles for accessibility */
  :focus {
    outline: 2px solid var(--color-highlight-default);
    outline-offset: 2px;
  }

  /* Text readability */
  p,
  li {
    line-height: 1.5;
  }

  /* Link styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Typography - common text styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  div,
	button {
    font-family: var(--font-family);
		font-weight: var(--font-weight-normal);
  }
`
