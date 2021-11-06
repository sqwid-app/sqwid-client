import EditDetailsProvider from "@contexts/EditDetails/EditDetailsProvider";
import Background from "@elements/Profile/Background";
import CollectionsSection from "@elements/Profile/CollectionsSection";
import ProfileCard from "@elements/Profile/ProfileCard";
import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
	min-height: 100vh;
	max-width: 100vw;
`

const Cont = styled.div`
	display: flex;
	z-index:1;
	width: 100%;

	${respondTo.md`
		margin-top: 8rem;
		flex-direction: column;
		align-items:center;
		padding-top: 8rem;
	`}
`

const MobileProfileSection = () => {
	return (
		<EditDetailsProvider>
			<Section>
				<Cont>
					<ProfileCard/>
					<CollectionsSection/>
				</Cont>
				<Background/>
			</Section>
		</EditDetailsProvider>
	)
}

export default MobileProfileSection
