import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Connect } from "@utils/connect";
import { LazyMotion, domAnimation, m } from "framer-motion"
import { truncateAddress } from "@utils/textUtils";
import AuthContext from "@contexts/Auth/AuthContext";

const swipeDownwards = keyframes`
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(100%);
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

const Button = styled(m.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 1.25rem;
	border-radius: 0.5rem;
	background: hsl(236deg 10% 23%);
	outline: none;
	border: none;
	cursor: pointer;
	z-index:2;
	user-select:none;
`

const elemContains =  (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const AccountSelect = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const { auth, login, logout, setLoading } = useContext(AuthContext);
	const modalRef = useRef()
	//eslint-disable-next-line
	const [selectedAccount, setSelectedAccount] = useState (null);
	const _onAccountChange = async (val) => {
		setLoading(true);
		let account = accounts.find (acc => acc.meta.name === val)
		setSelectedAccount (account);
		Connect (account)
		.then (async response => {
			if (response.evmClaimed === false) {
				alert (`EVM account not claimed. Please claim it and try logging in again.\nYou will get the address ${ await response.signer.getAddress () }\nYou will need some Reef in order to pay for the transaction.`);
				await response.signer.claimDefaultAccount();
			} else {
				const acc = await response.signer.getAddress ();
				// console.log ('evm account is claimed');
				login({auth: { ...account, evmAddress: acc }});
			}
		})
		.catch(err=>{
			// handle err
		})
		.finally(()=>{
			setIsActive(false);
			setLoading(false);
		})
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
			setLoading(false)
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
									y: -2.5,
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
						{auth&&(
							<Button
								whileHover={{
									y: -5,
									x: 0,
									scale:1.02
								}}
								whileTap={{
									scale:0.99
								}}
								onClick={()=>{
									logout()
									window.location.reload()
								}}
							>Logout</Button>
						)}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default AccountSelect
