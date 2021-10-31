import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div``

const HeroSection = () => {
	const { addr } = useParams()
	return (
		<Wrapper>
			ok {addr}
		</Wrapper>
	)
}

export default HeroSection
