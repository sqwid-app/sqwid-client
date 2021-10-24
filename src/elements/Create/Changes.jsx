import FileContext from "@contexts/File/FileContext";
import AlertIcon from "@static/svg/AlertIcon";
import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { initialState } from "@contexts/File/initialState";

const Container = styled.div``

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
	font-size: 1rem;
	font-weight: 600;
	color: var(--app-container-text-primary);
	display: flex;
	align-items:center;
	gap: 0.5rem;
	animation: ${props=>!props.animateOut?fadeIn:fadeOut} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const deepEqual = (x, y) => {
	const ok = Object.keys, tx = typeof x, ty = typeof y;
	return x && y && tx === 'object' && tx === ty ? (
		ok(x).length === ok(y).length &&
		ok(x).every(key => deepEqual(x[key], y[key]))
	) : (x === y);
}

const Changes = () => {
	const { files } = useContext(FileContext)
	const [isVisible, setIsVisible] = useState(false)
	const [animateOut, setAnimateOut] = useState(false)
	useEffect(() => {
		const equalityCheck = (deepEqual({
			file:initialState.files.file,
			name:initialState.files.name,
			description:initialState.files.description
		},{
			file:files.file,
			name:files.name,
			description:files.description
		}))
		if(!equalityCheck){
			setAnimateOut(false)
			setIsVisible(true);
		}
		else{
			setAnimateOut(true)
			setTimeout(() => {
				setIsVisible(false)
			}, 200);
		}
	}, [files])
	return (
		<Container>
			{isVisible&&(
				<Title animateOut={animateOut}><AlertIcon/><span>Unsaved Changes</span></Title>
			)}
		</Container>
	)
}

export default Changes
