import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Connect } from "@utils/connect";
import { LazyMotion, domAnimation, m } from "framer-motion"
import { truncateAddress } from "@utils/textUtils";
import AuthContext from "@contexts/Auth/AuthContext";
import bread from "@utils/bread";
import ProfileElement from "./ProfileElement";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import { DividerHorizontal } from "@elements/Default/Divider";
import constants from "@utils/constants";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";

const StyledSimpleBar = styled(SimpleBar)`
	min-width:12rem;
	p:not(:first-child){
		margin-top: 0.5rem;
	}
	.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before,
	.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
		background: var(--app-background);
	}
`

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
	animation: ${swipeRightToLeft} 0.2s var(--easing) forwards;
`

const modalExitAnim = css`
	animation: ${swipeLeftToRight} 0.2s var(--easing) forwards;
`

const alertEntryAnim = css`
	animation: ${swipeDownwards} 0.2s var(--easing) forwards;
`

const alertExitAnim = css`
	animation: ${swipeUpwards} 0.2s var(--easing) forwards;
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
		line-height:1;
		font-size: 1.5rem;
		user-select:none;
		background: var(--app-container-bg-secondary);
		padding: 1rem 1.25rem;
		cursor:pointer;
		border-radius: 0.25rem;
		box-shadow:  0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	label{
		display: block;
		color: var(--app-container-text-primary-hover);
		cursor: pointer;
		font-family: var(--font-family-mono);
		font-weight: 400;
		font-size: 1rem;
		margin-top: 0.25rem;
	}
	${props => !props.remove ? modalEntryAnim : modalExitAnim}
`

const Title = styled.h1`
	font-size: 1rem;
	margin-bottom: 0.25rem;
`

const networkButtonStyles = css`
	--app-theme-opacity: 0.25;
	--app-theme-text: rgb(211 231 255);
	border: solid 0.15rem var(--app-theme-primary);
	background: rgba(
		var(--app-theme-value),
		var(--app-theme-opacity)
	);
	color: var(--app-theme-text);
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
	${props => props.network && networkButtonStyles};
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

const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
`

const elemContains = (rect, x, y) => {
	return rect ? (rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height) : false;
}

const AccountSelect = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const initialNetwork = localStorage.getItem(`${constants.APP_NAME}__chosen_network`)
	const [chosenNetwork, setChosenNetwork] = useState(initialNetwork || 'reef_testnet')
	const initialClaimButtonText = 'I Accept'
	const [claimButtonText, setClaimButtonText] = useState(initialClaimButtonText)
	const [networkButtonText, setNetworkButtonText] = useState(<FadeLoaderIcon />)
	useEffect(() => {
		!initialNetwork && localStorage.setItem(`${constants.APP_NAME}__chosen_network`, 'reef_mainnet');
		//eslint-disable-next-line
	}, [])
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
				bread(err);
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

	useEffect(() => {
		setNetworkButtonText(chosenNetwork === 'reef_testnet' ? 'Testnet' : 'Mainnet')
	}, [chosenNetwork])

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
						<StyledSimpleBar style={{ maxHeight: 300 }}>
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
						</StyledSimpleBar>
						{!auth && <>
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
								network
								title="Switch Network"
								onClick={() => {
									let newNetwork = chosenNetwork === 'reef_testnet' ? 'reef_mainnet' : 'reef_testnet'
									localStorage.setItem(`${constants.APP_NAME}__chosen_network`, newNetwork);
									setChosenNetwork(newNetwork)
									window.location.reload();
								}}
							>{networkButtonText}</Button>
						</>}
						{auth && (
							<>
								<DividerHorizontal />
								<ButtonsContainer>
									<Button
										whileHover={{
											y: -5,
											x: 0,
											scale: 1.02
										}}
										whileTap={{
											scale: 0.99
										}}
										network
										title="Switch Network"
										onClick={() => {
											let newNetwork = chosenNetwork === 'reef_testnet' ? 'reef_mainnet' : 'reef_testnet'
											localStorage.setItem(`${constants.APP_NAME}__chosen_network`, newNetwork);
											setChosenNetwork(newNetwork)
											logout()
											window.location.reload();
										}}
									>{networkButtonText}</Button>
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
								</ButtonsContainer>
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
								scale: 1.01
							}}
							whileTap={{
								scale: 0.99
							}}
							onClick={() => {
								//startLoading
								setClaimButtonText(<FadeLoaderIcon />)
								signer.claimDefaultAccount()
									.catch(e => {
										bread("EVM account could not be claimed! Please try again later.")
									})
									.finally(() => {
										//stopLoading
										setClaimButtonText(initialClaimButtonText)
										setIsActive(false)
										setAlert({
											...alert,
											isActive: false,
										})
									})

							}}
						>{claimButtonText}</Button>
					</Alert>)}
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export default AccountSelect
