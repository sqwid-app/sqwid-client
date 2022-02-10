import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import CardHeaderIcons from "@elements/Explore/Cards/Sales/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";

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

const Amount = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary);
	margin-left:auto;
`

const CardInfo = ({ data }) => {
	const minBid = (data.auction && data.auction.minBid !== 0) && numberSeparator(formatReefPrice(data.auction.minBid).toString())
	const highestBid = (data.auction) && numberSeparator(formatReefPrice(data.auction.highestBid).toString())
	return (
		<Wrapper>
			<TopContainer>
				<Title><label title={data.meta.name}>{data.meta.name}</label></Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			<BottomContainer>
				{minBid && highestBid && data.auction?.highestBid === 0 ?
					<Price title={`Minimum Bid: ${minBid} REEF`}><ReefIcon size={`1.5rem`} /><span>{minBid}</span></Price> :
					<Price title={`Highest Bid: ${highestBid} REEF`}><ReefIcon size={`1.5rem`} /><span>{highestBid}</span></Price>}
				<Amount title={`Amount: ${data.amount}`}>x{data.amount}</Amount>
			</BottomContainer>
		</Wrapper>
	)
}

export default CardInfo
