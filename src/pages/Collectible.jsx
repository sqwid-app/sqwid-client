import HeroSection from "@components/Collectible/HeroSection";
import Navbar from "@components/Default/Navbar";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import React, { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import NotFound from "./NotFound";

const MarginDiv = styled.div`
	margin-top:8rem;
	${respondTo.md`
		margin-top:6rem;
	`}
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
	const { collectibleInfo } = useContext(CollectibleContext);
	const { addr } = useParams ();
	return (
		<>
			{collectibleInfo && collectibleInfo.isValidCollectible===true?(
				<Wrapper>
					<HeroSection/>
				</Wrapper>
			):(
				<NotFound stack={`Collectible with id ${addr} is not valid`} />
			)}
		</>
	)
}

export default Collectible
