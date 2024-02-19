import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { LazyMotion, domAnimation } from "framer-motion";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
//eslint-disable-next-line
import ReefIcon from "@static/svg/ReefIcon";
import Loading from "@elements/Default/Loading";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import {
	//eslint-disable-next-line
	addBid,
	burnCollectible,
	//eslint-disable-next-line
	buyNow,
	createBid,
	createItemAuction,
	createItemLoan,
	createItemRaffle,
	createSale,
	enterRaffle,
	putItemOnSale,
	//eslint-disable-next-line
	putOnSale,
	transferCollectible,
} from "@utils/marketplace";
//eslint-disable-next-line
import bread from "@utils/bread";
import AlertIcon from "@static/svg/AlertIcon";
import { useHistory } from "react-router-dom";
import intervalToFormattedDuration from "@utils/intervalToFormattedDuration";
import { minutesToMilliseconds } from "date-fns";
import AuthContext from "@contexts/Auth/AuthContext";
import constants from "@utils/constants";
import axios from "axios";
import { getBackend } from "@utils/network";
import { numberSeparator } from "@utils/numberSeparator";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";
import { getInfuraURL } from "@utils/getIPFSURL";
import Scrollbars from "react-custom-scrollbars";
import { Component } from "react";
import { moveCollectibleToCollection } from "@utils/moveCollectibleToCollection";
import { BigNumber } from "ethers";
import { briefSearchAll } from "@utils/search";
import { UserResult, UserResultText } from "@elements/Navbar/Search";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import shortenIfAddress from "@utils/shortenIfAddress";
// import { Interact } from "@utils/connect";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`;

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const BackDrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	min-height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
	display: grid;
	place-items: center;
	z-index: 60;
`;

const Modal = styled.div`
	padding: 2rem 1.5rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 15;
	min-width: 33vw;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${props => (!props.remove ? modalEntryAnim : modalExitAnim)}
`;

const Title = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const InputTitle = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	span {
		font-weight: 700;
		font-size: 1rem;
		background: linear-gradient(
			110deg,
			var(--app-theme-primary) 0%,
			var(--app-theme-secondary) 100%
		);
		color: var(--app-text) !important;
		border-radius: 1rem;
		padding: 0.1rem 0.5rem;
		float: right;
	}
`;

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline: none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
`;

const Group = styled.div`
	padding: 0 1rem;
`;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	span {
		color: var(--app-container-text-primary-hover);
		font-weight: 700;
	}
`;

const Btn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	z-index: 2;
	width: fit-content;
	margin-left: auto;
	margin-top: 1.5rem;
	min-width: 6rem;
`;

const BurnBtn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	min-width: 6rem;
	margin-top: 1.5rem;
	z-index: 2;
	background-image: linear-gradient(
		110deg,
		rgb(255,0,0) 0%,
		rgb(150,0,0) 50%,
		rgb(255,0,0) 100%
	) !important;
`;

const InfoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	margin: 1.5rem 0;
`;

const InfoElements = styled.p`
	font-size: 1.125rem;
	font-weight: 800;
	color: var(--app-text);
	span {
		font-weight: 500;
	}
`;

const StyledLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	text-decoration: none;
	font-size: 1rem;
	color: var(--app-container-text-primary);
	transition: color 0.2s ease;
	cursor: pointer;
	svg {
		height: 1rem;
		width: 1rem;
	}
	&:hover {
		color: var(--app-container-text-primary-hover);
	}
`;

const ToastLink = styled.a`
	text-decoration: none;
	color: var(--app-theme-primary);
`;

const REEF_ADDRESS_SPECIFIC_STRING = "(ONLY for Reef chain!)";

const removeReefSpecificStringFromAddress = (address) =>
  address.replace(REEF_ADDRESS_SPECIFIC_STRING, "").trim();

