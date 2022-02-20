import ProfilePicture from "@components/Profile/ProfilePicture";
import AuthContext from "@contexts/Auth/AuthContext";
import CopyIcon from "@static/svg/CopyIcon";
import EditIcon from "@static/svg/EditIcon";
import { clamp, truncateAddress } from "@utils/textUtils";
import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled, { css, keyframes } from "styled-components";
import Loading from "@elements/Default/Loading";
import Changes from "@elements/ProfileRedesign/Changes";
import EditDetailsContext from "@contexts/EditDetails/EditDetailsContext";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { respondTo } from "@styles/styledMediaQuery";
import bread, { wipBread } from "@utils/bread";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { domAnimation, LazyMotion } from "framer-motion";
import MetadataContainer from "./MetadataContainer";
import { getBackend } from "@utils/network";

const Card = styled.div`
	display: flex;
	padding-top: 2rem;
	border-radius: 1.5rem;
	margin: 0 3rem;
	z-index:10;
	${respondTo.md`
		margin: 0;
		height: 100%;
		padding-bottom: 2rem;
		z-index:5;
	`}
`

const Address = styled.h1`
	display: block;
	font-size: 1.25rem;
	font-family: var(--font-family-mono);
	font-weight: 400;
	color: var(--app-container-text-primary-hover);
`

const Name = styled.h1`
	display: block;
	font-size: 1.75rem;
	max-width: 100%;
	text-overflow:ellipsis;
	overflow:hidden;
	white-space: nowrap;
	${respondTo.md`
		max-width: 20rem;
		margin: 0 auto;
		margin-top: 1.5rem;
	`}
`

const AddressContainer = styled.div`
	position:relative;
	display: flex;
	align-items:center;
	gap: 0.5rem;
	${respondTo.md`
		justify-content: center;
	`}
`

const Tooltip = styled.div`
	position: absolute;
	transform: translateX(50%);
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: var(--app-container-bg-primary);
	user-select:none;
	z-index: 15;
	${props => !props.remove ? entryAnim : exitAnim};
`

const Description = styled.p`
	margin: 0;
	margin-top: 1rem;
	font-weight: 200;
	width: 75%;
	color: var(--app-container-text-primary-hover);
	max-height: 16rem;
	${respondTo.md`
		width: 100%;
		text-align:center;
	`}
`

const swipeDownwards = keyframes`
	0% {
		opacity:0;
		transform: translateX(calc(75% + 2rem));
	}
	100% {
		opacity:1;
		transform: translateX(calc(100% + 3.25rem));
	}
`

const swipeUpwards = keyframes`
	0% {
		opacity: 1;
		transform: translateX(calc(100% + 3.25rem));
	}
	100% {
		opacity:0;
		transform: translateX(calc(75% + 2rem));
	}
`

