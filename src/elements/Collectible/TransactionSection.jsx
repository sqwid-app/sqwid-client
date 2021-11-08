import React, { useContext, useState } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import AuthContext from "@contexts/Auth/AuthContext";
import { domAnimation, LazyMotion } from "framer-motion";
import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { BidsModal, PutOnSaleModal, BuyModal } from "./Modals";

import { removeFromSale } from "@utils/marketplace";
import Loading from "@elements/Default/Loading";

const Container = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	width: 100%;
	margin-top:auto;
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
	min-width: 6rem;
	z-index:2;
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

const Price = styled.p`
	font-weight: 900;
	font-size: 1.5rem;
	display: flex;
	align-items:flex-end;
	label{
		vertical-align:middle;
		max-width: 20rem;
		overflow: hidden;
		text-overflow:ellipsis;
		word-wrap: nowrap;
	}
	span{
		vertical-align:middle;
		font-weight: 500;
		padding-left: 0.5rem;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`

const HighestBidSection = styled.p`
	font-weight: 500;
	font-size: 1.125rem;
	display: flex;
	align-items:center;
	color: var(--app-container-text-primary-hover);
	label {
		display: flex;
		align-items:center;
		justify-content: center;
		padding-left: 0.375rem;
		font-weight: 900;
		color: white;
		max-width: 10rem;
		overflow: hidden;
		text-overflow:ellipsis;
		word-wrap: nowrap;
	}
`

const PriceInfoContainer = styled.div``

const BtnContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content:center;
	gap: 0.5rem;
`

const CurrentPrice = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Price>
			<ReefIcon/><p><label title={numberSeparator(collectibleInfo.price)}>{numberSeparator(collectibleInfo.price)}</label>
			<span>(${collectibleInfo.priceInUSD.toFixed(2)})</span></p>
		</Price>
	)
}



const HighestBid = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<HighestBidSection>
			{collectibleInfo.highestBid!=="0"&&(
				<>
					Highest Bid: <label title={numberSeparator(collectibleInfo.highestBid)}><ReefIcon centered size={24}/> {numberSeparator(collectibleInfo.highestBid)}</label>
				</>
			)}
		</HighestBidSection>
	)
}

const Bid = () => {
	const [showModal, setShowModal] = useState(false)
	const { collectibleInfo } = useContext (CollectibleContext)
	return (
		<>
		<AnimBtn onClick={()=>setShowModal(!showModal)}>
			Bid
		</AnimBtn>
		<BidsModal itemInfo = {{
				itemId: collectibleInfo.itemId,
				price: collectibleInfo.price,
				maxAmount: collectibleInfo.owners.current.quantity.owns
			}} itemId = { collectibleInfo.itemId } isActive={showModal} setIsActive={setShowModal}/>
		</>
	)
}

const StopSale = () => {
	const { collectibleInfo, setCollectibleInfo } = useContext (CollectibleContext)
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState("Stop Sale");
	const handleClick = () => {
		// console.log("stop sale")
		setIsLoading(true);
		setButtonText(<Loading/>);
		removeFromSale (collectibleInfo.itemId).then (res => {
			// console.log (res);
			setCollectibleInfo ({
				...collectibleInfo,
				isOnSale: false
			})

		}).catch (err => {
			// console.log (err);
		});
	}
	return (
		<AnimBtn disabled = {isLoading} onClick = { handleClick }>
			{buttonText}
		</AnimBtn>
	)
}

const BuyNow = () => {
	const [showModal, setShowModal] = useState(false)
	const { collectibleInfo } = useContext (CollectibleContext)
	return (
		<>
			<AnimBtn onClick={()=>setShowModal(!showModal)}>
				Buy Now
			</AnimBtn>
			<BuyModal itemInfo = {{
				itemId: collectibleInfo.itemId,
				price: collectibleInfo.price,
				maxAmount: collectibleInfo.owners.current.quantity.owns
			}} isActive={showModal} setIsActive={setShowModal}/>
		</>
	)
}

const PutOnSale = () => {
	const [showModal, setShowModal] = useState(false)
	const { collectibleInfo } = useContext (CollectibleContext)
	return (
		<>
			<AnimBtn onClick={()=>setShowModal(!showModal)}>
				Put on Sale
			</AnimBtn>
			<PutOnSaleModal itemId = { collectibleInfo.itemId } isActive={showModal} setIsActive={setShowModal}/>
		</>
	)
}

const Sale = () => {
	//eslint-disable-next-line
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.current.id===auth.evmAddress:null
	// let isOwner = false;
	// const isOwner =  auth?collectibleInfo.owners.some((item)=>item.id === auth.address):null
	return (
		<>
			<PriceInfoContainer>
				<CurrentPrice/>
				<HighestBid/>
			</PriceInfoContainer>
			{auth&&(isOwner?(
				<StopSale/>
			):(
				<BtnContainer>
					<BuyNow/>
					<Bid/>
				</BtnContainer>
			))}
		</>
	)
}

const NoSale = () => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.current.id===auth.evmAddress:null
	return (
		<>
			<HighestBid/>
			{auth&&(isOwner?(
				<PutOnSale/>
			):(
				<Bid/>
			))}
		</>
	)
}

const TransactionSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext)

	/*
		if owner and on sale: show current price and STOP SALE btn
		if owner and not on sale: show put on sale
		if not owner and on sale: show current price, BUY NOW btn and TRANSFER
		if not owner and not on sale: show jack
	*/
	return (
		<LazyMotion features={domAnimation}>
			<Container>
				{collectibleInfo.isOnSale?(<Sale/>):(<NoSale/>)}
			</Container>
		</LazyMotion>
	)
}

export default TransactionSection
