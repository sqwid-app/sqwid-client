import CancelIcon from "@static/svg/CancelIcon";
import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
		opacity: 0;
	}
`

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const TopBannerContainer = styled.div`
	position:absolute;
	top:0;
	left:0;
	display: flex;
	align-items:center;
	justify-content:center;
	width: 100%;
	gap: 0.5rem;
	height: 2rem;
	font-weight: 900;
	font-size: 1rem;
	background: var(--app-theme-primary);
	z-index: 15;
	${props=>!props.remove?modalEntryAnim:modalExitAnim};
`

const CancelContainer = styled.div`
	cursor: pointer;
	display: grid;
	place-items:center;
	padding: 0.5rem 0.25rem;
`

const TopBanner = () => {
	const initialState = JSON.parse(localStorage.getItem("isWarningVisible"))
	const [isWarningVisible, setIsWarningVisible] = useState(initialState!==null?initialState:true)
	const [elemIsVisible, setElemIsVisible] = useState(isWarningVisible)
	useEffect(() => {
		if(isWarningVisible===false){
			setTimeout(() => {
				setElemIsVisible(isWarningVisible);
			}, 200);
		}
		else{
			setElemIsVisible(isWarningVisible);
		}
	}, [isWarningVisible])
	const handleCancel = ()=>{
		setIsWarningVisible(false)
		localStorage.setItem("isWarningVisible",false)
	}
	return (
		<>
		{elemIsVisible&&(
			<TopBannerContainer remove={!isWarningVisible}>
				Sqwid Beta - use on Reef Testnet
				<CancelContainer onClick={handleCancel}>
					<CancelIcon/>
				</CancelContainer>
			</TopBannerContainer>)}
		</>
	)
}

export default TopBanner