const entryAnim = css`
	animation: ${swipeDownwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const exitAnim = css`
	animation: ${swipeUpwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const swipeRight = keyframes`
	0% {
		opacity: 0;
		transform: translateX(-25px);
	}
	100% {
		opacity:1;
		transform: translateX(0);
	}
`

const containerEntryAnim = css`
	animation: ${swipeRight} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const Container = styled.div`
	display: flex;
	align-items:center;
	width: 100%;
	padding: 0 3rem;
	padding-top: 1.5rem;
	${containerEntryAnim}
	${respondTo.md`
		flex-direction: column;
		position: relative;
		top: -6rem;
	`}
`

const EditContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	text-overflow:ellipsis;
	overflow:hidden;
	white-space: nowrap;
	height: 100%;
	width: 100%;
	padding-bottom: 4rem;
	padding: 0 2.5rem;
	gap: 2rem;
	${containerEntryAnim}
	${respondTo.md`
		margin: 1rem 0;
		h1{
			text-align:left;
		}
	`}
`

const Title = styled.h1`
	font-size: 1rem;
`

const Header = styled.h1`
	font-size: 1.5rem;
	font-weight: 900;
	align-self: flex-start;
	white-space: nowrap;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
`

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	padding-right: 2rem;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`

const LoadingContainer = styled.div`
	position: absolute;
	top: 50%;
	right:0;
	transform: translateY(-50%);
`

const InputWrapper = styled.div`
	position:relative;
`

const ContentContainer = styled.div`
	padding: 0 5rem;
	flex:1;
	display:grid;
	${respondTo.md`
		padding: 0;
	`}
`

const AdditionalDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%;
	gap: 1rem;
	${respondTo.md`
		gap: 1.5rem;
		align-items: center;
		margin-top: 1.5rem;
	`}
`

const HeaderSection = styled.div`
	display: flex;
	flex-direction: column;
	${containerEntryAnim}
`

const Btn = styled(BtnBaseAnimated)`
	width: 10rem;
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	user-select:none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
`

const EditDetailsContainer = styled.label`
	color: var(--app-container-text-primary);
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: color 0.15s ease;
	&:hover{
		color: var(--app-container-text-primary-hover);
	}
`

const HeaderContainer = styled.div`
	display: flex;
	padding-top: 2rem;
	border-radius: 1.5rem;
	margin: 0 3rem;
	width: 100%;
	z-index:10;
	${respondTo.md`
		flex-direction: column;
		margin: 0;
		height: 100%;
		padding-bottom: 2rem;
		z-index:5;
	`}
`

const NameEditSection = ({ name, setSync }) => {
	const { info, setInfo } = useContext(EditDetailsContext)
	const [isLoading, setIsLoading] = useState(false)
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address ? JSON.parse(localStorage.getItem("tokens")).find(token => token.address === address) : null;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (info.name.length) {
				axios.post(`${getBackend()}/edit/user/displayName`, {
					displayName: info.name
				}, {
					headers: {
						'Authorization': `Bearer ${jwt.token}`,
					}
				})
					.then(() => {
						setSync(false)
					})
					.finally(() => {
						setIsLoading(false)
					})
			}
			else {
				setSync(false)
				setIsLoading(false)
			}
		}, 500)

		return () => clearTimeout(delayDebounceFn)
		//eslint-disable-next-line
	}, [info.name])

	const handleInput = (event) => {
		setIsLoading(true)
		setSync(true)
		setInfo({
			...info,
			name: event.target.value
		})
	}

	return (
		<div>
			<Title>Display Name</Title>
			<InputWrapper>
				<InputContainer
					value={info.name}
					onChange={handleInput}
					placeholder={name}
				/>
				{isLoading && (
					<LoadingContainer>
						<Loading />
					</LoadingContainer>
				)}
			</InputWrapper>
		</div>
	)
}

const DescriptionEditSection = ({ description, setSync }) => {
	const { info, setInfo } = useContext(EditDetailsContext)
	const [isLoading, setIsLoading] = useState(false)
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address ? JSON.parse(localStorage.getItem("tokens")).find(token => token.address === address) : null;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (info.description.length) {
				axios.post(`${getBackend()}/edit/user/bio`, {
					bio: info.description
				}, {
					headers: {
						'Authorization': `Bearer ${jwt.token}`,
					}
				})
					.then(() => {
						setSync(false)
					})
					.finally(() => {
						setIsLoading(false)
					})
			}
			else {
				setSync(false)
				setIsLoading(false)
			}
		}, 2000)

		return () => clearTimeout(delayDebounceFn)
		//eslint-disable-next-line
	}, [info.description])

	const handleInput = (event) => {
		setIsLoading(true)
		setSync(true)
		setInfo({
			...info,
			description: event.target.value
		})
	}

	return (
		<div>
			<Title>Description</Title>
			<InputWrapper>
				<InputContainer
					value={info.description}
					onChange={handleInput}
					placeholder={description.length ? clamp(description, 16) : `Enter your bio here`}
				/>
				{isLoading && (
					<LoadingContainer>
						<Loading bg="#1b1c23" />
					</LoadingContainer>
				)}
			</InputWrapper>
		</div>
	)
}

