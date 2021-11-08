import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { LazyMotion, domAnimation } from "framer-motion"
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import ReefIcon from "@static/svg/ReefIcon";
import Loading from "@elements/Default/Loading";

import { addBid, buyNow, putOnSale } from "@utils/marketplace";

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
	${props=>!props.remove?modalEntryAnim:modalExitAnim}
`

const Title = styled.h1`
	font-size: 1.5rem;
    margin-bottom: 1rem;
`

const InputTitle = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
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
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
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
`

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		whileHover={{
			y: -5,
			x: 0,
			scale:1.02
		}}
		{...props}
	>{children}</Btn>
)



const elemContains =  (rect, x, y) => {
	return rect.x <= x && x <= rect.x + rect.width && rect.y <= y && y <= rect.y + rect.height;
}

const ModalContainer = ({ isActive, setIsActive, ...props }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive)
	const modalRef = useRef()
	//eslint-disable-next-line
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
						{props.children}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	)
}

const BidsModal = (props) => {
	const [value, setValue] = useState({
		price:"",
		amount:""
	})
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState ("Submit");

	const handlePriceInput = (e) => {
		if (Number (e.target.value) >= 0) {
			setValue({
				...value,
				price:e.target.value,
			});
			setButtonText (<>Pay <ReefIcon centered size={24}/> {Number (e.target.value) * Number (value.amount)}</>);
		}
	}

	const handleAmountInput = (e) => {
		if (Number (e.target.value) <= Number (props.itemInfo.maxAmount)) {
			setValue({
				...value,
				amount:e.target.value,
			});
			setButtonText (<>Pay <ReefIcon centered size={24}/> {Number (e.target.value) * Number (value.price)}</>);
		}
	}

	const handleClick = () => {
		setIsLoading (true);
		setButtonText (<Loading/>);
		addBid (props.itemInfo.itemId, value.price, value.amount).then (() => {
			setIsLoading (false);
			setButtonText ("Submit");
			props.setIsActive (false)
		}).catch (err => {
			//
		});
	}
	return (
		<ModalContainer {...props}>
			<Title>Bid</Title>
			<Group>
				<InputWrapper>
					<InputTitle>Price</InputTitle>
					<InputContainer
						type="number"
						value={value.price}
						onChange = {handlePriceInput}
						placeholder={`Enter Price (in Reef)`}
					/>
					<InputTitle>Amount (max {props.itemInfo.maxAmount})</InputTitle>
					<InputContainer
						type="number"
						value={value.amount}
						onChange = {handleAmountInput}
						placeholder={`Enter Amount (# of copies)`}
					/>
				</InputWrapper>
				<AnimBtn disabled = {isLoading} onClick = {handleClick} >{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

const PutOnSaleModal = (props) => {
	const [price, setPrice] = useState("")
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState ("Submit");
	const handleInput = (e) => {
		setPrice(e.target.value)
	}
	const handleClick = () => {
		setIsLoading (true);
		setButtonText (<Loading/>);
		putOnSale (props.itemId, price).then (res => {
			setIsLoading (false);
			setButtonText ("Submit");
			props.setIsActive (false)
		}).catch (err => {
			// console.log (err)
		});
	}
	return (
		<ModalContainer {...props}>
			<Title>Put on sale</Title>
			<Group>
				<InputTitle>Price</InputTitle>
				<InputContainer
					type="number"
					value={price}
					onChange = {handleInput}
					placeholder={`Enter Price (in Reef)`}
				/>
				<AnimBtn disabled={isLoading} onClick = {handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

const BuyModal = (props) => {
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState ("Enter an amount");
	const handleInput = (e) => {
		if (Number (e.target.value) <= Number (props.itemInfo.maxAmount)) {
			setAmount(e.target.value);
			if (Number (e.target.value) > 0) {
				setButtonText (<>Pay <ReefIcon centered size={24}/> {Number (e.target.value) * props.itemInfo.price}</>);
			} else {
				setButtonText ("Enter an amount");
			}
		}
	}
	const handleClick = () => {
		if (!isLoading) {
			setIsLoading (true)
			setButtonText (<Loading/>);
			buyNow (props.itemInfo.itemId, amount, props.itemInfo.price).then (res => {
				setButtonText ("Enter an amount");
				setIsLoading(false)
				setAmount("");
				props.setIsActive (false)
			}).catch (err => {
				// console.log (err)
			});
		}
	}
	return (
		<ModalContainer {...props}>
			<Title>Buy</Title>
			<Group>
				<InputTitle>Amount (max { props.itemInfo.maxAmount })</InputTitle>
				<InputContainer
					type="number"
					value={amount}
					onChange = {handleInput}
					placeholder={`Enter Amount (number of copies you wish to buy)`}
				/>
				<AnimBtn disabled={isLoading} onClick = {handleClick}>{buttonText}</AnimBtn>
			</Group>
		</ModalContainer>
	)
}

export { BidsModal, PutOnSaleModal, BuyModal }
