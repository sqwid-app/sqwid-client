import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
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
`

const CardInfo = ({ data }) => {
	const price = (data.sale && data.sale.price !== '0') && numberSeparator(formatReefPrice(data.sale.price).toString())
	return (
		<Wrapper>
			<TopContainer>
				<Title><label title={data.meta.name}>{data.meta.name}</label></Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			<BottomContainer>
				{price ? <Price title={`Price: ${price} REEF`}><ReefIcon size={`1.5rem`} /><span>{price}</span></Price> : null}
				<Amount>x{data.amount}</Amount>
			</BottomContainer>
		</Wrapper>
	)
}

export default CardInfo
