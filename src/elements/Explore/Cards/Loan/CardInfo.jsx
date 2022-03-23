import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";

import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";
import { formatDistance } from "date-fns";

import { getAvatarFromId } from "@utils/getAvatarFromId";
import {
	Wrapper,
	TopContainer,
	Title,
	BottomContainer,
	LenderContainer,
	Logo,
	NotStyledLink,
	LenderName,
	Amount,
	BottomWrapper,
	TimeSpan,
	Price,
	Fee,
} from "@elements/Explore/Cards/Default/StyledComponents";

const getDistance = intervalInMinutes =>
	formatDistance(Date.now(), Date.now() + intervalInMinutes * 60 * 1000);

const CardInfo = ({ data, lenderExists }) => {
	const price =
		data.loan &&
		data.loan.loanAmount !== "0" &&
		numberSeparator(formatReefPrice(data.loan.loanAmount).toString());
	const fee =
		data.loan &&
		data.loan.feeAmount !== "0" &&
		numberSeparator(formatReefPrice(data.loan.feeAmount).toString());
	const timeSpan = data.loan?.numMinutes && getDistance(data.loan.numMinutes);
	const lender = data.loan?.lender;
	return (
		<Wrapper>
			<TopContainer>
				<Title>
					<label title={data.meta.name}>{data.meta.name}</label>
				</Title>
				<CardHeaderIcons data={data} />
			</TopContainer>
			{lenderExists ? (
				<BottomContainer>
					<LenderContainer>
						<Logo url={getAvatarFromId(lender.address)} />
						<NotStyledLink to={`/profile/${lender.address}`}>
							<LenderName title={lender.name}>
								{lender.name}
							</LenderName>
						</NotStyledLink>
					</LenderContainer>
					<Amount title={`Amount: ${data.amount}`}>
						x{data.amount}
					</Amount>
				</BottomContainer>
			) : (
				<BottomWrapper>
					<BottomContainer>
						{fee ? (
							<Fee title={`Interest Amount: ${fee} REEF`}>
								Returns: <ReefIcon size={`1.125rem`} />
								<span>{fee}</span>
							</Fee>
						) : null}
						<TimeSpan title={`Time Span: ${timeSpan}`}>
							{timeSpan}
						</TimeSpan>
					</BottomContainer>
					<BottomContainer>
						{price ? (
							<Price title={`Loan Amount: ${price} REEF`}>
								<ReefIcon size={`1.5rem`} />
								<span>{price}</span>
							</Price>
						) : null}
						<Amount title={`Amount: ${data.amount}`}>
							x{data.amount}
						</Amount>
					</BottomContainer>
				</BottomWrapper>
			)}
		</Wrapper>
	);
};

export default CardInfo;
