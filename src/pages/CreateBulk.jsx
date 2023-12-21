import HeroSection from "@components/CreateBulk/HeroSection";
import Navbar from "@components/Default/Navbar";
import useCheckJWT from "@utils/useCheckJWT";
import React from "react";
import { Prompt } from "react-router-dom";
import styled from "styled-components";

const MarginDiv = styled.div`
	margin-top: 8rem;
`;

const Container = styled.div`
	padding: 1rem 0;
	min-height: 100vh;
`;

const Wrapper = ({ children }) => {
	return (
		<>
			<Navbar />
			<Container>
				<MarginDiv>{children}</MarginDiv>
			</Container>
		</>
	);
};

const CreateBulk = () => {
	useCheckJWT();
	return (
		<Wrapper>
			<HeroSection />
			<Prompt
				message={() => {
					localStorage.removeItem("collections");
					return true;
				}}
			/>
		</Wrapper>
	);
};

export default CreateBulk;
