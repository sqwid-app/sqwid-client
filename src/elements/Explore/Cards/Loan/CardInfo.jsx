import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import React from "react";
import styled from "styled-components";
import CardHeaderIcons from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { formatReefPrice } from "@utils/formatReefPrice";
import { formatDistance } from "date-fns";
import { respondTo } from "@styles/styledMediaQuery";
import { Link } from "react-router-dom";
import { getAvatarFromId } from "@utils/getAvatarFromId";

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

const Price = styled.label`
	font-weight: 900;
	font-size: 1.25rem;
	cursor: pointer;
	max-width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	svg {
		display: inline-block;
		vertical-align: sub;
	}
	span {
		max-width: 10rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const Amount = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary);
	margin-left: auto;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

const Fee = styled(Price)`
	font-size: 1rem;
	color: var(--app-container-text-primary);
`;

const TimeSpan = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
`;

const getDistance = intervalInMinutes =>
	formatDistance(Date.now(), Date.now() + intervalInMinutes * 60 * 1000);

const Logo = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url("${props => props.url && props.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const LenderContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	p {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	h6 {
		color: inherit;
		font-weight: 800;
		font-size: 0.75rem;
	}
	span {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`;

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1rem;
	max-width: 20rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

const LenderName = styled.div`
	max-width: 8rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	font-style: normal;
	${respondTo.md`
		max-width: 5rem;
	`}
`;

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
