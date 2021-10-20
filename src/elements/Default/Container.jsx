import React from 'react'
import styled from "styled-components";

const Section = styled.section`
	padding: 2.5rem 0;
	min-height: 100vh;
`

const Container = ({ children }) => {
	return (
		<Section>
			{children}
		</Section>
	)
}

export default Container
