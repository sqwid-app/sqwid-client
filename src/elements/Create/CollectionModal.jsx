import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
//eslint-disable-next-line
import { LazyMotion, domAnimation, m } from "framer-motion"

const swipeDownwards = keyframes`
	0% {
		transform: translate(-50%,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(-50%,0);
		opacity: 1;
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translate(-50%,0);
		opacity: 1;
	}
	100% {
		transform: translate(-50%,-50%);
		opacity: 0;
	}
`

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const BackDrop = styled.div`
	position: absolute;
	top:0;
	left:0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0,0.5);
	overflow:hidden;
`

const Modal = styled.div`
	position:absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	padding: 2rem 1.5rem;
	background:var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index:3;
	min-width: 14rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	p{
		font-size: 1.5rem;
		user-select:none;
		background: hsl(236deg 10% 23%);
		padding: 0.5rem 1.25rem;
		cursor:pointer;
		border-radius: 0.25rem;
		box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	label{
		display: block;
		font-weight: 500;
		font-size: 1rem;
		color: var(--app-container-text-primary-hover);
		cursor: pointer;
	}
	${props=>!props.remove?modalEntryAnim:modalExitAnim}
`

const Title = styled.h1`
	font-size: 1rem;
	margin-bottom: 0.25rem;
`

const elemContains =  (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const CollectionModal = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive.status)
	const modalRef = useRef()
	//eslint-disable-next-line
	useEffect(() => {
		if(isActive.status===false){
			setTimeout(() => {
				setElemIsVisible(isActive.status);
			}, 200);
		}
		else{
			setElemIsVisible(isActive.status);
		}
	}, [isActive.status])

	const handleClickOutside = (e) => {
		let rect = modalRef.current.getBoundingClientRect();
		if(!elemContains(rect,e.clientX,e.clientY)){
			setIsActive({...isActive,status: false})
		}
	}
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible&&(
				<BackDrop remove={!isActive.status} onClick={handleClickOutside}>
					<Modal
						remove={!isActive.status}
						ref={modalRef}
					>
						<Title>gaming</Title>
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default CollectionModal
