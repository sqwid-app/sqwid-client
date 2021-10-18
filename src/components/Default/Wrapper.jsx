import Container from '@elements/Default/Container'
import Navbar from '@components/Default/Navbar'
import React from 'react'

const Wrapper = ({ children }) => {
	return (
		<>
		<Navbar/>
		<Container>
			{children}
		</Container>
		</>
	)
}

export default Wrapper
