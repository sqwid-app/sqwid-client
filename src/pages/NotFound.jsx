import Navbar from "@components/Default/Navbar";
import React from "react";
import styled from "styled-components";

const MarginDiv = styled.div`
	margin-top:8rem;
`

const Container = styled.div`
	padding: 1rem 0;
	height: 100%;
	display: grid;
	place-items:center;
	padding-bottom: 4rem;
`

const Main = styled.section`
	height: 100vh;
`

const Wrapper = ({ children }) => {
	return (
		<Main>
		<Navbar/>
		<Container>
			<MarginDiv>
				{children}
			</MarginDiv>
		</Container>

		</Main>
	)
}

const NotFound = () => {
	const { pathname } = window.location;
	return (
		<Wrapper>
			<h1>404 not found</h1>
			<p>{pathname}</p>
		</Wrapper>
	)
}

export default NotFound
