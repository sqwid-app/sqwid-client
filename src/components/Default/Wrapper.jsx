import Container from '@elements/Default/Container'
import Navbar from '@components/Default/Navbar'
import React from 'react'
import styled from 'styled-components'

const MarginDiv = styled.div`
	margin-top:8rem;
`

const Wrapper = ({ children }) => {
	return (
		<>
		<Navbar/>
		<Container>
			<MarginDiv>
				{children}
			</MarginDiv>
		</Container>
		</>
	)
}

export default Wrapper
