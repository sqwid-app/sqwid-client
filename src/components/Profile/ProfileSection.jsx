import EditDetailsProvider from "@contexts/EditDetails/EditDetailsProvider";
import Background from "@elements/Profile/Background";
import CollectionsSection from "@elements/Profile/CollectionsSection";
import ProfileCard from "@elements/Profile/ProfileCard";
import React from "react";
import styled from "styled-components";
import { respondTo } from "@styles/styledMediaQuery";
import OwnedNFTSection from "@elements/Profile/OwnedNFTSection";

const Section = styled.section`
	min-height: 90vh;
	max-width: 100vw;
`;

const Cont = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	z-index: 1;
	width: 100%;
	${respondTo.md`
		position: static;
		margin-top: 8rem;
		flex-direction: column;
		align-items:center;
		padding-top: 8rem;
	`}
`;

const ProfileSection = () => {
	return (
		<>
			<EditDetailsProvider>
				<Section>
					<Cont>
						<ProfileCard />
						<CollectionsSection />
					</Cont>
					<Background />
				</Section>
				<OwnedNFTSection />
			</EditDetailsProvider>
		</>
	);
};

export default ProfileSection;
