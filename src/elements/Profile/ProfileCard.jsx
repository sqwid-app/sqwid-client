import ProfilePicture from "@components/Profile/ProfilePicture";
import AuthContext from "@contexts/Auth/AuthContext";
import CopyIcon from "@static/svg/CopyIcon";
import EditIcon from "@static/svg/EditIcon";
import { clamp, truncateAddress } from "@utils/textUtils";
import axios from "axios";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled, { css, keyframes } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";

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
	padding-bottom: 4rem;
	padding: 0 1.5rem;
	gap: 2rem;
	${containerEntryAnim}
`

const Button = styled(m.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 1.25rem;
	border-radius: 1000rem;
	background: var(--app-container-bg-primary);
	box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	outline: none;
	border: none;
	cursor: pointer;
	user-select:none;
	margin-top: 1rem;
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
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
`

const EditSection = ({ userData }) => {
	const [info, setInfo] = useState(JSON.parse(localStorage.getItem("editDetails"))||{
		name:"",
		description:""
	})
	const handleName = (event) => {
		setInfo({
			...info,
			"name":event.target.value
		})
	}
	const handleDescription = (event) => {
		setInfo({
			...info,
			"description":event.target.value
		})
	}
	useEffect(() => {
		localStorage.setItem("editDetails",JSON.stringify(info))
	}, [info])
	const handleSubmit = () => {
		localStorage.removeItem("editDetails")
		console.log(info)
	}
	return (
		<>
			<div>
				<Title>Display Name</Title>
				<InputContainer
					value={info.name}
					onChange = {handleName}
					placeholder={userData.name}
				/>
			</div>
			<div>
				<Title>Description</Title>
				<InputContainer
					value={info.description}
					onChange = {handleDescription}
					placeholder={userData.description.length?userData.description:`Enter your bio here`}
				/>
			</div>
			<LazyMotion features={domAnimation}>
				<Button
					whileHover={{
						y: -5,
						x: 0
					}}
					whileTap={{
						scale:0.99
					}}
					onClick={handleSubmit}
				>Save Changes</Button>
			</LazyMotion>
		</>
	)
}

const ProfileCard = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false)
	const { id } = useParams()
	const { auth } = useContext(AuthContext)
	const [isOwnAccount, setIsOwnAccount] = useState(false)
	const [editIsActive, setEditIsActive] = useState(false)
	let initialState = {
		avatar:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
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
					avatar:`https://avatars.dicebear.com/api/identicon/${id}.svg`
				})
			}
			else if(auth){
				setUserData({
					...userData,
					address:auth.address,
					name: data.displayName,
					avatar:`https://avatars.dicebear.com/api/identicon/${auth.address}.svg`,
					description:data.bio
				})
			}
		})
		id?((id === auth.address)&&setIsOwnAccount(true)):setIsOwnAccount(true)
	//eslint-disable-next-line
	},[])
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
			(tooltipRef.current!==null) &&
			(setTimeout(() => {
				tooltipRef.current.style.display="none";
			}, 300))
		}
	}, [tooltipVisible])
	const tooltipRef = useRef();
	return (
		<Card>
			{!editIsActive?(
				<Container>
					<ProfilePicture src={userData.avatar}/>
					<Name>{userData.name}</Name>
					<AddressContainer>
						<label title={userData.address}><Address>{truncateAddress(userData.address,6)}</Address></label>
						<CopyIcon onClick={copyAddress}/>
						<Tooltip style={{display:"none"}} ref={tooltipRef} remove={!tooltipVisible}>Copied to clipboard!</Tooltip>
					</AddressContainer>
					<Description>
						{clamp(userData.description)}
					</Description>
					{isOwnAccount&&(<label title={`${!editIsActive?`Enter`:`Exit`} Edit Mode`}><EditIcon onClick={()=>setEditIsActive(true)}/></label>)}
				</Container>
			):(
				<>
				<Header>Edit Details</Header>
				<EditContainer>
					<EditSection userData={userData}/>
					{isOwnAccount&&(<label title={`${!editIsActive?`Enter`:`Exit`} Edit Mode`}><EditIcon onClick={()=>setEditIsActive(false)}/></label>)}
				</EditContainer>
				</>
			)}
		</Card>
	)
}

export default React.memo(ProfileCard)
