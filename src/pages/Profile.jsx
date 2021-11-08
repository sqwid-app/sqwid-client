import React, { useContext } from 'react'
import { useParams } from "react-router";
import ProfileSection from '@components/Profile/ProfileSection';
import Navbar from '@components/Default/Navbar'
import AuthContext from '@contexts/Auth/AuthContext';
import NotFound from "./NotFound"

const Wrapper = ({ children }) => (
	<>
		<Navbar/>
		{children}
	</>
)

const Profile = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	return (
		<>
			{(id||auth)?(
				<Wrapper>
					<ProfileSection/>
				</Wrapper>
			):(
				<NotFound/>
			)}
		</>
	)
}

export default Profile
