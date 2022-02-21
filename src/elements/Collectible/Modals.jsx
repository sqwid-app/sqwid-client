import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { LazyMotion, domAnimation } from "framer-motion"
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
//eslint-disable-next-line
import ReefIcon from "@static/svg/ReefIcon";
import Loading from "@elements/Default/Loading";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
//eslint-disable-next-line
import { addBid, buyNow, createBid, createItemAuction, createItemLoan, createItemRaffle, createSale, enterRaffle, putItemOnSale, putOnSale } from "@utils/marketplace";
//eslint-disable-next-line
import bread from "@utils/bread";
import { Link } from "react-router-dom";
import AlertIcon from "@static/svg/AlertIcon";
import { useHistory } from "react-router-dom";
import intervalToFormattedDuration from "@utils/intervalToFormattedDuration";
import { minutesToMilliseconds } from "date-fns";
import AuthContext from "@contexts/Auth/AuthContext";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
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
	bottom:0;
	right:0;
	min-height: 100vh;
	background: rgba(0, 0, 0,0.5);
	overflow:hidden;
	display: grid;
	place-items:center;
	z-index: 15;
`

const Modal = styled.div`
	padding: 2rem 1.5rem;
	background:var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index:15;
	min-width: 33vw;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	${props => !props.remove ? modalEntryAnim : modalExitAnim}
`

const Title = styled.h1`
	font-size: 1.5rem;
    margin-bottom: 1rem;
`

const InputTitle = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	span{
		color: var(--app-container-text-primary);
		font-weight: 700;
		font-size: 1rem;
	}
`

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type=number] {
		-moz-appearance: textfield;
	}
`

const Group = styled.div`
	padding: 0 1rem;
`

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	span{
		color: var(--app-container-text-primary-hover);
		font-weight: 700;
	}
`

const Btn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	z-index:2;
	width: fit-content;
	margin-left: auto;
	margin-top: 1.5rem;
	min-width: 6rem;
`

const InfoWrapper = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	gap: 0.5rem;
	margin: 1.5rem 0;
`

const InfoElements = styled.p`
	font-size: 1.125rem;
	font-weight: 800;
	color: var(--app-text);
	span{
		font-weight: 500;
	}
`

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	text-decoration: none;
	font-size: 1rem;
	color: var(--app-container-text-primary);
	transition: color 0.2s ease;
	svg{
		height: 1rem;
		width: 1rem;
	}
	&:hover{
		color: var(--app-container-text-primary-hover);
	}
`

const ToastLink = styled.a`
text-decoration: none;
color: var(--app-theme-primary);
`

const InfoSection = ({ fee, link }) => {
	return (
		<InfoWrapper>
			<InfoElements>
				Service Fees: <span>{fee}%</span>
			</InfoElements>
			<InfoElements>
				<StyledLink to={link} target="_blank" rel="noopener noreferrer"> Need more info?<AlertIcon /></StyledLink>
			</InfoElements>
		</InfoWrapper>
	)
}

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		whileHover={{
			y: -5,
			x: 0,
			scale: 1.02
		}}
		{...props}
	>{children}</Btn>
)

const elemContains = (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const ModalContainer = ({ isActive, setIsActive, ...props }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const modalRef = useRef()
	//eslint-disable-next-line
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

	const handleClickOutside = (e) => {
		let rect = modalRef.current.getBoundingClientRect();
		if (!elemContains(rect, e.clientX, e.clientY)) {
			setIsActive(false)
		}
	}
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
				<BackDrop remove={!isActive} onMouseDown={handleClickOutside} onTouchStart={handleClickOutside}>
					<Modal
						remove={!isActive}
						ref={modalRef}
					>
						{props.children}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

export const TransferModal = (props) => {
	const [value, setValue] = useState({
		address: "",
		amount: ""
	})
	const [isLoading, setIsLoading] = useState(false);

	const handleAddressInput = (e) => {
		if (Number(e.target.value) >= 0) {
			setValue({
				...value,
				address: e.target.value,
			});
		}
	}

	const handleAmountInput = (e) => {
		if (Number(e.target.value) <= Number(props.itemInfo.maxAmount)) {
			setValue({
				...value,
				amount: e.target.value,
			});
		}
	}

	const handleClick = () => {
		setIsLoading(true);
		// addBid(props.itemInfo.itemId, value.price, value.amount).then(() => {
		// 	setIsLoading(false);
		// 	props.setIsActive(false)
		// }).catch(err => {
		// 	bread(err.response.data.error)
		// });
		alert(`Address: ${value.address} \n Amount: ${value.amount}`)
	}
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
					<InputTitle>Amount (max {props.itemInfo.maxAmount})</InputTitle>
					<InputContainer
						type="number"
						value={value.amount}
						onChange={handleAmountInput}
						placeholder={`Enter Amount (# of copies)`}
					/>
				</InputWrapper>
				<AnimBtn disabled={isLoading} onClick={handleClick} >Transfer</AnimBtn>
			</Group>
		</ModalContainer>
	)
}


/*
	Need to add more modals based on https://res.cloudinary.com/etjfo/image/upload/v1643994671/sqwid/modals.jpg
*/