const InfoSection = ({ fee, link }) => {
	return (
		<InfoWrapper>
			<InfoElements>
				Service Fees: <span>{fee}%</span>
			</InfoElements>
			<InfoElements>
				<StyledLink
					href={constants.DOCUMENTATION[link]}
					target="_blank"
					rel="noopener noreferrer"
				>
					Need more info?
					<AlertIcon />
				</StyledLink>
			</InfoElements>
		</InfoWrapper>
	);
};

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale: 0.97,
		}}
		// whileHover={{
		// 	y: -5,
		// 	x: 0,
		// 	scale: 1.02,
		// }}
		{...props}
	>
		{children}
	</Btn>
);

const BurnAnimBtn = ({ children, ...props }) => (
	<BurnBtn
		whileTap={{
			scale: 0.97,
		}}
		{...props}
	>
		{children}
	</BurnBtn>
);

const elemContains = (rect, x, y) => {
	return (
		rect.x <= x &&
		x <= rect.x + rect.width &&
		rect.y <= y &&
		y <= rect.y + rect.height
	);
};

const ModalContainer = ({ isActive, setIsActive, ...props }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive);
	const modalRef = useRef();
	//eslint-disable-next-line
	useEffect(() => {
		if (isActive === false) {
			setTimeout(() => {
				setElemIsVisible(isActive);
			}, 200);
		} else {
			setElemIsVisible(isActive);
		}
	}, [isActive]);

	const handleClickOutside = e => {
		let rect = modalRef.current.getBoundingClientRect();
		if (!elemContains(rect, e.clientX, e.clientY)) {
			setIsActive(false);
		}
	};
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible && (
				/*
					Look into using onPointerUp instead of using both onMouseDown and onTouchStart
					https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onpointerup
					https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
					Also check the necessary polyfills since its support might not be really good
					https://caniuse.com/mdn-api_globaleventhandlers_onpointerup
					Also look into using react-modal instead of this since it has better support and mine is bloated
				*/
				<BackDrop
					remove={!isActive}
					onMouseDown={handleClickOutside}
					onTouchStart={handleClickOutside}
				>
					<Modal remove={!isActive} ref={modalRef}>
						{props.children}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	);
};

/*
export const TransferModal = props => {
	const [value, setValue] = useState({
		address: "",
		amount: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleAddressInput = e => {
		if (Number(e.target.value) >= 0) {
			setValue({
				...value,
				address: e.target.value,
			});
		}
	};

	const handleAmountInput = e => {
		if (Number(e.target.value) <= Number(props.itemInfo.maxAmount)) {
			setValue({
				...value,
				amount: e.target.value,
			});
		}
	};

	const handleClick = () => {
		setIsLoading(true);
		// addBid(props.itemInfo.itemId, value.price, value.amount).then(() => {
		// 	setIsLoading(false);
		// 	props.setIsActive(false)
		// }).catch(err => {
		// 	bread(err.response.data.error)
		// });
		alert(`Address: ${value.address} \n Amount: ${value.amount}`);
	};
	return (
		<ModalContainer {...props}>
			<Title>Transfer Ownership</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Address</InputTitle>
					<InputContainer
						type="number"
						value={value.price}
						onChange={handleAddressInput}
						placeholder={`Enter Address (0x...)`}
					/>
					<InputTitle>
						Amount (max {props.itemInfo.maxAmount})
					</InputTitle>
					<InputContainer
						type="number"
						value={value.amount}
						onChange={handleAmountInput}
						placeholder={`Enter Amount (# of copies)`}
					/>
				</InputWrapper>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					Transfer
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};
*/

// const SearchResults = ({ results, setResults, setIsActive }) => {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [value, setValue] = useState({
// 		address: "",
// 		amount: "",
// 	});

const ResultsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--app-background);
	z-index: 1;
	border-radius: 1rem;
	gap: .5rem;
	padding: .5rem;
	max-width: 20rem;
