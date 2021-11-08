import React from 'react'
import styled from "styled-components";

const Section = styled.section`
	padding: ${props=>!props.landing&&`2.5rem`} 0;
	min-height: 100vh;
	overflow:${props=>props.landing&&`hidden`};
`

const Container = ({ children, landing }) => {
	return (
		<Section landing={landing}>
			{children}
		</Section>
	)
}

export default Container
