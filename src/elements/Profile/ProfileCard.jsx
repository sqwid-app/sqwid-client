import ProfilePicture from "@components/Profile/ProfilePicture";
import CopyIcon from "@static/svg/CopyIcon";
import { truncateAddress } from "@utils/truncateAddr";
import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items:center;
	width: 18rem;
	height: 70vh;
	padding-top: 3rem;
	border-radius: 1.5rem;
	margin-left: 6rem;
	background:linear-gradient(180deg, #25252D 0%, #25252D 25%, rgba(64, 68, 84, 0) 100%);
`

const Address = styled.h1`
	font-size: 1.25rem;
`

const AddressContainer = styled.div`
	position:relative;
	display: flex;
	align-items:center;
	margin-top: 1.5rem;
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
	z-index: 5;
	${props=>!props.remove?entryAnim:exitAnim};
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

const ProfileCard = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false)
	let userData = {
		avatar:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
		address: "5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J"
	}
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
				tooltipRef.current.style.display="none";
			}, 300);
		}
	}, [tooltipVisible])
	const tooltipRef = useRef();
	return (
		<Card>
			<ProfilePicture src={userData.avatar}/>
			<AddressContainer>
				<Address>{truncateAddress(userData.address,6)}</Address>
				<CopyIcon onClick={copyAddress}/>
				<Tooltip style={{display:"none"}} ref={tooltipRef} remove={!tooltipVisible}>Copied to clipboard!</Tooltip>
			</AddressContainer>
		</Card>
	)
}

export default ProfileCard
