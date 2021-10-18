import React from "react";
import styled from "styled-components";
import CardsContainer from "./CardsContainer";
import InfoContainer from "./InfoContainer";

const Wrapper = styled.div`
	margin-top:8rem;
	padding: 0 4rem;
	// padding-right:0;
	height: 65vh;
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
`

const HeroSection = () => {
	return (
		<Wrapper>
			<InfoContainer/>
			<CardsContainer/>
		</Wrapper>
	)
}

export default HeroSection