`;

const SearchUserResult = styled(UserResult)`
	border-radius: 1rem;
	&:hover {
		cursor: pointer;
	}
	&:hover span {
		color: var(--app-container-text-primary-hover);
	}
`;

export const TransferModal = props => {
	const history = useHistory();
	const [address, setAddress] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [copies, setCopies] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [addressSelected, setAddressSelected] = useState(false);
	const [isUnknownAddress, setIsUnknownAddress] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const [results, setResults] = useState({});
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const { showErrorModal } = useErrorModalHelper ();

	useEffect (() => {
		const delayDebounceFn = setTimeout(() => {
			if (address.length) {
				briefSearchAll (address).then (async res => {
					setResults (res);
					if (res.users.length === 0 && address.length === 42 && address.startsWith ("0x")) {
						setAddressSelected (true);
						setDisplayName (address);
						setIsUnknownAddress (true);
					} else {
						setIsUnknownAddress (false);
					}
				});
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [address]);

	const handleInput = e => {
		setAddressSelected (false);
		setAddress(removeReefSpecificStringFromAddress(e.target.value));
		if (e.target.value === "") {
			setResults({});
			setIsUnknownAddress (false);
		}
	};
	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
	};
	const handleClick = async () => {
		if (!isLoading && Number(copies) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			try {
				const receipt = await transferCollectible(
					address,
					collectibleInfo.tokenId,
					copies
				);
				if (receipt) {
					if (Number(copies) === collectibleInfo.amount) {
						history.push('/profile');
					} else {
						setCollectibleInfo({
							...collectibleInfo,
							amount: collectibleInfo.amount - Number(copies),
						});
						setIsLoading(false);
						setButtonText(initialButtonText);
						setAddress("");
						setCopies("");
						props.setIsActive(false);
						bread(
							<div>
								Collectible sent!
							</div>
						);
					}
				} else {
					setIsLoading(false);
					setButtonText(initialButtonText);
				}
			} catch (err) {
				setIsLoading(false);
				setButtonText(initialButtonText);
				showErrorModal(err.toString ());
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Transfer collectible</Title>
			<Group>
				<InputWrapper>
					<InputTitle>
						Recipient{" "}
						{(
							<span>
								{shortenIfAddress (displayName)}
							</span>
						)}
					</InputTitle>
					<InputContainer
						type="text"
						value={address}
						onChange={handleInput}
						placeholder={`Reef EVM address`}
					/>
					{(results.users?.length && !addressSelected && address.length) ? <ResultsContainer>
						{results.users?.map((user, i) => (
							<SearchUserResult
								onClick = {() => {
									setAddress(user.evmAddress);
									setDisplayName(user.displayName);
									setAddressSelected (true);
									setResults ({});
								}}
								key = {user.evmAddress}
							>
								<img alt = "User Avatar" src={getAvatarFromId (user.evmAddress)} />
								<UserResultText>
									<span>{user.displayName}</span>
									<span>{user.evmAddress}</span>
								</UserResultText>
							</SearchUserResult>
						))}
					</ResultsContainer> : null}
					{isUnknownAddress && (
						<span>
							This address is not registered on Sqwid.<br/>Are you sure you want to send to this address?
						</span>
					)}
					<InputTitle>
						Number of editions{" "}
						<span>
							{Number(copies)} / {collectibleInfo.amount}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of editions to send`}
					/>
				</InputWrapper>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

