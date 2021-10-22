import HeroSection from "@components/Create/HeroSection";
import Navbar from "@components/Default/Navbar";
import React from "react";
import styled from "styled-components";

const MarginDiv = styled.div`
	margin-top:8rem;
`

const Container = styled.div`
	padding: 1rem 0;
	min-height: 100vh;
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

const Create = () => {
	return (
		<Wrapper>
			<HeroSection/>
		</Wrapper>
	)
}

export default Create
