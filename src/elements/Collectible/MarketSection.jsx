import CollectibleContext from '@contexts/Collectible/CollectibleContext';
import { BtnBaseAnimated } from '@elements/Default/BtnBase';
import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { domAnimation, LazyMotion } from "framer-motion";
import ReefIcon from '@static/svg/ReefIcon';
import { numberSeparator } from '@utils/numberSeparator';
import { format, formatDistance, formatRelative } from "date-fns";
import { TooltipCustom } from '@elements/Default/Tooltip';
import { capitalize } from '@utils/textUtils';
import { respondTo } from "@styles/styledMediaQuery";

/*
	config chart for each state: https://res.cloudinary.com/etjfo/image/upload/v1643831153/sqwid/diagram-numbered_suzlf0.png
*/

const Btn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	min-width: 6rem;
	z-index:2;
`
const parentMargin = css`
	${props => !props.parent ? `margin-top: auto` : ``}
`

const BottomContainer = styled.div`
	height: ${props => !props.parent ? `auto` : `100%`};
	${parentMargin};
	margin-top:auto;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	gap: 1rem;
	${respondTo.md`
		padding-top: 1rem;
	`}
`

const RightContainer = styled.div`
	margin-right: auto;
`

const Heading = styled.h3`
	font-weight: 900;
    color: var(--app-container-text-primary-hover);
    font-size: 1rem;
	margin-bottom: 0.375rem;
`

const Price = styled.p`
	font-weight: 900;
	font-size: 1.5rem;
	display: flex;
	align-items:flex-end;
	label{
		vertical-align:middle;
		max-width: 20rem;
		overflow: hidden;
		text-overflow:ellipsis;
		word-wrap: nowrap;
	}
	span{
		vertical-align:middle;
		font-weight: 500;
		padding-left: 0.5rem;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const TimeText = styled.span`
	margin-right: 0.5rem;
	font-size: 1.125rem;
`

const BidsInfoSection = styled.div`
	display: flex;
	margin-top: 1.25rem;
	align-items:center;
	justify-content:space-between;
`


const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		whileHover={{
			y: -5,
			x: 0,
			scale: 1.02
		}}
		{...props}
	>{children}</Btn>
)


const CurrentPrice = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const [usdPrice, setUsdPrice] = useState(collectibleInfo.priceInUSD.toFixed(2));
	useEffect(() => {
		setUsdPrice(collectibleInfo.priceInUSD.toFixed(2));
		//eslint-disable-next-line
	}, [collectibleInfo.price])
	return (
		<Price>
			<ReefIcon /><p><label title={numberSeparator(collectibleInfo.price)}>{numberSeparator(collectibleInfo.price)}</label>
				<span>(${usdPrice})</span></p>
		</Price>
	)
}

const Deadline = () => {
	const deadline = 1643836298054
	return (
		<>
			<Heading>Deadline</Heading>
			<p>
				<TooltipCustom base={<TimeText>{formatDistance(new Date(deadline), new Date(), { addSuffix: true })}</TimeText>}>
					{capitalize(formatRelative(new Date(deadline), new Date()))}<br />
					({format(new Date(deadline), "EEEE, LLLL d, uuuu h:mm a")})
				</TooltipCustom>
			</p>
		</>
	)
}

const MinimumBid = () => {
	const minBid = 100
	return (
		<div>
			<Heading>Minimum Bid</Heading>
			<p>{minBid}</p>
		</div>
	)
}

const HighestBid = () => {
	const highestBid = 1643836298054
	return (
		<>
			{highestBid !== 0 && (
				<div>
					<Heading>Highest Bid</Heading>
					<p>{highestBid}</p>
				</div>
			)}
		</>
	)
}

const Config1 = () => {
	// state-0 / not owned

	return (
		<></>
	)
}

const Config2 = () => {
	// state-0 / owned

	return (
		<BottomContainer>
			<AnimBtn>
				Put On Sale
			</AnimBtn>
			<AnimBtn>
				Lend
			</AnimBtn>
			<AnimBtn>
				Create Auction
			</AnimBtn>
			<AnimBtn>
				Create Raffle
			</AnimBtn>
		</BottomContainer>
	)
}

const Config3 = () => {
	// state-0 / not owned
	return (
		<BottomContainer>
			<RightContainer>
				<CurrentPrice />
			</RightContainer>
			<AnimBtn>
				Create Raffle
			</AnimBtn>
		</BottomContainer>
	)
}

const Config4 = () => {
	// state-1 / owned

	return (
		<BottomContainer>
			<RightContainer>
				<CurrentPrice />
			</RightContainer>
			<AnimBtn>
				Unlist
			</AnimBtn>
		</BottomContainer>
	)
}

