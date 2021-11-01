import HeroSection from "@components/Collectible/HeroSection";
import Navbar from "@components/Default/Navbar";
import CollectibleProvider from "@contexts/Collectible/CollectibleProvider";
import React from "react";
import styled from "styled-components";
import NotFound from "./NotFound";

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

const Collectible = () => {
	const isValidCollectible = true;
	const text = `Collectible with id ${`123`} is not valid`
	return (
		<>
		{isValidCollectible?(
			<CollectibleProvider>
				<Wrapper>
					<HeroSection/>
				</Wrapper>
			</CollectibleProvider>
		):(
			<NotFound stack={text} />
		)}
		</>
	)
}

export default Collectible
