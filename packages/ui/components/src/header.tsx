import styled from 'styled-components'

import { Bag } from './bag'

interface HeaderProps {
	className?: string
	quantity?: number
	onBagClick?: () => void
	onLogoClick?: () => void
}

const HeaderContainer = styled.nav`
  background-color: var(--color-background-primary);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  padding: 24px 16px;
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
`

const LogoSvg = styled.svg`
  height: 20px;
  width: 45px;
`

const BrandName = styled.span`
  font-family: 'ABC Monument Grotesk', sans-serif;
  font-weight: 700;
  font-size: 20.82px;
  line-height: 100%;
  letter-spacing: -0.28em;
  text-transform: uppercase;
  vertical-align: middle;
`

export const Header = ({
	className,
	quantity = 0,
	onBagClick,
	onLogoClick,
}: HeaderProps) => {
	const handleLogoKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			onLogoClick?.()
		}
	}

	return (
		<HeaderContainer className={className}>
			<LogoLink
				onKeyDown={handleLogoKeyDown}
				href='/'
				aria-label='Go to homepage'
				onClick={onLogoClick}
			>
				<LogoIcon>
					<LogoSvg viewBox='0 0 45 20' xmlns='http://www.w3.org/2000/svg'>
						{/* Eclipse effect */}
						{/* Base black circle */}
						<circle cx='7.5' cy='10' r='7.5' fill='black' />
						{/* White circle that extracts from the right side */}
						<circle cx='18.5' cy='10' r='7.5' fill='white' />

						{/* Asterisk */}
						<g transform='translate(25, 10)'>
							<rect
								x='-1.57'
								y='-7.285'
								width='3.14'
								height='14.57'
								fill='black'
							/>
							<rect
								x='-1.57'
								y='-7.285'
								width='3.14'
								height='14.57'
								fill='black'
								transform='rotate(45)'
							/>
							<rect
								x='-1.57'
								y='-7.285'
								width='3.14'
								height='14.57'
								fill='black'
								transform='rotate(90)'
							/>
							<rect
								x='-1.57'
								y='-7.285'
								width='3.14'
								height='14.57'
								fill='black'
								transform='rotate(135)'
							/>
						</g>
					</LogoSvg>
				</LogoIcon>
				<BrandName>mbst</BrandName>
			</LogoLink>

			<Bag quantity={quantity} onClick={onBagClick} />
		</HeaderContainer>
	)
}
