import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import CardHeaderIcons from "./CardHeaderIcons";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0.75rem 1.25rem;

`

const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const MiddleContainer = styled.div`

`

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Title = styled.h2`
	font-weight: 900;
	font-size: 1.5rem;
	max-width: 9rem;
	overflow:hidden;
	white-space:nowrap;
	text-overflow: ellipsis;
`

const HighestBidText = styled.label`
	font-weight: 900;
	color: var(--app-container-text-primary);
	font-size: 0.875rem;
	display: flex;
	align-items:center;
	cursor: pointer;
	svg{
		margin-left: 0.2rem;
	}
	span{
		max-width: 10rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
	}
`

const Quantity = styled.h3`
	font-size: 1rem;
	color: var(--app-container-text-primary);
`

const Price = styled.label`
	font-weight: 900;
	font-size: 1.25rem;
	cursor: pointer;
	max-width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
	svg{
		display: inline-block;
		vertical-align: sub;
	}
	span{
		max-width: 10rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
	}
`

const CardInfo = ({ data }) => {
	return (
		<Wrapper>
			<TopContainer>
				<Title><label title={data.name}>{data.name}</label></Title>
				<CardHeaderIcons data={data}/>
			</TopContainer>
			{data.highestBid !== '0' ? <MiddleContainer>
				<HighestBidText title={numberSeparator(data.highestBid)}>Highest Bid: <ReefIcon size={`1.25rem`} centered /> <span>{numberSeparator(data.highestBid)}</span></HighestBidText>
			</MiddleContainer> : null }
			<BottomContainer>
				<Quantity>{data.quantity.available} of {data.quantity.total}</Quantity>
				{(data.isOnSale && data.price !== '0') ? <Price title={numberSeparator(data.price)}><ReefIcon size={`1.5rem`} /><span>{numberSeparator(data.price)}</span></Price> : null }
			</BottomContainer>
		</Wrapper>
	)
}

export default CardInfo
