'use client'

import type { MouseEvent, ReactNode } from 'react'
import styled, { css } from 'styled-components'

type Feedback = 'Standard' | 'Primary'
type State = 'Default' | 'Hover' | 'Active' | 'Disabled'

interface ButtonProps {
	children: ReactNode
	feedback?: Feedback
	extraHeight?: boolean
	state?: State
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	className?: string
}

// Note the $ prefix for transient props
interface StyledButtonProps {
	$feedback?: Feedback
	$extraHeight?: boolean
	$state?: State
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${props => (props.$extraHeight ? 'var(--button-size-lg)' : 'var(--button-size-md)')};
  padding: ${props => (props.$extraHeight ? '4px 7px' : '3px 7px')};
  line-height: var(--line-height-md);
  letter-spacing: 8%;
  text-transform: uppercase;
  cursor: pointer;
  font-size: var(--font-size-xs);
	white-space: nowrap;
  
	/* Small screens: full width */
  @media (max-width: 767px) {
    width: 100%;
  }
  
  /* Larger screens: max width 260px */
  @media (min-width: 768px) {
    width: 100%;
    max-width: 260px;
  }

  /* Standard Button Styles */
  ${props =>
		props.$feedback === 'Standard' &&
		css`
      background-color: var(--color-background-primary);
      color: var(--palette-black);
      border-style: solid;
      border-color: var(--color-highlight-default);
      border-width: var(--border-width-md);

      &:hover {
        border-color: var(--color-highlight-hover);
        color: var(--color-content-hover);
      }

      &:active {
        border-color: var(--color-highlight-active);
        color: var(--palette-black);
      }

      &:disabled {
        background-color: var(--color-background-primary);
        color: var(--color-content-disabled);
        border-color: var(--color-border-default);
        cursor: not-allowed;
      }
    `}

  /* Primary Button Styles */
  ${props =>
		props.$feedback === 'Primary' &&
		css`
      background-color: var(--color-highlight-default);
      color: var(--color-content-inverse);
			border: 0;

      &:hover {
        background-color: var(--color-highlight-hover);
      }

      &:active {
        background-color: var(--color-highlight-active);
      }

      &:disabled {
        background-color: var(--color-background-disabled);
        color: var(--color-content-disabled);
        cursor: not-allowed;
      }
    `}

  /* State Overrides */
  ${props => {
		switch (props.$state) {
			case 'Hover':
				return props.$feedback === 'Standard'
					? css`
              border-color: var(--color-highlight-hover);
              color: var(--color-highlight-hover);
            `
					: css`
              background-color: var(--color-highlight-hover);
              border-color: var(--color-highlight-hover);
            `
			case 'Active':
				return props.$feedback === 'Standard'
					? css`
              border-color: var(--color-highlight-active);
              color: var(--color-highlight-active);
            `
					: css`
              background-color: var(--color-highlight-active);
              border-color: var(--color-highlight-active);
            `
			case 'Disabled':
				return props.$feedback === 'Standard'
					? css`
          background-color: var(--color-content-disabled);
          color: var(--color-content-disabled);
          border-color: var(--color-border-default);
          cursor: not-allowed;
        `
					: css`
          background-color: var(--color-background-primary);
          color: var(--color-content-disabled);
          border-color: var(--color-border-default);
          cursor: not-allowed;
        `
			default:
				return ''
		}
	}}
`
export const Button = ({
	children,
	feedback = 'Standard',
	extraHeight = false,
	state = 'Default',
	onClick,
	disabled = false,
	className,
}: ButtonProps) => {
	return (
		<StyledButton
			$feedback={feedback}
			$extraHeight={extraHeight}
			$state={disabled ? 'Disabled' : state}
			onClick={onClick}
			disabled={disabled || state === 'Disabled'}
			className={className}
		>
			{children}
		</StyledButton>
	)
}