export const CreateAuctionModal = (props) => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const initialButtonText = "Create Auction";
	const [buttonText, setButtonText] = useState(initialButtonText);
	const [minBid, setMinBid] = useState("");
	const [copies, setCopies] = useState("");
	const [duration, setDuration] = useState("");

	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	const handleMinutesInput = (e) => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? '' : amount);
	}

	const handleClick = async () => {
		if (!isLoading && Number(minBid) >= 1 && Number(copies) > 0 && Number(duration) > 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemAuction(collectibleInfo.itemId, Number(copies), Number(duration), minBid);
			if (receipt) {
				const newPositionId = receipt.events[1].args['positionId'].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false)
					setButtonText(initialButtonText);
					setCopies("");
					setDuration("");
					setMinBid("");
					props.setIsActive(false);
					
					bread(
						<div>
							Auction created! Check it out <ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>here</ToastLink>!
						</div>
					)
				}
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Create Auction</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Minimum Bid</InputTitle>
					<InputContainer
						type="number"
						value={minBid}
						onChange={(e) => { setMinBid(e.target.value) }}
						placeholder={`Minimum bid for the lot in REEF`}
					/>
					<InputTitle>Number of Copies</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={(e) => { setCopies(e.target.value) }}
						placeholder={`Number of copies for the lot`}
					/>
					<InputTitle>Number of Minutes</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the auction in minutes`}
					/>
					<span>{duration ? intervalToFormattedDuration(minutesToMilliseconds(Number(duration))) : '(Duration will appear here once you start typing)'}</span>
				</InputWrapper>
				<InfoSection link="/blog/auctions" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const PutOnSaleModal = (props) => {
	const history = useHistory();
	const [price, setPrice] = useState("");
	const [copies, setCopies] = useState("");
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	const handleInput = (e) => {
		setPrice(e.target.value)
	}
	const handleCopiesInput = (e) => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || '');
	}
	const handleClick = async () => {
		if (!isLoading && Number(price) >= 1 && Number(copies) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await putItemOnSale(collectibleInfo.itemId, Number(copies), price);
			if (receipt) {
				const newPositionId = receipt.events[1].args['positionId'].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false)
					setButtonText(initialButtonText);
					setPrice("");
					setCopies("");
					props.setIsActive(false);
					bread(
						<div>
							Sale created! Check it out <ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>here</ToastLink>!
						</div>
					)
				}
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Put on sale</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Price</InputTitle>
					<InputContainer
						type="number"
						value={price}
						onChange={handleInput}
						placeholder={`Enter Price (in Reef)`}
					/>
					<InputTitle>Number of Copies <span>(max {collectibleInfo.amount})</span></InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of copies for sale`}
					/>
				</InputWrapper>
				<InfoSection link="/blog/sale" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const LendModal = (props) => {
	const history = useHistory();
	const [amount, setAmount] = useState("")
	const [paybackFee, setPaybackFee] = useState("")
	const [copies, setCopies] = useState("")
	const [duration, setDuration] = useState("")
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	const handleCopiesInput = (e) => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || '');
	}

	const handleMinutesInput = (e) => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? '' : amount);
	}

	const handleClick = async () => {
		if (!isLoading && Number(amount) >= 1 && Number(copies) >= 1 && Number(paybackFee) >= 0 && Number(duration) > 0) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemLoan(collectibleInfo.itemId, amount, paybackFee, Number(copies), Number(duration));
			if (receipt) {
				const newPositionId = receipt.events[1].args['positionId'].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false)
					setButtonText(initialButtonText);
					setAmount("");
					setCopies("");
					setPaybackFee("");
					setDuration("");
					props.setIsActive(false);
					bread(
						<div>
							Loan proposal created! Check it out <ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>here</ToastLink>!
						</div>
					)
				}
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Create Loan Proposal</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Loan Amount</InputTitle>
					<InputContainer
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder={`Amount to borrow (in Reef)`}
					/>
					<InputTitle>Payback Fee</InputTitle>
					<InputContainer
						type="number"
						value={paybackFee}
						onChange={(e) => setPaybackFee(e.target.value)}
						placeholder={`Amount to pay the lender as interest (in Reef)`}
					/>
					<InputTitle>Number of Copies</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={handleCopiesInput}
						placeholder={`Number of copies for the lot`}
					/>
					<InputTitle>Duration</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the loan in minutes`}
					/>
					<span>{duration ? intervalToFormattedDuration(minutesToMilliseconds(Number(duration))) : '(Duration will appear here once you start typing)'}</span>
				</InputWrapper>
				<InfoSection link="/blog/loan" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const RaffleModal = (props) => {
	const history = useHistory();
	const [copies, setCopies] = useState("")
	const [duration, setDuration] = useState("")
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	const handleMinutesInput = (e) => {
		let amount = Math.min(Number(e.target.value), 525600);
		setDuration(amount < 1 ? '' : amount);
	}

	const handleClick = async () => {
		if (!isLoading && Number(copies) >= 1 && Number(duration) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createItemRaffle(collectibleInfo.itemId, Number(copies), Number(duration));
			if (receipt) {
				const newPositionId = receipt.events[1].args['positionId'].toNumber();
				const shortUrl = `/collectible/${newPositionId}`;
				if (Number(copies) === collectibleInfo.amount) {
					history.push(shortUrl);
					window.location.reload();
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false)
					setButtonText(initialButtonText);
					setDuration("");
					setCopies("");
					props.setIsActive(false);
					bread(
						<div>
							Raffle created! Check it out <ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>here</ToastLink>!
						</div>
					)
				}
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Create Raffle</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Number of Copies</InputTitle>
					<InputContainer
						type="number"
						value={copies}
						onChange={(e) => setCopies(e.target.value)}
						placeholder={`Number of copies for the lot`}
					/>
					<InputTitle>Duration</InputTitle>
					<InputContainer
						type="number"
						value={duration}
						onChange={handleMinutesInput}
						placeholder={`Duration of the raffle in minutes`}
					/>
					<span>{duration ? intervalToFormattedDuration(minutesToMilliseconds(Number(duration))) : '(Duration will appear here once you start typing)'}</span>
				</InputWrapper>
				<InfoSection link="/blog/raffle" fee={props.fee} />
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const EnterRaffleModal = (props) => {
	const [amount, setAmount] = useState("")
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	// eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);
	const handleClick = async () => {
		if (!isLoading && Number(amount) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await enterRaffle(collectibleInfo.positionId, amount);
			if (receipt) {
				setIsLoading(false)
				setButtonText(initialButtonText);
				setAmount("");
				props.setIsActive(false);
				bread(`You've added ${amount} Reef to the raffle!`);
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		} else {
			setIsLoading(false)
			setButtonText(initialButtonText);
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Enter Raffle</Title>
			<Group>
				<div>
					Any amount you send will be added to your total
				</div> <br/>
				<InputTitle>Amount</InputTitle>
				<InputContainer
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder={`Amount to be sent (in Reef)`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const BidsModal = (props) => {
	const [amount, setAmount] = useState("")
	const initialButtonText = "Submit";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	// const [minToBid, setMinToBid] = useState(0);
	const { auth } = useContext(AuthContext);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);
	const minToBid = Math.max(collectibleInfo.auction.minBid / 10 ** 18, collectibleInfo.auction.highestBid / 10 ** 18);
	const currentBid = collectibleInfo.auction.myBid || 0;
	const handleAmountInput = (e) => {
		setAmount(e.target.value);
	}

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
							address: auth?.evmAddress
						}
					}
				});
				setIsLoading(false)
				setButtonText(initialButtonText);
				setAmount("");
				props.setIsActive(false);
				bread(`You bid ${amount} Reef!`);
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		} else {
			setIsLoading(false)
			setButtonText(initialButtonText);
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Bid or increase your bid</Title>
			<Group>
				<div>
					If you've already bid, your new bid will be added to your total,<br /> and the total must be more than the highest bid.
				</div> <br />
				<InputTitle>Amount (total more than {minToBid})</InputTitle>
				<InputContainer
					type="number"
					value={amount}
					onChange={handleAmountInput}
					placeholder={`Amount to bid (in Reef)`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export const BuyModal = (props) => {
	const history = useHistory();
	const [copies, setCopies] = useState("")
	const initialButtonText = "Buy";
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState(initialButtonText);
	//eslint-disable-next-line
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext);

	const handleCopiesInput = (e) => {
		const amount = Math.min(Number(e.target.value), collectibleInfo.amount);
		setCopies(amount || '');
		if (amount) {
			setButtonText(`Buy for ${amount * (collectibleInfo.sale.price / (10 ** 18))} Reef`);
		} else {
			setButtonText(initialButtonText);
		}
	}

	const handleClick = async () => {
		if (!isLoading && Number(copies) >= 1) {
			setIsLoading(true);
			setButtonText(<Loading />);
			const receipt = await createSale(collectibleInfo.positionId, Number(copies), Number(collectibleInfo.sale.price) / 10 ** 18);
			if (receipt) {
				if (Number(copies) === collectibleInfo.amount) {
					history.push(`/profile`);
				} else {
					setCollectibleInfo({
						...collectibleInfo,
						amount: collectibleInfo.amount - Number(copies),
					});
					setIsLoading(false)
					setButtonText(initialButtonText);
					setCopies("");
					props.setIsActive(false);
					const shortUrl = `/profile`;
					bread(
						<div>
							Item{copies.length > 1 ? 's' : ''} bought! Check {copies.length > 1 ? 'them' : 'it'} out <ToastLink
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
							>on your profile</ToastLink>!
						</div>
					)
				}
			} else {
				setIsLoading(false)
				setButtonText(initialButtonText);
			}
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Buy</Title>
			<Group>
				<InputTitle>Number of copies <span>(max {collectibleInfo.amount})</span></InputTitle>
				<InputContainer
					type="number"
					value={copies}
					onChange={handleCopiesInput}
					placeholder={`Number of copies to buy`}
				/>
				<AnimBtn disabled={isLoading} onClick={handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}