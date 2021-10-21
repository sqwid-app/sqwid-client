import ProfilePicture from "@components/Profile/ProfilePicture";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 18rem;
	height: 70vh;
	padding-top: 4rem;
	border-radius: 1.5rem;
	margin-left: 6rem;
	background:linear-gradient(180deg, #25252D 0%, #25252D 25%, rgba(64, 68, 84, 0) 100%);
`

const ProfileCard = () => {
	let userData = {
		avatar:"https://avatars.dicebear.com/api/identicon/boidushya.svg"
	}
	return (
		<Card>
			<ProfilePicture src={userData.avatar}/>
		</Card>
	)
}

export default ProfileCard
