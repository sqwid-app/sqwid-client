import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Connect } from "@utils/connect";
import { LazyMotion, domAnimation, m } from "framer-motion"
import { truncateAddress } from "@utils/textUtils";
import AuthContext from "@contexts/Auth/AuthContext";
import bread from "@utils/bread";
import ProfileElement from "./ProfileElement";
import { DividerHorizontal } from "@elements/Default/Divider";

const swipeRightToLeft = keyframes`
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`

const swipeLeftToRight = keyframes`
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(100%);
		opacity: 0;
	}
`

const swipeDownwards = keyframes`
	0% {
		transform: translate(-50%,-100px);
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
		transform: translate(-50%,-100px);
		opacity: 0;
	}
`

const modalEntryAnim = css`
	animation: ${swipeRightToLeft} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const modalExitAnim = css`
	animation: ${swipeLeftToRight} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const alertEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`

const alertExitAnim = css`
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
	z-index:100;
	min-width: 14rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	p{
		font-size: 1.5rem;
		user-select:none;
		background: var(--app-container-bg-secondary);
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
	${props => !props.remove ? modalEntryAnim : modalExitAnim}
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
	background: var(--app-container-bg-secondary);
	outline: none;
	border: none;
	cursor: pointer;
	z-index:2;
	user-select:none;
`

const Alert = styled.div`
	position: absolute;
	margin-top: 7rem;
	left: 50%;
	transform: translateX(-50%);
	max-width: 24rem;
	margin-right: 0;
	width: fit-content;
	margin-top: 7rem;
	padding: 2rem 1.5rem;
	padding-top: 1.5rem;
	background:var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 3;
	display: flex;
	flex-direction: column;
	${props => !props.remove ? alertEntryAnim : alertExitAnim}
`

const Content = styled.p`
	padding-top: 0.25rem;
	padding-bottom: 1rem;
	font-size: 1.125rem;
	color:var(--app-container-text-primary-hover);
`

const elemContains = (rect, x, y) => {
	return rect ? (rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height) : false;
}

const AccountSelect = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const [signer, setSigner] = useState("")
	const { auth, login, logout, setLoading } = useContext(AuthContext);
	const [alert, setAlert] = useState({
		isActive: false,
	})
	const [alertIsVisible, setAlertIsVisible] = useState(alert.isActive)
	const modalRef = useRef()
	const alertRef = useRef()
	//eslint-disable-next-line
	const [selectedAccount, setSelectedAccount] = useState(null);
	const _onAccountChange = async (val) => {
		setLoading(true);
		let account = accounts.find(acc => acc.meta.name === val)
		setSelectedAccount(account);
		Connect(account)
			.then(async response => {
				if (response.evmClaimed === false) {
					setAlert({
						...alert,
						isActive: true,
					})
					setSigner(response.signer)
					// alert (`EVM account not claimed. Please claim it and try logging in again.\nYou will get the address ${ await response.signer.getAddress () }\nYou will need some Reef in order to pay for the transaction.`);
				} else {
					const acc = await response.signer.getAddress();
					// console.log ('evm account is claimed');
					login({ auth: { ...account, evmAddress: acc } });
					setIsActive(false);
				}
			})
			.catch(err => {
				bread(err.response.data.error)
			})
			.finally(() => {
				setLoading(false);
			})
	}
	useEffect(() => {
		if (isActive === false) {
			setTimeout(() => {
				setElemIsVisible(isActive);
			}, 200);
		}
		else {
			setElemIsVisible(isActive);
		}
	}, [isActive])

	useEffect(() => {
		if (alert.isActive === false) {
			setTimeout(() => {
				setAlertIsVisible(alert.isActive);
			}, 200);
		}
		else {
			setAlertIsVisible(alert.isActive);
		}
	}, [alert.isActive])

	const handleClickOutside = (e) => {
		let rect = modalRef?.current?.getBoundingClientRect();
		let rect2 = alertRef?.current?.getBoundingClientRect();
		if (!elemContains(rect, e.clientX, e.clientY) && !elemContains(rect2, e.clientX, e.clientY)) {
			setAlert({
				...alert,
				isActive: false,
			})
			setIsActive(false)
			setLoading(false)
		}
	}

	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible && (
				<BackDrop remove={!isActive} onMouseDown={handleClickOutside} onTouchStart={handleClickOutside}>
					<Modal
						remove={!isActive}
						ref={modalRef}
					>
						{auth && (
							<ProfileElement />
						)}
						<Title>Choose an{auth && "other"} account</Title>
						{accounts?.length ?
							<>
								{accounts ? accounts.filter(item => auth ? auth.address !== item.address : true).map((account, index) => {
									return <m.p
										whileHover={{
											y: -2.5,
											x: 0
										}}
										whileTap={{
											scale: 0.99
										}}
										onClick={() => _onAccountChange(account.meta.name)}
										key={index}
									> {account.meta.name}<label title={account.address}>{truncateAddress(account.address)}</label> </m.p>
								}) : null}
							</>
							: 'Please connect your wallet'}
						{auth && (
							<>
								<DividerHorizontal />
								<Button
									whileHover={{
										y: -5,
										x: 0,
										scale: 1.02
									}}
									whileTap={{
										scale: 0.99
									}}
									onClick={() => {
										logout()
										window.location.reload()
									}}
								>Logout</Button>
							</>
						)}
					</Modal>
					{alertIsVisible && (<Alert
						remove={!alert.isActive}
						ref={alertRef}
					>
						<Title>Claim EVM Account</Title>
						<Content>
							EVM account not claimed.<br />
							Please claim it and try logging in again.<br />
							You will need some Reef in order to pay for the transaction.
						</Content>
						<Button
							whileHover={{
								y: -5,
								x: 0,
								scale: 1.02
							}}
							whileTap={{
								scale: 0.99
							}}
							onClick={() => {
								setAlert({
									...alert,
									isActive: false,
								})
								signer.claimDefaultAccount()
									.finally(() => {
										setIsActive(false)
									})

							}}
						>I Accept</Button>
					</Alert>)}
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default AccountSelect
