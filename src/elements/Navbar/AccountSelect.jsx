import React, {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import styled, { css, keyframes } from "styled-components";
import { Connect } from "@utils/connect";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { truncateAddress } from "@utils/textUtils";
import AuthContext from "@contexts/Auth/AuthContext";
import bread from "@utils/bread";
import ProfileElement from "./ProfileElement";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import { DividerHorizontal } from "@elements/Default/Divider";
import constants from "@utils/constants";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import { defaultNetwork } from "@constants/networks";
import { useHistory } from "react-router-dom";
import AccountSelectContext from "@contexts/AccountSelect/AccountSelectContext";
import Select from "react-select";
import { styles } from "@styles/reactSelectStyles";
import useEscape from "@utils/useEscape";

const StyledSimpleBar = styled(SimpleBar)`
	min-width: 12rem;
	p:not(:first-child) {
		margin-top: 0.5rem;
	}
	.simplebar-track.simplebar-horizontal .simplebar-scrollbar:before,
	.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
		background: var(--app-background);
	}
`;

const swipeRightToLeft = keyframes`
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`;

const swipeLeftToRight = keyframes`
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(100%);
		opacity: 0;
	}
`;

const swipeDownwards = keyframes`
	0% {
		transform: translate(-50%,-100px);
		opacity: 0;
	}
	100% {
		transform: translate(-50%,0);
		opacity: 1;
	}
`;

const swipeUpwards = keyframes`
	0% {
		transform: translate(-50%,0);
		opacity: 1;
	}
	100% {
		transform: translate(-50%,-100px);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
	animation: ${swipeRightToLeft} 0.2s var(--easing) forwards;
`;

const modalExitAnim = css`
	animation: ${swipeLeftToRight} 0.2s var(--easing) forwards;
`;

const alertEntryAnim = css`
	animation: ${swipeDownwards} 0.2s var(--easing) forwards;
`;

const alertExitAnim = css`
	animation: ${swipeUpwards} 0.2s var(--easing) forwards;
`;

const BackDrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
`;

const Modal = styled.div`
	position: absolute;
	right: 0;
	margin-right: 4rem;
	margin-top: 7rem;
	padding: 2rem 1.5rem;
	padding-top: 1.5rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 100;
	min-width: 14rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	.close-btn {
		background: var(--app-container-bg-secondary);
		color: var(--app-container-text-primary-hover);
		position: absolute;
		top: 0.675rem;
		right: 0.675rem;
		padding: 0.125rem;
		border-radius: 1000rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		svg {
			width: 1.25rem;
			height: 1.25rem;
			stroke: var(--app-container-text-primary-hover);
			stoke-width: 0.125rem;
		}
		opacity: 0;
		display: none;
	}
	&:hover {
		.close-btn {
			opacity: 1;
			display: flex;
		}
	}
	p {
		line-height: 1;
		font-size: 1.5rem;
		user-select: none;
		background: var(--app-container-bg-secondary);
		padding: 1rem 1.25rem;
		cursor: pointer;
		border-radius: 0.25rem;
		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
	label {
		display: block;
		color: var(--app-container-text-primary-hover);
		cursor: pointer;
		font-family: var(--font-family-mono);
		font-weight: 400;
		font-size: 1rem;
		margin-top: 0.25rem;
	}
	${props => (!props.remove ? modalEntryAnim : modalExitAnim)}
`;

const Title = styled.h1`
	font-size: 1rem;
	margin-bottom: 0.25rem;
`;

const networkButtonStyles = css`
	--app-theme-opacity: 0.25;
	--app-theme-text: rgb(211 231 255);
	border: solid 0.15rem var(--app-theme-primary);
	background: rgba(var(--app-theme-value), var(--app-theme-opacity));
	color: var(--app-theme-text);
`;

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
	z-index: 2;
	user-select: none;
	${props => props.network && networkButtonStyles};
`;

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
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 3;
	display: flex;
	flex-direction: column;
	${props => (!props.remove ? alertEntryAnim : alertExitAnim)}
`;

const Content = styled.p`
	padding-top: 0.25rem;
	padding-bottom: 1rem;
	font-size: 1.125rem;
	color: var(--app-container-text-primary-hover);
`;

const ButtonsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.75rem;
`;

const StyledSelect = styled(Select)`
	--app-theme-opacity: 0.25;
	--app-theme-text: rgb(211 231 255);
	--app-theme-text-transparent: rgba(211, 231, 255, var(--app-theme-opacity));
	position: relative;
	font-size: 1rem;
	z-index: 3;
	height: 100%;
`;

const elemContains = (rect, x, y) => {
	return rect
		? rect.x <= x &&
				x <= rect.x + rect.width &&
				rect.y <= y &&
				y <= rect.y + rect.height
		: false;
};

const NetworkSwitchButton = () => {
	const { auth, logout } = useContext(AuthContext);
	const options = [
		{
			value: "reef_testnet",
			label: "Testnet",
		},
		{
			value: "reef_mainnet",
			label: "Mainnet",
		},
	];

	const initialNetwork = localStorage.getItem(
		`${constants.APP_NAME}__chosen_network`
	);
	const [chosenNetwork, setChosenNetwork] = useState(
		initialNetwork || defaultNetwork
	);

	useEffect(() => {
		!initialNetwork &&
			localStorage.setItem(
				`${constants.APP_NAME}__chosen_network`,
				defaultNetwork
			);
		//eslint-disable-next-line
	}, []);

	const handleNetworkChange = e => {
		let newNetwork = e?.value;
		localStorage.setItem(
			`${constants.APP_NAME}__chosen_network`,
			newNetwork
		);
		setChosenNetwork(newNetwork);
		auth && logout();
		window.location.reload();
	};

	const modifiedStyles = {
		...styles,
		control: (base, state) => ({
			...base,
			boxShadow: state.isFocused ? 0 : 0,
			border: "solid 0.15rem var(--app-theme-primary)",
			background:
				"rgba(var(--app-theme-value), var(--app-theme-opacity))",
			color: "var(--app-theme-text)",
			borderRadius: "0.5rem",
			height: "100%",
			"&:hover": {
				boxShadow: 0,
			},
		}),
		indicatorSeparator: base => ({
			...base,
			background: "var(--app-theme-text-transparent)",
		}),
		dropdownIndicator: (base, state) => ({
			...base,
			color:
				state.isSelected || state.isFocused
					? "var(--app-text)"
					: "var(--app-theme-text)",
			"&:hover": {
				color: "var(--app-text)",
			},
		}),
	};

	return (
		<StyledSelect
			options={options}
			value={options.find(option => option.value === chosenNetwork)}
			styles={modifiedStyles}
			isSearchable={false}
			placeholder="Select Route"
			onChange={handleNetworkChange}
		/>
	);
};

const AccountSelect = ({ isActive, setIsActive, accounts }) => {
	const { redirect } = useContext(AccountSelectContext);
	const [elemIsVisible, setElemIsVisible] = useState(isActive);

	const initialClaimButtonText = "I Accept";
	const [claimButtonText, setClaimButtonText] = useState(
		initialClaimButtonText
	);

	const [signer, setSigner] = useState("");
	const { auth, login, logout, setLoading } = useContext(AuthContext);
	const [alert, setAlert] = useState({
		isActive: false,
	});
	const [alertIsVisible, setAlertIsVisible] = useState(alert.isActive);
	const modalRef = useRef();
	const alertRef = useRef();
	const history = useHistory();
	//eslint-disable-next-line
	const [selectedAccount, setSelectedAccount] = useState(null);
	const _onAccountChange = async val => {
		setLoading(true);
		let account = accounts.find(acc => acc.meta.name === val);
		setSelectedAccount(account);
		Connect(account)
			.then(async response => {
				if (response.evmClaimed === false) {
					setAlert({
						...alert,
						isActive: true,
					});
					setSigner(response.signer);
					// alert (`EVM account not claimed. Please claim it and try logging in again.\nYou will get the address ${ await response.signer.getAddress () }\nYou will need some Reef in order to pay for the transaction.`);
				} else {
					const acc = await response.signer.getAddress();
					// console.log ('evm account is claimed');
					login({ auth: { ...account, evmAddress: acc } });
					setIsActive(false);
					redirect.length !== 0 && history.push(redirect);
				}
			})
			.catch(err => {
				bread(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		if (isActive === false) {
			setTimeout(() => {
				setElemIsVisible(isActive);
			}, 200);
		} else {
			setElemIsVisible(isActive);
		}
	}, [isActive]);

	useEffect(() => {
		if (alert.isActive === false) {
			setTimeout(() => {
				setAlertIsVisible(alert.isActive);
			}, 200);
		} else {
			setAlertIsVisible(alert.isActive);
		}
	}, [alert.isActive]);

	const closeModal = () => {
		setAlert({
			...alert,
			isActive: false,
		});
		setIsActive(false);
		setLoading(false);
	};

	useLayoutEffect(() => {
		setIsActive(false);
		//eslint-disable-next-line
	}, []);

	const handleClickOutside = e => {
		let rect = modalRef?.current?.getBoundingClientRect();
		let rect2 = alertRef?.current?.getBoundingClientRect();
		if (
			!elemContains(rect, e.clientX, e.clientY) &&
			!elemContains(rect2, e.clientX, e.clientY)
		) {
			closeModal();
		}
	};

	useEscape(() => {
		closeModal();
	});

	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible && (
				<BackDrop
					remove={!isActive}
					onMouseDown={handleClickOutside}
					onTouchStart={handleClickOutside}
				>
					<Modal remove={!isActive} ref={modalRef}>
						<span className="close-btn" onClick={closeModal}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
							</svg>
						</span>

						{auth && <ProfileElement />}
						<Title>Choose an{auth && "other"} account</Title>
						<StyledSimpleBar style={{ maxHeight: 300 }}>
							{accounts?.length ? (
								<>
									{accounts
										? accounts
												.filter(item =>
													auth
														? auth.address !==
														  item.address
														: true
												)
												.map((account, index) => {
													return (
														<m.p
															whileHover={{
																y: -2.5,
																x: 0,
															}}
															whileTap={{
																scale: 0.99,
															}}
															onClick={() =>
																_onAccountChange(
																	account.meta
																		.name
																)
															}
															key={index}
														>
															{" "}
															{account.meta.name}
															<label
																title={
																	account.address
																}
															>
																{truncateAddress(
																	account.address
																)}
															</label>{" "}
														</m.p>
													);
												})
										: null}
								</>
							) : (
								"Please connect your wallet"
							)}
						</StyledSimpleBar>
						{!auth && (
							<>
								<DividerHorizontal />
								<NetworkSwitchButton />
							</>
						)}
						{auth && (
							<>
								<DividerHorizontal />
								<ButtonsContainer>
									<NetworkSwitchButton />
									<Button
										whileHover={{
											y: -5,
											x: 0,
											scale: 1.02,
										}}
										whileTap={{
											scale: 0.99,
										}}
										onClick={() => {
											logout();
											window.location.reload();
										}}
									>
										Logout
									</Button>
								</ButtonsContainer>
							</>
						)}
					</Modal>
					{alertIsVisible && (
						<Alert remove={!alert.isActive} ref={alertRef}>
							<Title>Claim EVM Account</Title>
							<Content>
								EVM account not claimed.
								<br />
								Please claim it and try logging in again.
								<br />
								You will need some Reef in order to pay for the
								transaction.
							</Content>
							<Button
								whileHover={{
									y: -5,
									x: 0,
									scale: 1.01,
								}}
								whileTap={{
									scale: 0.99,
								}}
								onClick={() => {
									//startLoading
									setClaimButtonText(<FadeLoaderIcon />);
									signer
										.claimDefaultAccount()
										.catch(e => {
											bread(
												"EVM account could not be claimed! Please try again later."
											);
										})
										.finally(() => {
											//stopLoading
											setClaimButtonText(
												initialClaimButtonText
											);
											setIsActive(false);
											setAlert({
												...alert,
												isActive: false,
											});
										});
								}}
							>
								{claimButtonText}
							</Button>
						</Alert>
					)}
				</BackDrop>
			)}
		</LazyMotion>
	);
};

export default AccountSelect;
