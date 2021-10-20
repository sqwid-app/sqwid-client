import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import Wrapper from '@components/Default/Wrapper';

const Profile = () => {
	// eslint-disable-next-line
	const [isLoading, setIsLoading] = useState(false)
	const { id } = useParams()
	useEffect(() => {
		setIsLoading(true)
	}, [])
	return (
		<Wrapper>
			{id}
		</Wrapper>
	)
}

export default Profile
