import React from "react";
import styled from "styled-components";
import FileProvider from "@contexts/File/FileProvider";
import UploadSection from "@elements/Create/UploadSection";
import TitleSection from "@elements/Create/TitleSection";
import DescriptionSection from "@elements/Create/DescriptionSection";
import RoyaltySection from "@elements/Create/RoyaltySection";
import PreviewSection from "@elements/Create/PreviewSection";
import CopiesSection from "@elements/Create/CopiesSection";
import CollectionSection from "@elements/Create/CollectionSection";
import Changes from "@elements/Create/Changes";

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
	grid-template-columns: 2fr repeat(2,1fr) ;
	gap: 4rem;
`

const LeftContainer = styled.div`
	display: flex;
	flex-direction:column;
	height: 100%;
	gap: 2.75rem;
`

const UploadContainer = styled.div`
	width: 100%;
`

const RightContainer = styled(LeftContainer)``

const HeroSection = () => {
	return (
		<FileProvider>
			<Wrapper>
				<Title>Create a Collectible</Title>
				<MainSection>
					<LeftContainer>
						<UploadContainer>
							<UploadSection/>
						</UploadContainer>
						<TitleSection/>
						<DescriptionSection/>
						<Changes/>
					</LeftContainer>
					<RightContainer>
						<RoyaltySection/>
						<CopiesSection/>
						<CollectionSection/>
					</RightContainer>
					<PreviewSection/>
				</MainSection>
			</Wrapper>
		</FileProvider>
	)
}

export default HeroSection