const EditSection = ({ userData }) => {
	const [sync, setSync] = useState(true)
	return (
		<>
			<NameEditSection name={userData.name} setSync={setSync} />
			<DescriptionEditSection description={userData.description} setSync={setSync} />
			<Changes sync={sync} />
		</>
	)
}

const ProfileCard = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false)
	const [isOwnAccount, setIsOwnAccount] = useState(false)
	const [editIsActive, setEditIsActive] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const { info } = useContext(EditDetailsContext)
	const { id } = useParams()
	const { auth } = useContext(AuthContext)
	let initialState = {
		avatar: "",
		address: "",
		description: "",
		name: ""
	}
	const [userData, setUserData] = useState(initialState)
	useEffect(() => {
		let address = id ? id : auth.address
		axios.get(`${getBackend()}/get/user/${address}`)
			.then(({ data }) => {
				if (id) {
					setUserData({
						...userData,
						name: data.displayName,
						description: data.bio,
						address: id,
						avatar: getAvatarFromId(id),
					})
				}
				else if (auth) {
					setUserData({
						...userData,
						address: auth.evmAddress,
						name: data.displayName,
						avatar: getAvatarFromId(auth.address),
						description: data.bio
					})
				}
			})
			.catch((err) => {
				bread(err.response.data.error)
			})
			.finally(() => {
				setIsLoading(false);
			})
		id ? ((id === auth?.address || id === auth?.evmAddress) && setIsOwnAccount(true)) : setIsOwnAccount(true)
		//eslint-disable-next-line
	}, [info])
	const copyAddress = () => {
		navigator.clipboard.writeText(userData.address)
			.then(() => {
				setTooltipVisible(true);
				setTimeout(() => {
					setTooltipVisible(false)
				}, 1000);
			})
	}
	useEffect(() => {
		if (tooltipVisible) tooltipRef.current.style.display = "block";
		else {
			setTimeout(() => {
				if (tooltipRef.current) tooltipRef.current.style.display = "none";
			}, 400)
		}
	}, [tooltipVisible])
	const tooltipRef = useRef();
	return (
		<Card>
			{!editIsActive ? (
				!isLoading ? (
					<Container>
						<ProfilePicture src={userData.avatar} />
						<ContentContainer>
							<Name>{info.name.length ? info.name : userData.name}</Name>
							<AddressContainer>
								<label title={userData.address}><Address>{truncateAddress(userData.address, 6)}</Address></label>
								{window.isSecureContext && (<CopyIcon onClick={copyAddress} />)}
								<Tooltip style={{ display: "none" }} ref={tooltipRef} remove={!tooltipVisible}>Copied to clipboard!</Tooltip>
							</AddressContainer>
							<Description>
								{clamp(info.description.length ? info.description : userData.description)}
							</Description>
						</ContentContainer>
						<AdditionalDetailsContainer>
							<LazyMotion features={domAnimation}>
								<Btn onClick={wipBread}
								>Follow</Btn>
							</LazyMotion>
							<MetadataContainer followers={0} collections={0} nfts={0} />
							{isOwnAccount && (<EditDetailsContainer onClick={() => setEditIsActive(true)} title={`${!editIsActive ? `Enter` : `Exit`} Edit Mode`}><span>Edit Profile Details</span><EditIcon /></EditDetailsContainer>)}
						</AdditionalDetailsContainer>
					</Container>
				) : (
					<Header>Loading...</Header>
				)
			) : (
				<HeaderContainer>
					<HeaderSection>
						<Header>Edit Details</Header>
						{isOwnAccount && (<EditDetailsContainer onClick={() => setEditIsActive(false)} title={`${!editIsActive ? `Enter` : `Exit`} Edit Mode`}><span>Exit Edit Mode</span><EditIcon /></EditDetailsContainer>)}
					</HeaderSection>
					<EditContainer>
						<EditSection userData={userData} setUserData={setUserData} />
					</EditContainer>
				</HeaderContainer>
			)}
		</Card>
	)
}

export default ProfileCard
