import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import AuthContext from "@contexts/Auth/AuthContext";
import { domAnimation, LazyMotion, m } from "framer-motion";
import ReefIcon from "@static/svg/ReefIcon";

const Container = styled.div`
	display: flex;
	align-items:center;
	justify-content: space-between;
	width: 100%;
`

const Btn = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	background: var(--app-theme-primary);
	color: var(--app-background);
	outline: none;
	border: none;
	height: 2.5rem;
	cursor: pointer;
	z-index:2;
	user-select:none;
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
	font-size: 2rem;
	display: flex;
	align-items:flex-end;
	gap: 0.25rem;

`

const CurrentPrice = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Price>
			<ReefIcon/>{collectibleInfo.price}
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

const Transfer = () => {
	return (
		<AnimBtn>
			Transfer
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

const Sale = () => {
	const { auth } = useContext(AuthContext)
	const { collectibleInfo } = useContext(CollectibleContext)
	const isOwner =  auth?collectibleInfo.owners.some((item)=>item.id === auth.address):null
	return (
		<>
			<CurrentPrice/>
			{isOwner?(
				<StopSale/>
			):(
				<div>
					<BuyNow/>
					<Transfer/>
				</div>
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
			<CurrentPrice/>
			{isOwner?(
				<StopSale/>
			):(
				<BuyNow/>
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
		<Container>
			<LazyMotion features={domAnimation}>
				{collectibleInfo.isOnSale?(<Sale/>):(<NoSale/>)}
			</LazyMotion>
		</Container>
	)
}

export default TransactionSection
