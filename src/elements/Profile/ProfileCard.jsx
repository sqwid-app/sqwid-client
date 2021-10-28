import ProfilePicture from "@components/Profile/ProfilePicture";
import CopyIcon from "@static/svg/CopyIcon";
import { clamp, truncateAddress } from "@utils/textUtils";
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

const ProfileCard = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false)
	let userData = {
		avatar:"https://avatars.dicebear.com/api/identicon/boidushya.svg",
		address: "5DMKdZRQ93LqyAVt3aw8wYHGyxofKcxbsBfBytUBgTEHCT4J",
		description: "I am not crazy! I know he swapped those numbers. I knew it was 1216. One after Magna Carta. As if I could ever make such a mistake. Never. Never! I just - I just couldn't prove it. He covered his tracks, he got that idiot at the copy shop to lie for him. You think this is something? You think this is bad? This? This chicanery? He's done worse. That billboard! Are you telling me that a man just happens to fall like that? No! *He* orchestrated it! Jimmy! He *defecated* through a *sunroof*! And I saved him! And I shouldn't have. I took him into my own firm! What was I *thinking*? He'll never change. He'll *never* change! Ever since he was 9, *always* the same! Couldn't keep his hands out of the cash drawer! But not our Jimmy! Couldn't be precious *Jimmy*! Stealing them blind! And *HE* gets to be a lawyer? What a sick joke! I should've stopped him when I had the chance!"
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
			<Description>{clamp(userData.description)}</Description>
		</Card>
	)
}

export default ProfileCard
