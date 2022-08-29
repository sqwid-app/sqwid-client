import React from "react";
import styled from "styled-components";
import FileProvider from "@contexts/File/FileProvider";
import UploadSection from "@elements/Create/UploadSection";
import TitleSection from "@elements/Create/TitleSection";
import DescriptionSection from "@elements/Create/DescriptionSection";
import Changes from "@elements/Create/Changes";
import { CreateBulkButton } from "@elements/Create/CreateBulkButton";

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
	grid-template-columns: 2fr repeat(2, 1fr);
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

const Group = styled.div`
	height: 100%;
	display: flex;
	gap: 2.75rem;
	flex-direction: column;
`;

const RightContainer = styled(LeftContainer)``;

const MainPage = () => {
	return (
		<MainSection>
			<LeftContainer>
				<Group>
					<UploadContainer>
						<UploadSection zipFile={true} />
					</UploadContainer>
				</Group>
				<Changes />
			</LeftContainer>
			<RightContainer>
				<TitleSection />
				<DescriptionSection />
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
		<FileProvider>
			<Wrapper>
				<HeaderSection>
					<Title>Create Collection</Title>
				</HeaderSection>
				<MainPage />
			</Wrapper>
		</FileProvider>
	);
};

export default HeroSection;
