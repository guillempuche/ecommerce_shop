'use client'

import { useRouter } from 'next/navigation'
import type React from 'react'
import styled from 'styled-components'

import { Header } from '@demo-shop/ui-components'

interface LayoutPageProps {
	children: React.ReactNode
	cartItemCount?: number
	onCartClick?: () => void
}

const SkipLink = styled.a`
	position: absolute;
	left: 0;
  top: 0;
  transform: translateY(-100%);
  background: var(--color-background-primary);
  border: var(--border-width-lg) solid var(--palette-black);
  padding: 12px;
  z-index: 100;
  transition: transform 0.2s ease;

  &:focus {
    transform: translateY(0);
  }
`

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  padding: var(--space-fluid-md) var(--space-fluid-md-lg);
  margin: 0 auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export function LayoutPage({ children, cartItemCount = 0 }: LayoutPageProps) {
	const router = useRouter()
	return (
		<>
			<LayoutContainer>
				<SkipLink href='#main-content'>Skip to main content</SkipLink>
				<Header
					quantity={cartItemCount}
					onBagClick={() => router.push('/checkout')}
					onLogoClick={() => router.push('/')}
				/>
				<MainContent id='main-content' tabIndex={-1}>
					{children}
				</MainContent>
			</LayoutContainer>
		</>
	)
}
