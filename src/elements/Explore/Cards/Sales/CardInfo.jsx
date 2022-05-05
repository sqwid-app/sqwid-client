import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React, { useEffect, useState } from "react";
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
	const [price, setPrice] = useState("");
	useEffect(() => {
		data.sale &&
			data.sale.price !== "0" &&
			setPrice(
				numberSeparator(formatReefPrice(data.sale.price).toString())
			);
	}, [data]);

	return (
		<Wrapper>
			<TopContainer>
				<Title>
					<label title={data.meta.name}>{data.meta.name}</label>
				</Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			<BottomContainer>
				{price ? (
					<Price title={`Price: ${price} REEF`}>
						<ReefIcon size={`1.5rem`} />
						<span>{price}</span>
					</Price>
				) : null}
				<Amount>x{data.amount}</Amount>
			</BottomContainer>
		</Wrapper>
	);
};

export default CardInfo;
