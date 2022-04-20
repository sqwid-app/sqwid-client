import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";

import {
	Wrapper,
	TopContainer,
	Title,
	BottomContainer,
	Amount,
	Price,
} from "@elements/Explore/Cards/Default/StyledComponents";

const CardInfo = ({ data }) => {
	const minBid =
		data.auction &&
		data.auction.minBid !== 0 &&
		numberSeparator(formatReefPrice(data.auction.minBid).toString());
	const highestBid =
		data.auction &&
		numberSeparator(formatReefPrice(data.auction.highestBid).toString());
	return (
		<Wrapper>
			<TopContainer>
				<Title>
					<label title={data.meta.name}>{data.meta.name}</label>
				</Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			<BottomContainer>
				{minBid && highestBid && data.auction?.highestBid === 0 ? (
					<Price title={`Minimum Bid: ${minBid} REEF`}>
						<ReefIcon size={`1.5rem`} />
						<span>{minBid}</span>
					</Price>
				) : (
					<Price title={`Highest Bid: ${highestBid} REEF`}>
						<ReefIcon size={`1.5rem`} />
						<span>{highestBid}</span>
					</Price>
				)}
				<Amount title={`Amount: ${data.amount}`}>x{data.amount}</Amount>
			</BottomContainer>
		</Wrapper>
	);
};

export default CardInfo;