const Config5 = () => {
	// state-2 / not owned / active / not highest bidder

	return (
		<BottomWrapper>
			<Deadline />
			<BidsInfoSection>
				<MinimumBid />
				<HighestBid />
			</BidsInfoSection>
			<BottomContainer parent={false}>
				<AnimBtn>
					Bid
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config6 = () => {
	// state-2 / not owned / active / highest bidder

	return (
		<BottomWrapper>
			<Deadline />
			<BidsInfoSection>
				<MinimumBid />
				<HighestBid />
			</BidsInfoSection>
			<BottomContainer parent={false}>
				<AnimBtn>
					Increase Bid
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config7 = () => {
	// state-2 / not owned / deadline over

	return (
		<BottomWrapper>
			<Deadline />
			<BidsInfoSection>
				<MinimumBid />
				<HighestBid />
			</BidsInfoSection>
			<BottomContainer parent={false}>
				<AnimBtn>
					Finalize Auction
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config8 = () => {
	// state-2 / owned / active

	return (
		<BottomWrapper>
			<Deadline />
			<BidsInfoSection>
				<MinimumBid />
				<HighestBid />
			</BidsInfoSection>
		</BottomWrapper>
	)
}

const Config9 = () => {
	// state-2 / owned / deadline over

	return (
		<BottomWrapper>
			<Deadline />
			<BidsInfoSection>
				<MinimumBid />
				<HighestBid />
			</BidsInfoSection>
			<BottomContainer parent={false}>
				<AnimBtn>
					Finalize Auction
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config10 = () => {
	// state-3 / not owned / active

	return (
		<BottomWrapper>
			<Deadline />
			<BottomContainer parent={false}>
				<AnimBtn>
					Enter Raffle
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config11 = () => {
	// state-3 / not owned / deadline over

	return (
		<BottomWrapper>
			<Deadline />
			<BottomContainer parent={false}>
				<AnimBtn>
					Finalize Raffle
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config12 = () => {
	// state-3 / owned / active
	return (
		<BottomWrapper>
			<Deadline />
		</BottomWrapper>
	)
}

const Config13 = () => {
	// state-3 / owned / deadline over

	return (
		<BottomWrapper>
			<Deadline />
			<BottomContainer parent={false}>
				<AnimBtn>
					Finalize Raffle
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config14 = () => {

	return (
		<div>state-4 / not owned / not funded</div>
	)
}

const Config15 = () => {
	// state-4 / not funder / not owned / funded

	return (
		<></>
	)
}

const Config16 = () => {

	return (
		<div>state-4 / funder / funded</div>
	)
}

const Config17 = () => {

	return (
		<div>state-4 / funder / funded / deadline over</div>
	)
}

const Config18 = () => {

	return (
		<div>state-4 / owned / not funded</div>
	)
}

const Config19 = () => {

	return (
		<div>state-4 / owned / funded</div>
	)
}

const Config20 = () => {

	return (
		<div>state-4 / owned / funded / deadline over</div>
	)
}

const getComponent = (market) => {
	const showConfig = (id) => {
		let configMap = [
			<Config1 />,
			<Config2 />,
			<Config3 />,
			<Config4 />,
			<Config5 />,
			<Config6 />,
			<Config7 />,
			<Config8 />,
			<Config9 />,
			<Config10 />,
			<Config11 />,
			<Config12 />,
			<Config13 />,
			<Config14 />,
			<Config15 />,
			<Config16 />,
			<Config17 />,
			<Config18 />,
			<Config19 />,
			<Config20 />,
		]
		return configMap[id - 1]
	}
	if (market) {
		switch (market.state) {
			case 0:
				if (!market.owned) return showConfig(1);
				else return showConfig(2);

			case 1:
				if (!market.owned) return showConfig(3);
				else return showConfig(4);

			case 2:
				if (!market.owned) {
					if (market.active) {
						if (!market.highestBidder) return showConfig(5);
						else if (market.highestBidder) return showConfig(6);
					}
					else return showConfig(7);
				} else {
					if (market.active) return showConfig(8);
					else return showConfig(9);
				}
				break;

			case 3:
				if (!market.owned) {
					if (market.active) return showConfig(10);
					else return showConfig(11);
				} else {
					if (market.active) return showConfig(12);
					else return showConfig(13);
				}

			case 4:
				if (!market.owned) {
					if (!market.funded) return showConfig(14);
					else {
						if (!market.funder) return showConfig(15);
						else {
							if (market.active) return showConfig(16);
							else return showConfig(17);
						}
					}
				} else {
					if (!market.funded) return showConfig(18);
					else {
						if (market.active) return showConfig(19);
						else return showConfig(20);
					}
				}
			default:
				break;
		}
	}
	else {

	}
}

const MarketSection = () => {
	const { collectibleInfo, setCollectibleInfo } = useContext(CollectibleContext)
	const { market } = collectibleInfo
	useEffect(() => {
		/*
			for debugging purpose
			should come from backend in the future
			REMEMBER TO PASS ACTIVE USER AS A UHHH DEPENDENCY FOR THE USEEFFECT OTHERWISE IT WILL NOT
			REFRESH THE CONFIG ONCE THE USE LOGS OUT
		*/
		let updatedInfo = {
			...collectibleInfo,
			market: {
				state: 2,
				owned: false,
				active: true, // only for auctions, raffles, loans (dictated by deadline)
				highestBidder: true, // only for auctions
				funded: true, // only for loans
				funder: true, // only for loans
			}
		}
		setCollectibleInfo(updatedInfo)
		//eslint-disable-next-line
	}, []);
	return (
		<LazyMotion features={domAnimation}>
			{getComponent(market)}
		</LazyMotion>
	);
};

export default MarketSection;
