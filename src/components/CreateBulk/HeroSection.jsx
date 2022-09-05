import React from "react";
import styled from "styled-components";
import UploadSection from "@elements/Create/UploadSection";
import { CreateBulkButton } from "@elements/Create/CreateBulkButton";
import CollectionNameSection from "@elements/Create/CollectionNameSection";
import CollectionDescriptionSection from "@elements/Create/CollectionDescriptionSection";
import RoyaltyReceiverSection from "@elements/Create/RoyaltyReceiverSection";
import RoyaltySection from "@elements/Create/RoyaltySection";
import CopiesSection from "@elements/Create/CopiesSection";
import PreviewCoverSection from "@elements/Create/PreviewCoverSection";
import ChangesBulk from "@elements/Create/ChangesBulk";
import CollectionBulkProvider from "@contexts/CollectionBulk/CollectionBulkProvider";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: calc(100vh - 20rem);
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.div`
	font-size: 1.8rem;
	font-weight: 900;
	align-self: flex-start;
`;

const MainSection = styled.div`
	margin: 0 2rem;
	padding: 3rem 0 1rem;
	width: 75vw;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 4rem;
`;

const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 1.5rem;
`;

const UploadContainer = styled.div`
	width: 100%;
`;

const RightContainer = styled(LeftContainer)``;

const MainPage = () => {
	return (
		<MainSection>
			<LeftContainer>
				<UploadContainer>
					<UploadSection title="Upload ZIP File" fileType="zip" />
				</UploadContainer>
				<RoyaltyReceiverSection bulk={true} />
				<RoyaltySection bulk={true} />
				<CopiesSection bulk={true} />
				<ChangesBulk />
			</LeftContainer>
			<RightContainer>
				<CollectionNameSection bulk={true} />
				<CollectionDescriptionSection bulk={true} />
				<UploadContainer>
					<UploadSection
						title="Collection Cover Image"
						fileType="cover"
					/>
				</UploadContainer>
				<PreviewCoverSection />
				<CreateBulkButton />
			</RightContainer>
		</MainSection>
	);
};

const HeaderSection = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const HeroSection = () => {
	return (
		<CollectionBulkProvider>
			<Wrapper>
				<HeaderSection>
					<Title>Create Collection</Title>
				</HeaderSection>
				<MainPage />
			</Wrapper>
		</CollectionBulkProvider>
	);
};

export default HeroSection;
