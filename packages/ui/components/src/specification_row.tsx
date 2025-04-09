import styled from 'styled-components'

interface SpecificationRowProps {
	label: string
	data: string | React.ReactNode
	className?: string
}

const StyledSpecificationRow = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: var(--border-width-md) solid var(--palette-black);
  width: 100%;
`

const Label = styled.span`
  width: 45%; /* Takes up 4/10 of the available width */
  padding-right: var(--space-fluid-md);
  text-transform: uppercase;
  flex-shrink: 0;
`

const Data = styled.span`
  width: 55%; /* Takes up 6/10 of the available width */
  word-wrap: break-word;
`

export const SpecificationRow = ({
	label,
	data,
	className,
}: SpecificationRowProps) => {
	return (
		<StyledSpecificationRow className={className}>
			<Label>{label}</Label>
			<Data>{data}</Data>
		</StyledSpecificationRow>
	)
}
