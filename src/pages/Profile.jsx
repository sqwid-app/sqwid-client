import React from 'react'
import { useParams } from "react-router";
import ProfileSection from '@components/Profile/ProfileSection';
import Navbar from '@components/Default/Navbar'

const Wrapper = ({ children }) => (
	<>
		<Navbar/>
		{children}
	</>
)

const Profile = () => {
	const { id } = useParams()
	return (
		<Wrapper>
			<ProfileSection id={id}/>
		</Wrapper>
	)
}

export default Profile
