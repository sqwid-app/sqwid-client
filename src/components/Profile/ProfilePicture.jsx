import styled from "styled-components";

const ProfilePicture = styled.img`
	background: ${props=>props.src?props.src:`https://avatars.dicebear.com/api/identicon/boidushya.svg`};
	height: 8rem;
	width: 8rem;
	border: 10px solid #FFFFFF;
	border-radius: 1000rem;
`

export default ProfilePicture
