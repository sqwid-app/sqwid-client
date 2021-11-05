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
import Changes from "@elements/Profile/Changes";
import EditDetailsContext from "@contexts/EditDetails/EditDetailsContext";
import { getAvatarFromId } from "@utils/getAvatarFromId";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 18rem;
	height: 70vh;
	padding-top: 3rem;
	border-radius: 1.5rem;
	margin-left: 6rem;
	z-index:10;
	background:linear-gradient(180deg, #25252D 0%, #25252D 25%, rgba(64, 68, 84, 0) 100%);
`

const Address = styled.h1`
	display: block;
	font-size: 1.25rem;
`

const Name = styled.h1`
	display: block;
	font-size: 1.75rem;
	margin-top: 1.5rem;
	padding: 0 1.5rem;
	max-width: 100%;
	text-overflow:ellipsis;
	overflow:hidden;
	white-space: nowrap;
`

const AddressContainer = styled.div`
	position:relative;
	display: flex;
	align-items:center;
	margin-top: 1rem;
	gap: 0.5rem;
`

const Tooltip = styled.div`
	position: absolute;
	right: -50%;
	transform: translateX(25%);
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: var(--app-container-bg-primary);
	user-select:none;
	z-index: 15;
	${props=>!props.remove?entryAnim:exitAnim};
`

const Description = styled.p`
	margin: 1.5rem 0;
	padding: 0 1rem;
	width: 75%;
	text-align:center;
	font-weight: 200;
	color: var(--app-container-text-primary-hover);
	max-height: 16rem;
`

const swipeDownwards = keyframes`
	0% {
		opacity:0;
		transform: translateX(25%);
	}
	100% {
		opacity:1;
		transform: translateX(50%);
	}
`

const swipeUpwards = keyframes`
	0% {
		opacity: 1;
		transform: translateX(50%);
	}
	100% {
		opacity:0;
		transform: translateX(25%);
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
	flex-direction: column;
	align-items:center;
	width: 100%;
	${containerEntryAnim}
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
`

const Title = styled.h1`
	font-size: 1rem;
`

const Header = styled.h1`
	font-size: 1.5rem;
	font-weight: 900;
	align-self: flex-start;
	padding: 0 2.25rem;
	margin-bottom: 2rem;
	${containerEntryAnim}
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
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	padding-right: 2rem;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
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

const NameEditSection = ({ name, setSync }) => {
	const {info, setInfo} = useContext(EditDetailsContext)
	const [isLoading, setIsLoading] = useState(false)
	const address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
	let jwt = address ? JSON.parse (localStorage.getItem ("tokens")).find (token => token.address === address) : null;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if(info.name.length){
				axios.post(`${process.env.REACT_APP_API_URL}/api/edit/user/displayName`,{
					displayName:info.name
				},{
					headers: {
						'Authorization': `Bearer ${jwt.token}`,
					}
				})
				.then(()=>{
					setSync(false)
				})
				.finally(()=>{
					setIsLoading(false)
				})
			}
			else{
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
					onChange = {handleInput}
					placeholder={name}
				/>
				{isLoading&&(
					<LoadingContainer>
						<Loading/>
					</LoadingContainer>
				)}
			</InputWrapper>
		</div>
	)
}

const DescriptionEditSection = ({ description, setSync }) => {
	const {info, setInfo} = useContext(EditDetailsContext)
	const [isLoading, setIsLoading] = useState(false)
	const address = JSON.parse (localStorage.getItem ("auth"))?.auth.address;
	let jwt = address ? JSON.parse (localStorage.getItem ("tokens")).find (token => token.address === address) : null;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if(info.description.length){
				axios.post(`${process.env.REACT_APP_API_URL}/api/edit/user/bio`,{
					bio:info.description
				},{
					headers: {
						'Authorization': `Bearer ${jwt.token}`,
					}
				})
				.then(()=>{
					setSync(false)
				})
				.finally(()=>{
					setIsLoading(false)
				})
			}
			else{
				setSync(false)
				setIsLoading(false)
			}
		}, 500)

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
					onChange = {handleInput}
					placeholder={description.length?clamp(description,16):`Enter your bio here`}
				/>
				{isLoading&&(
					<LoadingContainer>
						<Loading bg="#1b1c23"/>
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
			<NameEditSection name={userData.name} setSync={setSync}/>
			<DescriptionEditSection description={userData.description} setSync={setSync}/>
			<Changes sync={sync}/>
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
		avatar:"",
		address: "",
		description: "",
		name:""
	}
	const [userData, setUserData] = useState(initialState)
	useEffect(()=>{
		let address = id?id:auth.address
		axios.get(`${process.env.REACT_APP_API_URL}/api/get/user/${address}`)
		.then(({data})=>{
			if(id){
				setUserData({
					...userData,
					name:data.displayName,
					description:data.bio,
					address:id,
					avatar: getAvatarFromId(id),
				})
			}
			else if(auth){
				setUserData({
					...userData,
					address:auth.address,
					name: data.displayName,
					avatar: getAvatarFromId(auth.address),
					description:data.bio
				})
			}
		})
		.finally(()=>{
			setIsLoading(false);
		})
		id?((id === auth.address)&&setIsOwnAccount(true)):setIsOwnAccount(true)
	//eslint-disable-next-line
	},[info])
	const copyAddress = () => {
		navigator.clipboard.writeText(userData.address)
		.then(()=>{
			setTooltipVisible(true);
			setTimeout(() => {
				setTooltipVisible(false)
			}, 1000);
		})
	}
	useEffect(() => {
		if(tooltipVisible) tooltipRef.current.style.display="block";
		else{
			setTimeout(() => {
				if(tooltipRef.current) tooltipRef.current.style.display="none";
			}, 400)
		}
	}, [tooltipVisible])
	const tooltipRef = useRef();
	return (
		<Card>
			{!editIsActive?(
				!isLoading?(
					<Container>
						<ProfilePicture src={userData.avatar}/>
						<Name>{info.name.length?info.name:userData.name}</Name>
						<AddressContainer>
							<label title={userData.address}><Address>{truncateAddress(userData.address,6)}</Address></label>
							<CopyIcon onClick={copyAddress}/>
							<Tooltip style={{display:"none"}} ref={tooltipRef} remove={!tooltipVisible}>Copied to clipboard!</Tooltip>
						</AddressContainer>
						<Description>
							{clamp(info.description.length?info.description:userData.description)}
						</Description>
						{isOwnAccount&&(<label title={`${!editIsActive?`Enter`:`Exit`} Edit Mode`}><EditIcon onClick={()=>setEditIsActive(true)}/></label>)}
					</Container>
				):(
					<Header>Loading...</Header>
				)
			):(
				<>
				<Header>Edit Details</Header>
				<EditContainer>
					<EditSection userData={userData} setUserData={setUserData}/>
					{isOwnAccount&&(<label title={`${!editIsActive?`Enter`:`Exit`} Edit Mode`}><EditIcon onClick={()=>setEditIsActive(false)}/></label>)}
				</EditContainer>
				</>
			)}
		</Card>
	)
}

export default ProfileCard
