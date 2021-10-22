import Upload from "@elements/Create/Upload";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: 75vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Title = styled.div`
	font-size: 1.8rem;
	font-weight: 900;
	align-self:flex-start;
`

const MainSection = styled.div`
	margin: 3rem 2rem 0;
	width: 75vw;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2,1fr);
`

const HeroSection = () => {
	return (
		<Wrapper>
			<Title>Create a Collectible</Title>
			<MainSection>
				<div>
					<Upload/>
				</div>
				<div>👍</div>
			</MainSection>
		</Wrapper>
	)
}

export default HeroSection
