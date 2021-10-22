import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Connect } from "@utils/connect";
import { LazyMotion, domAnimation, m } from "framer-motion"
import { truncateAddress } from "@utils/textUtils";

const shiftBackgroundForwards = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`

const shiftBackgroundBackwards = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`

const swipeDownwards = keyframes`
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0);
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(100%);
	}
`

const entryAnim = css`
	animation: ${shiftBackgroundForwards} 0.2s ease forwards;
`

const exitAnim = css`
	animation: ${shiftBackgroundBackwards} 0.2s ease forwards;
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
	${props=>!props.remove?entryAnim:exitAnim}
`

const Modal = styled.div`
	position:absolute;
	right: 0;
	margin-right:4rem;
	margin-top: 7rem;
	padding: 2rem 1.5rem;
	padding-top: 1.5rem;
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

const AccountSelect = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const modalRef = useRef()
	//eslint-disable-next-line
	const [selectedAccount, setSelectedAccount] = useState (null);
	const _onAccountChange = async (val) => {
		let account = accounts.find (acc => acc.meta.name === val)
		setSelectedAccount (account);
		await Connect (account);
	}
	useEffect(() => {
		if(isActive===false){
			setTimeout(() => {
				setElemIsVisible(isActive);
			}, 200);
		}
		else{
			setElemIsVisible(isActive);
		}
	}, [isActive])

	const handleClickOutside = (e) => {
		let rect = modalRef.current.getBoundingClientRect();
		if(!elemContains(rect,e.clientX,e.clientY)){
			setIsActive(false)
		}
	}
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible&&(
				<BackDrop remove={!isActive} onClick={handleClickOutside}>
					<Modal
						remove={!isActive}
						ref={modalRef}
					>
						<Title>Choose an account</Title>
						{accounts?.length ?
						<>
							{ accounts ? accounts.map ((account, index) => {
								return <m.p
								whileHover={{
									y: -5,
									x: 0
								}}
								whileTap={{
									scale:0.99
								}}
								onClick={()=>_onAccountChange(account.meta.name)}
								key = { index }
							> { account.meta.name }<label title={account.address}>{truncateAddress(account.address)}</label> </m.p>
							}) : null }
						</>
						: 'Please connect your wallet'}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default AccountSelect
