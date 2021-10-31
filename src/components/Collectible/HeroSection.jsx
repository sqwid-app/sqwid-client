import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: 75vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const HeroSection = () => {
	const { addr } = useParams()
	return (
		<Wrapper>
			pog
		</Wrapper>
	)
}

export default HeroSection
