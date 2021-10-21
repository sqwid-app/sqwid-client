import React, { useEffect, useState } from 'react'
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
	// eslint-disable-next-line
	const [isLoading, setIsLoading] = useState(false)
	const { id } = useParams()
	useEffect(() => {
		setIsLoading(true)
	}, [])
	return (
		<Wrapper>
			<ProfileSection id={id}/>
		</Wrapper>
	)
}

export default Profile
