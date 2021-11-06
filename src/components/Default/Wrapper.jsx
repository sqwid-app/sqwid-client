import Container from '@elements/Default/Container'
import Navbar from '@components/Default/Navbar'
import React from 'react'
import styled from 'styled-components'
import { respondTo } from '@styles/styledMediaQuery'

const MarginDiv = styled.div`
	margin-top:${props=>props.landing?`10rem`:`8rem`};
	${respondTo.md`
		margin-top:4rem;
	`}
`

const Wrapper = ({ children, landing }) => {
	return (
		<>
		<Navbar/>
		<Container landing={landing}>
			<MarginDiv landing={landing}>
				{children}
			</MarginDiv>
		</Container>
		</>
	)
}

export default Wrapper
