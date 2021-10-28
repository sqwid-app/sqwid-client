import Background from "@elements/Profile/Background";
import CollectionsSection from "@elements/Profile/CollectionsSection";
import ProfileCard from "@elements/Profile/ProfileCard";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
	min-height: 100vh;
	max-width: 100vw;
`

const Cont = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	z-index:1;
	width: 100%;
`

const ProfileSection = ({id}) => {
	return (
		<Section>
			<Cont>
				<ProfileCard/>
				<CollectionsSection/>
			</Cont>
			<Background seed={id}/>
		</Section>
	)
}

export default ProfileSection
