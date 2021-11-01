import EditDetailsContext from "@contexts/EditDetails/EditDetailsContext";
import AlertIcon from "@static/svg/AlertIcon";
import TickIcon from "@static/svg/TickIcon";
import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
	position:relative;
	margin-bottom: 1rem;
`

const fadeIn = keyframes`
	0%{
		transform: translateX(-1rem);
		opacity: 0;
	}
	100%{
		transform: translateX(0);
		opacity: 1;
	}
`

const fadeOut = keyframes`
	0%{
		transform: translateX(0);
		opacity: 1;
	}
	100%{
		transform: translateX(-1rem);
		opacity: 0;
	}
`

const Title = styled.h1`
	position: absolute;
	top:50%;
	left:0;
	transform: translateY(-50%);
	font-size: 1rem;
	font-weight: 600;
	color: var(--app-container-text-primary);
	display: flex;
	align-items:center;
	gap: 0.5rem;
	animation: ${props=>!props.animateOut?fadeIn:fadeOut} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const Changes = ({ sync }) => {
	const {info} = useContext(EditDetailsContext)
	const [animateOut, setAnimateOut] = useState(false)
	useEffect(() => {
		if(sync){
			setAnimateOut(false)
		}
		else{
			setAnimateOut(true)
		}
	}, [info,sync])
	return (
		<Container>
			<>
				<Title animateOut={animateOut}><AlertIcon/><span>Unsaved Changes</span></Title>
				<Title animateOut={!animateOut}><TickIcon/><span>Changes Synced</span></Title>
			</>
		</Container>
	)
}

export default Changes
