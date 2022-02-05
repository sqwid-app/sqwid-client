import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "@contexts/Auth/AuthContext";
import styled from 'styled-components';
import { getAvatarFromId } from "@utils/getAvatarFromId"
import ReefIcon from '@static/svg/ReefIcon';
import { DividerHorizontal } from '@elements/Default/Divider';
import { Link } from 'react-router-dom';

const BasicDetailsContainer = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
	color: var(--app-text);
	text-decoration: none;
	user-select: none;
`

const ProfilePicture = styled.div`
	height: 3rem;
	width: 3rem;
	border-radius: 1000rem;
	outline: 2px solid white;
	background-color: var(--app-background);
	background-image: url('${props => props.url && props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const ProfileDetails = styled.div`
	max-width: 10rem;
`

const ProfileAddress = styled.h4`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const ProfileName = styled.h3`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`

const BalanceContainer = styled.div`
	display: flex;
	align-items: center;
	svg{
		width: 24px;
		height: 24px;
	}
`

const BalanceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* padding: 0 1rem; */
`

const Balance = () => {
	return (
		<BalanceWrapper>
			<h4>Balance</h4>
			<BalanceContainer><ReefIcon /> <span>0.00</span></BalanceContainer>
		</BalanceWrapper>
	)
}

const ProfileElement = () => {
	const [username, setUsername] = useState("");
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.meta.name)
	}, [auth])
	return (
		<>
			<BasicDetailsContainer
				to="/profile"
			>
				<ProfilePicture url={getAvatarFromId(auth.address)} />
				<ProfileDetails >
					<ProfileName title={username}>{username}</ProfileName>
					<ProfileAddress title={auth.evmAddress}>{auth.evmAddress}</ProfileAddress>
				</ProfileDetails>
			</BasicDetailsContainer>
			<DividerHorizontal />
			<Balance />
			<DividerHorizontal />
		</>
	)
}

export default ProfileElement;
