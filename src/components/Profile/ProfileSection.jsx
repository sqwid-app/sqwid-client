import Background from "@elements/Profile/Background";
import ProfileCard from "@elements/Profile/ProfileCard";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
	min-height: 100vh;
`

const ProfileSection = ({id}) => {
	return (
		<Section>
			<ProfileCard/>
			<Background seed={id}/>
		</Section>
	)
}

export default ProfileSection
