import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";
import GroupIcon from "@static/svg/GroupIcon";
import { TooltipHeader } from "@elements/Default/Tooltip";

import {
	Wrapper,
	TopContainer,
	Title,
	BottomContainer,
	Amount,
	TotalAddresses,
	Accumulated,
} from "@elements/Explore/Cards/Default/StyledComponents";

const CardInfo = ({ data }) => {
	const totalAddresses = data.raffle?.totalAddresses;
	return (
		<Wrapper>
			<TopContainer>
				<Title>
					<label title={data.meta.name}>{data.meta.name}</label>
				</Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			<BottomContainer>
				<TooltipHeader
					base={
						<TotalAddresses>
							<GroupIcon />
							<span>{totalAddresses}</span>
						</TotalAddresses>
					}
				>
					<p>{totalAddresses} Entries</p>
					<Accumulated>
						<ReefIcon size={`1.25rem`} />
						<span>
							{numberSeparator(
								formatReefPrice(data.raffle?.totalValue)
							)}{" "}
							Accumulated
						</span>
					</Accumulated>
				</TooltipHeader>
				<Amount title={`Amount: ${data.amount}`}>x{data.amount}</Amount>
			</BottomContainer>
		</Wrapper>
	);
};

export default CardInfo;
