import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";
import GroupIcon from "@static/svg/GroupIcon";
import { TooltipHeader } from "@elements/Default/Tooltip";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0.75rem 1.25rem;
`;

const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h2`
	font-weight: 900;
	font-size: 1.5rem;
	max-width: 9rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const TotalAddresses = styled.div`
	position: relative;
	font-weight: 900;
	font-size: 1.125rem;
	color: var(--app-container-text-primary-hover);
	cursor: pointer;
	max-width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
	gap: 0.25rem;
	span {
		line-height: 25%;
	}
`;

const Amount = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary);
	margin-left: auto;
`;

const Accumulated = styled.p``;

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
