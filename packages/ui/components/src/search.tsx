'use client'

import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface SearchProps {
	placeholder?: string
	onChange?: (value: string) => void
	onClear?: () => void
	className?: string
	initialValue?: string
}

interface StyledSearchContainerProps {
	$isFilled: boolean
}

const SearchContainer = styled.div<StyledSearchContainerProps>`
  position: relative;
  padding-bottom: 9px;
  border-bottom: var(--border-width-md) solid var(--palette-black);
  transition: all 0.2s ease-in-out;
  width: 100%;

  ${props =>
		props.$isFilled &&
		css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  `}
`

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  color: var(--palette-black);
  outline: none;
  padding: 0;

  &::placeholder {
    color: var(--palette-mediumgray);
    opacity: 1;
  }
`

const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  min-width: 19px;
  height: 19px;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.7;
  }
`
const CrossIcon = () => (
	<svg
		width='19'
		height='19'
		viewBox='0 0 19 19'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		role='img'
	>
		<title>Close</title>
		<path
			d='M14.25 4.75L4.75 14.25M4.75 4.75L14.25 14.25'
			stroke='black'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const Search = ({
	placeholder = 'Search for a smartphone...',
	onChange,
	onClear,
	className,
	initialValue = '',
}: SearchProps) => {
	const [value, setValue] = useState(initialValue)
	const [isFilled, setIsFilled] = useState(!!initialValue.trim())
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setIsFilled(!!value.trim())
	}, [value])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setValue(newValue)
		onChange?.(newValue)
	}

	const handleClear = () => {
		setValue('')
		setIsFilled(false)
		onClear?.()
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	return (
		<SearchContainer $isFilled={isFilled} className={className}>
			<SearchInput
				ref={inputRef}
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			{isFilled && (
				<ClearButton onClick={handleClear} aria-label='Clear search'>
					<CrossIcon />
				</ClearButton>
			)}
		</SearchContainer>
	)
}
