import React, { useState } from "react";
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
import WrapSection from "./WrapSection";
import UnwrapSection from "./UnwrapSection";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: calc(100vh - 10rem);
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
	margin: 0 2rem;
	padding: 3rem 0 1rem;
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
	gap: 1.5rem;
`

const UploadContainer = styled.div`
	width: 100%;
`

const Group = styled.div`
	height: 100%;
	display: flex;
	gap: 2.75rem;
	flex-direction: column;
`

const RightContainer = styled(LeftContainer)``

const MainPage = () =>{
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
				<RoyaltySection />
				<CopiesSection />
				<CollectionSection />
				<PropertiesSection />
			</RightContainer>
			<PreviewSection />
		</MainSection>
	)
}

const Navbar = styled.nav`
	display:flex;
	gap:0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select:none;
`

const HeaderSection = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const NavContent = styled.p`
	position:relative;
	padding: 0.1rem 0.5rem;
	font-weight: 900;
	color: ${props => props.active ? `inherit` : `var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration:none;
	transition: all 0.2s ease;
	&:before{
		content: "";
		height: 100%;
		width: 100%;
		left:0;
		top: 0;
		position: absolute;
		border-bottom: 0.1rem solid var(--app-text);
		border-radius: 0.1rem;
		opacity: 0;
		opacity: ${props => props.active ? `1` : `0`};
		transition: opacity 0.1s ease;
	}
`

const HeroSection = () =>{
	const [navRoutes, setNavRoutes] = useState([{
		name: "Create",
		isActive: true,
		title:"Create a Collection",
		component:<MainPage />
	}, {
		name: "Wrap",
		isActive: false,
		title:"Wrap",
		component:  <WrapSection/>
	},{
		name: "Unwrap",
		isActive: false,
		title:"Unwrap",
		component: <UnwrapSection/>
	}])
	return (
		<FileProvider>
			<Wrapper>
				<HeaderSection>
					<Title>{navRoutes.find(item=>item.isActive).title}</Title>
					<Navbar>
						{navRoutes.map((item, index) => (
							<NavContent
								key={index}
								active={item.isActive}
								disabled={item.isActive}
								onClick={() => {
									if (!item.isActive) {
										let newVal = [...navRoutes.map(a => ({ ...a, isActive: false }))]
										newVal[index].isActive = true
										setNavRoutes(newVal)
									}
								}}
							>{item.name}</NavContent>
						))}
					</Navbar>
				</HeaderSection>
				<>
					{navRoutes.find(item => item.isActive).component}
				</>
			</Wrapper>
		</FileProvider>
	)
}

export default HeroSection
