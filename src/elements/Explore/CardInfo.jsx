import ReefIcon from "@static/svg/ReefIcon";
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
	align-items:center;
	justify-content: space-between;
`

const MiddleContainer = styled.div`

`

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Title = styled.h1`
	font-weight: 900;
`

const HighestBidText = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary);
	font-size: 0.875rem;
	display: flex;
	align-items:center;
	svg{
		margin-left: 0.2rem;
	}
`

const Quantity = styled.h3`
	font-size: 1rem;
	color: var(--app-container-text-primary);
`

const Price = styled.p`
	font-weight: 900;
	font-size: 1.25rem;
	svg{
		display: inline-block;
		vertical-align: sub;
	}
`

const CardInfo = ({ data }) => {
	return (
		<Wrapper>
			<TopContainer>
				<Title>{data.name}</Title>
				<CardHeaderIcons data={data}/>
			</TopContainer>
			<MiddleContainer>
				<HighestBidText>Highest Bid: <ReefIcon size={`1.25rem`} centered /> {data.highestBid}</HighestBidText>
			</MiddleContainer>
			<BottomContainer>
				<Quantity>{data.quantity.available} of {data.quantity.total}</Quantity>
				<Price><ReefIcon size={`1.5rem`} />{data.price}</Price>
			</BottomContainer>
		</Wrapper>
	)
}

export default CardInfo
