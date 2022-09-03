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
import ReefIcon from "@static/svg/ReefIcon";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";

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
	max-width: 20rem;
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
	.account-name {
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

const ErrorMessageLine = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 500;
	padding: 0.25rem 0;
	text-align: center;
	gap: 1rem;
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
`;

const SVG = styled.svg`
	fill: var(--app-container-text-primary);
	height: 1.5rem;
	width: 1.5rem;
`;

const ExternalLinkA = styled.a`
	color: var(--app-container-text-primary);
	text-decoration: none;
	cursor: pointer;
	align-items: center;
	text-align: center;
	transition: all 0.1s ease-in-out;
	:hover > svg {
		transform: scale(1.1);
		fill: var(--app-container-text-primary-hover);
	}
	:hover {
		color: var(--app-container-text-primary-hover);
	}
	svg {
		transition: all 0.1s ease-in-out;
	}
`;

const ExternalLink = ({ icon, href, title }) => {
	return (
		<ExternalLinkA
			title={title}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				{icon}
			</SVG>
			<div>
				<span>{title}</span>
			</div>
		</ExternalLinkA>
	);
};

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
	const { redirect, errorCode } = useContext(AccountSelectContext);
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
	const { showErrorModal } = useErrorModalHelper();
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
				showErrorModal(err);
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
						{errorCode === 0 ? (
							<Title>Choose an{auth && "other"} account</Title>
						) : null}
						<StyledSimpleBar style={{ maxHeight: 300 }}>
							{errorCode === 0 && (
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
															className="account-name"
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
							)}
							{errorCode === 1 && (
								<>
									<ErrorMessageLine>
										Please install the Reef browser
										extension and reload the page.
										<div>
											<ExternalLink
												href="https://chrome.google.com/webstore/detail/reefjs-extension/mjgkpalnahacmhkikiommfiomhjipgjn"
												icon={
													<path d="M2.897 4.181c2.43-2.828 5.763-4.181 9.072-4.181 4.288 0 8.535 2.273 10.717 6.554-2.722.001-6.984 0-9.293 0-1.674.001-2.755-.037-3.926.579-1.376.724-2.415 2.067-2.777 3.644l-3.793-6.596zm5.11 7.819c0 2.2 1.789 3.99 3.988 3.99s3.988-1.79 3.988-3.99-1.789-3.991-3.988-3.991-3.988 1.791-3.988 3.991zm5.536 5.223c-2.238.666-4.858-.073-6.293-2.549-1.095-1.891-3.989-6.933-5.305-9.225-1.33 2.04-1.945 4.294-1.945 6.507 0 5.448 3.726 10.65 9.673 11.818l3.87-6.551zm2.158-9.214c1.864 1.734 2.271 4.542 1.007 6.719-.951 1.641-3.988 6.766-5.46 9.248 7.189.443 12.752-5.36 12.752-11.972 0-1.313-.22-2.66-.69-3.995h-7.609z" />
												}
												title="Download for Chrome"
											/>
											<ExternalLink
												href="https://addons.mozilla.org/en-US/firefox/addon/reef-js-extension/"
												icon={
													<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8.003 8.657c-1.276-3.321-4.46-4.605-5.534-4.537 3.529 1.376 4.373 6.059 4.06 7.441-.307-1.621-1.286-3.017-1.872-3.385 3.417 8.005-4.835 10.465-7.353 7.687.649.168 1.931.085 2.891-.557.898-.602.983-.638 1.56-.683.686-.053-.041-1.406-1.539-1.177-.616.094-1.632.819-2.88.341-1.508-.576-1.46-2.634.096-2.015.337-.437.088-1.263.088-1.263.452-.414 1.022-.706 1.37-.911.228-.135.829-.507.795-1.23-.123-.096-.32-.219-.766-.193-1.736.11-1.852-.518-1.967-.808.078-.668.524-1.534 1.361-1.931-1.257-.193-2.28.397-2.789 1.154-.809-.174-1.305-.183-2.118-.031-.316-.24-.666-.67-.878-1.181 1.832-2.066 4.499-3.378 7.472-3.378 5.912 0 8.263 4.283 8.003 6.657z" />
												}
												title="Download for Firefox"
											/>
										</div>
									</ErrorMessageLine>
								</>
							)}
							{errorCode === 2 && (
								<>
									<ErrorMessageLine>
										Use the Reef extension to create your
										account and reload the page.
										<div>
											<ExternalLink
												href="https://app.reef.io/"
												icon={<ReefIcon size={24} />}
												title="Check out the instructions"
											/>
										</div>
									</ErrorMessageLine>
								</>
							)}
							{/* {accounts?.length ? (
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
															className="account-name"
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
							)} */}
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
											showErrorModal(
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