// move to a different file later
export const AddFeaturedModal = props => {
	const [positionId, setPositionId] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { showErrorModal } = useErrorModalHelper();
	const handleClick = async () => {
		if (!isLoading && Number(positionId) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const res = await axios.get(
				`${getBackend()}/get/marketplace/position/${positionId}`
			);
			setIsLoading(false);
			setButtonText(initialButtonText);
			setPositionId("");
			if (res.data.error) showErrorModal(res.data.error);
			else {
				props.setIsActive(false);
				props.addItemInfo(res.data);
			}
		} else {
			setIsLoading(false);
			setButtonText(initialButtonText);
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Add NFT</Title>
			<Group>
				<InputTitle>Position ID</InputTitle>
				<InputContainer
					type="number"
					value={positionId}
					onChange={e => setPositionId(e.target.value)}
					placeholder={`Position ID`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};
// move to a different file later
export const EditCollectionModal = props => {
	const initialButtonText = "Update";
	const [name, setName] = useState(null);
	const [description, setDescription] = useState(null);
	// eslint-disable-next-line
	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line
	const [buttonText, setButtonText] = useState(initialButtonText);

	useEffect (() => {
		if (name === null) setName (props.collection.name);
		if (description === null) setDescription (props.collection.description);
	}, [props.collection, name, description]);
	// const { showErrorModal } = useErrorModalHelper();
	const handleClick = async () => {
		// if (!isLoading && Number(positionId) >= 1) {
		// 	setIsLoading(true);
		// 	setButtonText(<Loading />);
		// 	const res = await axios.get(
		// 		`${getBackend()}/get/marketplace/position/${positionId}`
		// 	);
		// 	setIsLoading(false);
		// 	setButtonText(initialButtonText);
		// 	setPositionId("");
		// 	if (res.data.error) showErrorModal(res.data.error);
		// 	else {
		// 		props.setIsActive(false);
		// 		props.addItemInfo(res.data);
		// 	}
		// } else {
		// 	setIsLoading(false);
		// 	setButtonText(initialButtonText);
		// }
	};
	return (
		<ModalContainer {...props}>
			<Title>Edit collection</Title>
			<Group>
				<InputTitle>Name</InputTitle>
				<InputContainer
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder={`Name`}
				/><br/>
				<InputTitle>Description</InputTitle>
				<InputContainer
					type="text"
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder={`Description`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

/*
	Need to add more modals based on https://res.cloudinary.com/etjfo/image/upload/v1643994671/sqwid/modals.jpg
*/

export const CreateAuctionModal = props => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const initialButtonText = "Create Auction";
	const [buttonText, setButtonText] = useState(initialButtonText);
	const [minBid, setMinBid] = useState("");
	const [copies, setCopies] = useState("");
	const [duration, setDuration] = useState("");

	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);

	const handleMinutesInput = e => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? "" : amount);
	};

	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
	};

	const handleClick = async () => {
		if (
			!isLoading &&
			Number(minBid) >= 1 &&
			Number(copies) > 0 &&
			Number(duration) > 1
		) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemAuction(
				collectibleInfo.itemId,
				Number(copies),
				Number(duration),
				minBid
			);
			if (receipt) {
				const newPositionId =
					receipt.events[1].args["positionId"].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false);
					setButtonText(initialButtonText);
					setCopies("");
					setDuration("");
					setMinBid("");
					props.setIsActive(false);

					bread(
						<div>
							Auction created! Check it out{" "}
							<ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								here
							</ToastLink>
							!
						</div>
					);
				}
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Create Auction</Title>
			<Group>
				<InputWrapper>
					<InputTitle>
						Minimum Bid{" "}
						<span>
							$
							{numberSeparator(
								(
									collectibleInfo.conversionRate * minBid
								).toFixed(2)
							)}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={minBid}
						onChange={e => {
							setMinBid(e.target.value);
						}}
						placeholder={`Minimum bid for the lot in REEF`}
					/>
					<InputTitle>
						Number of editions
						<span>
							{Number(copies)} / {collectibleInfo.amount}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of editions for the lot`}
					/>
					<InputTitle>Number of Minutes</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the auction in minutes`}
					/>
					<span>
						{duration
							? intervalToFormattedDuration(
									minutesToMilliseconds(Number(duration))
							  )
							: "(Duration will appear here once you start typing)"}
					</span>
				</InputWrapper>
				<InfoSection link="auctions" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const PutOnSaleModal = props => {
	const history = useHistory();
	const [price, setPrice] = useState("");
	const [copies, setCopies] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);

	const handleInput = e => {
		setPrice(e.target.value);
	};
	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
	};
	const handleClick = async () => {
		if (!isLoading && Number(price) >= 1 && Number(copies) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await putItemOnSale(
				collectibleInfo.itemId,
				Number(copies),
				price
			);
			if (receipt) {
				const newPositionId =
					receipt.events[1].args["positionId"].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false);
					setButtonText(initialButtonText);
					setPrice("");
					setCopies("");
					props.setIsActive(false);
					bread(
						<div>
							Sale created! Check it out{" "}
							<ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								here
							</ToastLink>
							!
						</div>
					);
				}
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Put on sale</Title>
			<Group>
				<InputWrapper>
					<InputTitle>
						Price{" "}
						<span>
							$
							{numberSeparator(
								(
									collectibleInfo.conversionRate * price
								).toFixed(2)
							)}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={price}
						onChange={handleInput}
						placeholder={`Enter Price (in Reef)`}
					/>
					<InputTitle>
						Number of editions{" "}
						<span>
							{Number(copies)} / {collectibleInfo.amount}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of editions for sale`}
					/>
				</InputWrapper>
				<InfoSection link="sale" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const LendModal = props => {
	const history = useHistory();
	const [amount, setAmount] = useState("");
	const [paybackFee, setPaybackFee] = useState("");
	const [copies, setCopies] = useState("");
	const [duration, setDuration] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);

	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
	};

	const handleMinutesInput = e => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? "" : amount);
	};

	const handleClick = async () => {
		if (
			!isLoading &&
			Number(amount) >= 1 &&
			Number(copies) >= 1 &&
			Number(paybackFee) >= 0 &&
			Number(duration) > 0
		) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemLoan(
				collectibleInfo.itemId,
				amount,
				paybackFee,
				Number(copies),
				Number(duration)
			);
			if (receipt) {
				const newPositionId =
					receipt.events[1].args["positionId"].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false);
					setButtonText(initialButtonText);
					setAmount("");
					setCopies("");
					setPaybackFee("");
					setDuration("");
					props.setIsActive(false);
					bread(
						<div>
							Loan proposal created! Check it out{" "}
							<ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								here
							</ToastLink>
							!
						</div>
					);
				}
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Create Loan Proposal</Title>
			<Group>
				<InputWrapper>
					<InputTitle>
						Loan Amount{" "}
						<span>
							$
							{numberSeparator(
								(
									collectibleInfo.conversionRate * amount
								).toFixed(2)
							)}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={amount}
						onChange={e => setAmount(e.target.value)}
						placeholder={`Amount to borrow (in Reef)`}
					/>
					<InputTitle>
						Payback Fee{" "}
						<span>
							$
							{numberSeparator(
								(
									collectibleInfo.conversionRate * paybackFee
								).toFixed(2)
							)}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={paybackFee}
						onChange={e => setPaybackFee(e.target.value)}
						placeholder={`Amount to pay the lender as interest (in Reef)`}
					/>
					<InputTitle>
						Number of editions
						<span>
							{Number(copies)} / {collectibleInfo.amount}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of editions for the lot`}
					/>
					<InputTitle>Duration</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the loan in minutes`}
					/>
					<span>
						{duration
							? intervalToFormattedDuration(
									minutesToMilliseconds(Number(duration))
							  )
							: "(Duration will appear here once you start typing)"}
					</span>
				</InputWrapper>
				<InfoSection link="loan" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const RaffleModal = props => {
	const history = useHistory();
	const [copies, setCopies] = useState("");
	const [duration, setDuration] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);

	const handleMinutesInput = e => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? "" : amount);
	};

	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
	};

	const handleClick = async () => {
		if (!isLoading && Number(copies) >= 1 && Number(duration) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemRaffle(
				collectibleInfo.itemId,
				Number(copies),
				Number(duration)
			);
			if (receipt) {
				const newPositionId =
					receipt.events[1].args["positionId"].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false);
					setButtonText(initialButtonText);
					setDuration("");
					setCopies("");
					props.setIsActive(false);
					bread(
						<div>
							Raffle created! Check it out{" "}
							<ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								here
							</ToastLink>
							!
						</div>
					);
				}
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Create Raffle</Title>
			<Group>
				<InputWrapper>
					<InputTitle>
						Number of editions
						<span>
							{Number(copies)} / {collectibleInfo.amount}
						</span>
					</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of editions for the lot`}
					/>
					<InputTitle>Duration</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the raffle in minutes`}
					/>
					<span>
						{duration
							? intervalToFormattedDuration(
									minutesToMilliseconds(Number(duration))
							  )
							: "(Duration will appear here once you start typing)"}
					</span>
				</InputWrapper>
				<InfoSection link="raffle" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const EnterRaffleModal = props => {
	const [amount, setAmount] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	// eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const handleClick = async () => {
		if (!isLoading && Number(amount) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await enterRaffle(
				collectibleInfo.positionId,
				amount
			);
			if (receipt) {
				setIsLoading(false);
				setButtonText(initialButtonText);
				setAmount("");
				props.setIsActive(false);
				bread(`You've added ${amount} Reef to the raffle!`);
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		} else {
			setIsLoading(false);
			setButtonText(initialButtonText);
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Enter Raffle</Title>
			<Group>
				<div>Any amount you send will be added to your total</div>{" "}
				<br />
				<InputTitle>Amount</InputTitle>
				<InputContainer
					type="number"
					value={amount}
					onChange={e => setAmount(e.target.value)}
					placeholder={`Amount to be sent (in Reef)`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const BidsModal = props => {
	const [amount, setAmount] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	// const [minToBid, setMinToBid] = useState(0);
	const { auth } = useContext(AuthContext);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const minToBid = Math.max(
		collectibleInfo.auction.minBid / 10 ** 18,
		collectibleInfo.auction.highestBid / 10 ** 18
	);
	const currentBid = collectibleInfo.auction.myBid || 0;
	const handleAmountInput = e => {
		setAmount(e.target.value);
	};

	const handleClick = async () => {
		if (!isLoading && Number(amount) + currentBid >= minToBid) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createBid(collectibleInfo.positionId, amount);
			if (receipt) {
				// console.log(receipt);
				setCollectibleInfo({
					...collectibleInfo,
					auction: {
						...collectibleInfo.auction,
						highestBid: amount * 10 ** 18,
						highestBidder: {
							...collectibleInfo.auction.highestBidder,
							address: auth?.evmAddress,
						},
					},
				});
				setIsLoading(false);
				setButtonText(initialButtonText);
				setAmount("");
				props.setIsActive(false);
				bread(`You bid ${amount} Reef!`);
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		} else {
			setIsLoading(false);
			setButtonText(initialButtonText);
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Bid or increase your bid</Title>
			<Group>
				<div>
					If you've already bid, your new bid will be added to your
					total,
					<br /> and the total must be more than the highest bid.
				</div>{" "}
				<br />
				<InputTitle>Amount (total more than {minToBid})</InputTitle>
				<InputContainer
					type="number"
					value={amount}
					onChange={handleAmountInput}
					placeholder={`Amount to bid (in Reef)`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};

export const BuyModal = props => {
	const history = useHistory();
	const [copies, setCopies] = useState("");
	const initialButtonText = "Buy";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);

	const handleCopiesInput = e => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || "");
		// console.log (collectibleInfo.sale.price);
		if (amount) {
			setButtonText(
				`Buy for ${
					BigNumber.from (amount).mul(BigNumber.from (collectibleInfo.sale.price.toLocaleString('fullwide', {useGrouping:false})).div (BigNumber.from ('10').pow (18))).toString()
				} Reef / $${(
					amount *
					(collectibleInfo.sale.price / 10 ** 18) *
					collectibleInfo.conversionRate
				).toFixed(2)}`
			);
		} else {
			setButtonText(initialButtonText);
		}
	};

	const handleClick = async () => {
		if (!isLoading && Number(copies) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createSale(
				collectibleInfo.positionId,
				Number(copies),
				// Number(collectibleInfo.sale.price) / 10 ** 18
				BigNumber.from (collectibleInfo.sale.price.toLocaleString('fullwide', {useGrouping:false}))
			);
			if (receipt) {
				if (Number(copies) === collectibleInfo.amount) {
					history.push(`/profile`);
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false);
					setButtonText(initialButtonText);
					setCopies("");
					props.setIsActive(false);
					const shortUrl = `/profile`;
					bread(
						<div>
							Item{copies.length > 1 ? "s" : ""} bought! Check{" "}
							{copies.length > 1 ? "them" : "it"} out{" "}
							<ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								on your profile
							</ToastLink>
							!
						</div>
					);
				}
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title>Buy</Title>
			<Group>
				<InputTitle>
					Number of editions{" "}
					<span>
						{Number(copies)} / {collectibleInfo.amount}
					</span>
				</InputTitle>
				<InputContainer
					type="number"
					value={copies}
					onChange={handleCopiesInput}
					placeholder={`Number of editions to buy`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</AnimBtn>
			</Group>
		</ModalContainer>
	);
};


export const BurnModal = props => {
	const history = useHistory();
	const initialButtonText = "Burn";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { showErrorModal } = useErrorModalHelper();
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const handleClick = async () => {
		if (!isLoading) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await burnCollectible(
				collectibleInfo.tokenId,
				collectibleInfo.amount
			);
			if (receipt) {
				bread ('Collectible burned!');
				setTimeout (() => {
					history.push(`/profile`);
				}, 1000);
			} else {
				setIsLoading(false);
				setButtonText(initialButtonText);
				showErrorModal('Something went wrong. Please try again later.');
			}
		}
	};
	return (
		<ModalContainer {...props}>
			<Title style = {{ textAlign: 'center' }}>Burn - THIS IS PERMANENT !</Title>
			<Group>
				<div style = {{ textAlign: 'center' }}>
					Are you sure you want to permanently burn this collectible?
				</div>
				<BurnAnimBtn disabled={isLoading} onClick={handleClick}>
					{buttonText}
				</BurnAnimBtn>
			</Group>
		</ModalContainer>
	);
};

const SelectorWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border: .1rem solid ${props => props.active ? 'var(--app-text)' : 'var(--app-container-text-primary)'};
	padding: 0 rem .5rem;
	padding-left: 0;
	border-radius: .5rem;
	margin-bottom: .5rem;
	overflow: hidden;
	padding-right: 1rem;
	gap: 1rem;
	cursor: pointer;
	transiton: all .2s ease-in-out;
	:hover {
		border: .1rem solid var(--app-text);
	};
	div {
		transition: all .2s ease-in-out;
		transform: translate(${props => props.active ? '-1rem' : '0'}, 0);
	};
	img {
		transition: all .2s ease-in-out;
		transform: scale(${props => props.active ? '1.2' : '1'});
	}
`;

const SelectorImage = styled.img`
	width: 3.25rem;
	height: 3.25rem;
	object-fit: cover;
`;

class CustomScrollbar extends Component {
	constructor(props, ...rest) {
		super(props, ...rest);
		this.renderView = this.renderView.bind(this);
		this.renderThumb = this.renderThumb.bind(this);
		this.scrollbars = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (this.props.move !== prevProps.move) {
			let scrollbars = this.scrollbars;
			if (
				this.props.move > 0 &&
				this.props.move < scrollbars.getThumbHorizontalWidth()
			) {
				let left = this.props.move;
				scrollbars.scrollLeft(left);
			}
		}
	}

	renderView({ style, ...props }) {
		const viewStyle = {
			paddingRight: "1rem"
		};
		return <div style={{ ...style, ...viewStyle }} {...props} />;
	}

	renderThumb({ style, ...props }) {
		const thumbStyle = {
			backgroundColor: "rgb(255 255 255 / 25%)",
			borderRadius: "1000rem",
		};
		return <div style={{ ...style, ...thumbStyle }} {...props} />;
	}

	render() {
		return (
			<Scrollbars
				renderView={this.renderView}
				renderThumbHorizontal={this.renderThumb}
				renderThumbVertical={this.renderThumb}
				ref={this.scrollbars}
				className="custom-scrollbars"
				{...this.props}
			/>
		);
	}
}

const ItemSelector = ({ item, selectedItem, setSelectedItem, isLoading }) => {
	const [isActive, setIsActive] = useState(false);
	useEffect (() => {
		if (item.id === selectedItem) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [selectedItem, item.id]);

	const handleClick = () => {
		!isLoading && setSelectedItem(item.id);
	};
	return (
		<SelectorWrapper active = {isActive} onClick = {handleClick}>
			<SelectorImage src = {getInfuraURL (item.data.thumbnail || item.data.image)} alt = {item.data.name} />
			<div>{item.data.name}</div>
		</SelectorWrapper>
	);
};

export const PickCollectionModal = props => {
	const initialButtonText = "Select a new collection";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const [collections, setCollections] = useState([]);
	const { showErrorModal } = useErrorModalHelper();
	const { auth } = useContext(AuthContext);
	const [selectedItem, setSelectedItem] = useState(null);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const handleClick = async () => {
		if (!isLoading && selectedItem) {
			setIsLoading(true);
			setButtonText(<Loading />);
			try {
				const res = await moveCollectibleToCollection (collectibleInfo.itemId, selectedItem);
				if (res && !res.error) {
					setButtonText ('Collectible moved!');
					setTimeout (() => {
						window.location.reload ();
					}, 1000);
				} else {
					setIsLoading(false);
					setButtonText(initialButtonText);
					showErrorModal('Something went wrong. Please try again later.');
				}
			} catch (error) {
				setIsLoading(false);
				setSelectedItem (null);
				setButtonText(initialButtonText);
				showErrorModal(error.toString ());
			}
		}
	};

	useEffect (() => {
		if (selectedItem) setButtonText (`Move collectible to ${collections.find (item => item.id === selectedItem).data.name}`);
	}, [selectedItem, collections]);

	useEffect(() => {
		// console.log (auth);
		if (auth) {
			axios
				.get(`${getBackend()}/get/collections/owner/${auth.evmAddress}`)
				.then(res => {
					setCollections(res.data.collections);
				})
				.catch(err => {
					if (err.toString().includes('404')) {
						setCollections([]);
					} else {
						showErrorModal(err.toString());
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		return () => {
			setCollections([]);
		};
		//eslint-disable-next-line
	}, []);
	return (
		<ModalContainer {...props}>
			<Title style = {{ textAlign: 'center' }}>Pick new collection</Title>
			{collections.length > 0 ? (
				<>
					<CustomScrollbar style = {{ minHeight: "40vh", maxWidth: "30vw" }}>
						{collections.map (collection => <ItemSelector
							item = {collection}
							selectedItem = {selectedItem}
							setSelectedItem = {setSelectedItem}
							isLoading = {isLoading}
							key = {collection.id}
						/>)}
					</CustomScrollbar>
					<AnimBtn style = {{
						marginTop: '.5rem',
					}} onClick = {handleClick}>
						{buttonText}
					</AnimBtn>
				</>
			) : (
				<div style = {{ textAlign: "center" }}>
					You don't have any collections yet. Create one to move your collectible.
				</div>
			)}

		</ModalContainer>
	);
};
