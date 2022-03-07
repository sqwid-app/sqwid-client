import Navbar from "@components/Default/Navbar";
import React from "react";
import styled from "styled-components";
import { respondTo } from "@styles/styledMediaQuery";

const MarginDiv = styled.div`
	margin-top: 8rem;
	width: 33vw;
	text-align: center;
	${respondTo.md`
		width: 100%;
		margin-top: 3.75rem;
		padding: 2rem;
	`}
`;

const Container = styled.div`
	padding: 1rem 0;
	height: 100%;
	display: grid;
	place-items: center;
	padding-bottom: 4rem;
`;

const Main = styled.section`
	height: 100vh;
`;

const Content = styled.div`
	display: inline-block;
	text-align: left;
	p {
		padding-bottom: 1rem;
	}
`;

const Wrapper = ({ children }) => {
	return (
		<Main>
			<Navbar />
			<Container>
				<MarginDiv>{children}</MarginDiv>
			</Container>
		</Main>
	);
};

const NotFound = ({ stack }) => {
	const { pathname } = window.location;
	return (
		<Wrapper>
			<Content>
				<h1>404 not found</h1>
				<p>{pathname}</p>
				{stack && <code>{stack}</code>}
			</Content>
		</Wrapper>
	);
};

export default NotFound;
