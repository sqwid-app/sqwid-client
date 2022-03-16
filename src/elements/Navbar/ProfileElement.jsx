import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@contexts/Auth/AuthContext";
import styled from "styled-components";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import ReefIcon from "@static/svg/ReefIcon";
import { DividerHorizontal } from "@elements/Default/Divider";
import { Link } from "react-router-dom";
import { getBalance } from "@utils/getBalance";
import { numberSeparator } from "@utils/numberSeparator";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import constants from "@utils/constants";
import bread from "@utils/bread";
import { truncateAddress } from "@utils/textUtils";
import { m, LazyMotion, domAnimation } from "framer-motion";

const BasicDetailsContainer = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: center; */
	gap: 1rem;
	padding: 0.5rem 0;
	padding-bottom: 0;
	border-radius: 0.5rem;
	color: var(--app-text);
	text-decoration: none;
	user-select: none;
`;

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

const ProfilePicture = styled.div`
	height: 4rem;
	width: 4rem;
	border-radius: 1000rem;
	outline: 0.2rem solid white;
	background-color: var(--app-background);
	background-image: url("${props => props.url && props.url}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
`;

const ProfileDetails = styled.div`
	max-width: 10rem;
`;

const ProfileAddress = styled.h4`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-family: var(--font-family-mono);
	font-weight: 400;
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
`;

const ProfileName = styled.h3`
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const BalanceContainer = styled.div`
	display: flex;
	align-items: center;
	svg:not(.loader) {
		width: 24px;
		height: 24px;
	}
`;

const BalanceWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* padding: 0 1rem; */
`;

const Button = styled(NotStyledLink)`
	margin-left: auto;
	font-size: 0.875rem;
	background: var(--app-container-bg-secondary);
	color: var(--app-container-text-primary-hover);
	padding: 0.25rem 0.75rem;
	border-radius: 0.375rem;
`;

const ButtonContainer = styled(m.div)`
	padding: 0.375rem 0;
	width: 100%;
`;

const Balance = () => {
	const [balance, setBalance] = useState(<FadeLoaderIcon />);
	useEffect(() => {
		const fetchBalance = async () => {
			const bal = await getBalance();
			// const balNum = Number(bal) / 10 ** 18;
			setBalance(numberSeparator(bal.toFixed(2).toString()));
		};
		fetchBalance();
	}, []);
	return (
		<BalanceWrapper>
			<h4>Balance</h4>
			<BalanceContainer>
				<ReefIcon /> <span>{balance}</span>
			</BalanceContainer>
		</BalanceWrapper>
	);
};

const ProfileElement = () => {
	const [username, setUsername] = useState("");
	const { auth } = useContext(AuthContext);
	useEffect(() => {
		auth && setUsername(auth.meta.name);
	}, [auth]);

	//eslint-disable-next-line
	const copyAddress = () => {
		navigator.clipboard.writeText(auth.evmAddress).then(() => {
			bread(
				<>
					<p
						style={{
							lineHeight: "1",
							fontWeight: "900",
							color: "var(--app-container-text-primary-hover)",
						}}
					>
						Copied address to clipboard!
					</p>
					<p
						style={{
							fontWeight: "500",
							color: "var(--app-container-text-primary-hover)",
							fontSize: "0.875rem",
							lineHeight: "1",
						}}
					>
						{constants.COPY_WARNING}
					</p>
				</>
			);
		});
	};
	return (
		<>
			<BasicDetailsContainer>
				<div>
					<ProfilePicture url={getAvatarFromId(auth.address)} />
				</div>
				<ProfileDetails>
					<div>
						<ProfileName title={username}>{username}</ProfileName>
					</div>
					<ProfileAddress
						// onClick={copyAddress}
						title={auth.evmAddress}
					>
						{truncateAddress(auth.evmAddress, 6)}
					</ProfileAddress>
					<LazyMotion features={domAnimation}>
						<ButtonContainer
							whileHover={{
								y: -2.5,
								x: 0,
							}}
						>
							<Button to="/profile">View Profile</Button>
						</ButtonContainer>
					</LazyMotion>
				</ProfileDetails>
			</BasicDetailsContainer>
			<DividerHorizontal />
			<Balance />
			<DividerHorizontal />
		</>
	);
};

export default ProfileElement;
