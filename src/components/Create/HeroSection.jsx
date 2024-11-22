import React, { useContext, useState } from "react";
import styled from "styled-components";
import FileProvider from "@contexts/File/FileProvider";
import UploadSection from "@elements/Create/UploadSection";
import TitleSection from "@elements/Create/TitleSection";
import DescriptionSection from "@elements/Create/DescriptionSection";
import RoyaltySection from "@elements/Create/RoyaltySection";
import PreviewSection from "@elements/Create/PreviewSection";
import CopiesSection from "@elements/Create/CopiesSection";
import CollectionSection from "@elements/Create/CollectionSection";
import PropertiesSection from "@elements/Create/PropertiesSection";
import Changes from "@elements/Create/Changes";
//eslint-disable-next-line
import WrapSection from "./WrapSection";
//eslint-disable-next-line
import UnwrapSection from "./UnwrapSection";
import useActiveTabs from "@utils/useActiveTabs";
import { CreateButton } from "@elements/Create/CreateButton";
import RoyaltyReceiverSection from "@elements/Create/RoyaltyReceiverSection";
import { CreateBulkButton } from "@elements/Create/CreateBulkButton";
import CollectionNameSection from "@elements/Create/CollectionNameSection";
import CollectionDescriptionSection from "@elements/Create/CollectionDescriptionSection";
import PreviewCoverSection from "@elements/Create/PreviewCoverSection";
import ChangesBulk from "@elements/Create/ChangesBulk";
import CollectionBulkProvider from "@contexts/CollectionBulk/CollectionBulkProvider";
import VerifyProvider from "@contexts/Verify/VerifyProvider";
import { VerifyBulkButton } from "@elements/Create/VerifyBulkButton";
import VerifyContext from "@contexts/Verify/Verify";
import { useEffect } from "react";
import FilesProvider from "@contexts/Files/FilesProvider";
import CollectionPreviewSection from "@elements/Create/CollectionPreviewSection";

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

const MainBulkSection = styled.div`
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

const Group = styled.div`
	height: 100%;
	display: flex;
	gap: 2.75rem;
	flex-direction: column;
`;

const RightContainer = styled(LeftContainer)``;

const ExtraSection = styled(LeftContainer)``;

//eslint-disable-next-line
const MainPage = () => {
	return (
		<MainSection>
			<LeftContainer>
				<Group>
					<UploadContainer>
						<UploadSection />
					</UploadContainer>
					<TitleSection />
					<DescriptionSection />
				</Group>
				<Changes />
			</LeftContainer>
			<RightContainer>
				<RoyaltyReceiverSection />
				<RoyaltySection />
				<CopiesSection />
				<CollectionSection />
				<PropertiesSection />
			</RightContainer>
			<PreviewSection />
		</MainSection>
	);
};

const MainPageRedesign = () => {
	return (
		<MainSection>
			<LeftContainer>
				<Group>
					<UploadContainer>
						<UploadSection />
					</UploadContainer>
					<PreviewSection />
				</Group>
				<Changes />
			</LeftContainer>
			<RightContainer>
				<TitleSection />
				<DescriptionSection />
				<RoyaltyReceiverSection />
				<RoyaltySection />
				<CopiesSection />
			</RightContainer>
			<ExtraSection>
				<CollectionSection />
				<PropertiesSection />
				<CreateButton />
			</ExtraSection>
		</MainSection>
	);
};

const BulkPage = () => {
	return (
		<MainBulkSection>
			<LeftContainer>
			<UploadContainer>
					<UploadSection title="Upload Files" fileType="images" multiple={true} />
				</UploadContainer>
				<CollectionPreviewSection fileType="images" />
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
				<CollectionPreviewSection fileType="cover" />
				<PreviewCoverSection />
				<CreateBulkButton />
			</RightContainer>
		</MainBulkSection>
	);
};


const VerifyPage = () => {
	const initialInfoText = (
		<pre>{`
JSON format:

{
	"collectionId": "your collection id",
	"itemIds": [1, 2, 3, ...]
}
		`}</pre>
	);
	const { verifyData } = useContext(VerifyContext);
	const [infoText, setInfoText] = useState(initialInfoText);
	useEffect (() => {
		const setButtonTextToCollection = async () => {
			const text = await verifyData.json.text ();
			const json = JSON.parse (text);
			const collection = json.collectionId;
			setInfoText ((
				<pre>{`
Register ${json.itemIds.length} items to collection with ID ${collection}
				`}</pre>
			));
		};
		if (verifyData.json) {
			setButtonTextToCollection ();
		} else {
			setInfoText (initialInfoText);
		}
		// eslint-disable-next-line
	}, [verifyData]);
	return (
		<MainSection>
			<LeftContainer>
				<Group>
					<div style = {{ textAlign: "left" }} >Use this to verify items you've minted directly on the <b>Sqwid Marketplace</b> contract.</div>
					<UploadContainer>
						<UploadSection title = "Upload JSON file" fileType="json" />
					</UploadContainer>
					{infoText}
					<VerifyBulkButton/>
				</Group>
			</LeftContainer>
		</MainSection>
	);
};

const Navbar = styled.nav`
	display: flex;
	gap: 0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select: none;
`;

const HeaderSection = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const NavContent = styled.p`
	position: relative;
	padding: 0.1rem 0.5rem;
	font-weight: 900;
	color: ${props =>
		props.active ? `inherit` : `var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration: none;
	transition: all 0.2s ease;
	&:before {
		content: "";
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		position: absolute;
		border-bottom: 0.1rem solid var(--app-text);
		border-radius: 0.1rem;
		opacity: 0;
		opacity: ${props => (props.active ? `1` : `0`)};
		transition: opacity 0.1s ease;
	}
`;

const HeroSection = () => {
	/* PRERELEASE 🚧 */
	const [navRoutes, setNavRoutes] = useState([
		{
			name: "Create",
			isActive: true,
			title: "Create a collectible",
			component: <MainPageRedesign />,
		},
		{
			name: "Create bulk",
			isActive: false,
			title: "Create bulk collectibles",
			component: <BulkPage />,
		},
		{
			name: "Register",
			isActive: false,
			title: "Register collectibles (advanced)",
			component: <VerifyPage />,
		}
		// {
		// 	name: "Wrap",
		// 	isActive: false,
		// 	title: "Wrap",
		// 	// component:  <WrapSection/>
		// 	component: <>Work in progress ⚒🚧</>
		// }, {
		// 	name: "Unwrap",
		// 	isActive: false,
		// 	title: "Unwrap",
		// 	// component: <UnwrapSection/>
		// 	component: <>Work in progress ⚒🚧</>
		// }
	]);

	const replacer = useActiveTabs({ navRoutes, setNavRoutes });

	return (
		<FileProvider>
			<VerifyProvider>
				<FilesProvider>
				<CollectionBulkProvider>
					<Wrapper>
						<HeaderSection>
							<Title>
								{navRoutes.find(item => item.isActive).title}
							</Title>
							{navRoutes.length > 1 && (
								<Navbar>
									{navRoutes.map((item, index) => (
										<NavContent
											key={index}
											active={item.isActive}
											disabled={item.isActive}
											onClick={() => {
												replacer(item.name);
											}}
										>
											{item.name}
										</NavContent>
									))}
								</Navbar>
							)}
						</HeaderSection>
						<>{navRoutes.find(item => item.isActive).component}</>
					</Wrapper>
				</CollectionBulkProvider>
				</FilesProvider>
			</VerifyProvider>
		</FileProvider>
	);
};

export default HeroSection;
