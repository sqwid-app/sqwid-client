import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import AuthContext from "@contexts/Auth/AuthContext";
import { domAnimation, LazyMotion } from "framer-motion";
import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";

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
		max-width: 20rem;
		overflow: hidden;
		text-overflow:ellipsis;
		word-wrap: nowrap;
	}
`

const HighestBidSection = styled.p`
	font-weight: 500;
	font-size: 1.125rem;
	display: flex;
	color: var(--app-container-text-primary-hover);
	label {
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
			<ReefIcon/><label title={numberSeparator(collectibleInfo.price)}>{numberSeparator(collectibleInfo.price)}</label>
		</Price>
	)
}

const BuyNow = () => {
	return (
		<AnimBtn>
			Buy Now
		</AnimBtn>
	)
}

const HighestBid = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<HighestBidSection>
			Highest Bid: <label title={numberSeparator(collectibleInfo.highestBid)}>{numberSeparator(collectibleInfo.highestBid)}</label>
		</HighestBidSection>
	)
}

const Bid = () => {
	return (
		<AnimBtn>
			Bid
		</AnimBtn>
	)
}

const StopSale = () => {
	return (
		<AnimBtn>
			Stop Sale
		</AnimBtn>
	)
}

const PutOnSale = () => {
	return (
		<AnimBtn>
			Put on Sale
		</AnimBtn>
	)
}

const Sale = () => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.some((item)=>item.id === auth.address):null
	return (
		<>
			<PriceInfoContainer>
				<CurrentPrice/>
				<HighestBid/>
			</PriceInfoContainer>
			{isOwner?(
				<StopSale/>
			):(
				<BtnContainer>
					<BuyNow/>
					<Bid/>
				</BtnContainer>
			)}
		</>
	)
}

const NoSale = () => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.some((item)=>item.id === auth.address):null
	return (
		<>
			<HighestBid/>
			{isOwner?(
				<PutOnSale/>
			):(
				<Bid/>
			)}
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
