import CollectibleContext from '@contexts/Collectible/CollectibleContext';
import { BtnBaseAnimated } from '@elements/Default/BtnBase';
import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { domAnimation, LazyMotion } from "framer-motion";
import ReefIcon from '@static/svg/ReefIcon';
import { numberSeparator } from '@utils/numberSeparator';
import { format, formatDistance, formatRelative, minutesToMilliseconds } from "date-fns";
import { TooltipCustom } from '@elements/Default/Tooltip';
import { capitalize } from '@utils/textUtils';
import { respondTo } from "@styles/styledMediaQuery";
import intervalToFormattedDuration from '@utils/intervalToFormattedDuration';
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { BidsModal, BuyModal, CreateAuctionModal, EnterRaffleModal, LendModal, PutOnSaleModal, RaffleModal } from './Modals';
import { Link } from 'react-router-dom';
import AuthContext from '@contexts/Auth/AuthContext';
import constants from "@utils/constants";
import { formatReefPrice } from '@utils/formatReefPrice';
import useStateInfo from '@utils/useStateInfo';

/*
	config chart for each state: https://res.cloudinary.com/etjfo/image/upload/v1643831153/sqwid/sections.png
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
	/* ${parentMargin}; */
	margin-top: 1.5rem;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-wrap: wrap;
	gap: 1rem;
	${respondTo.md`
		padding-top: 2rem;
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
	${props => props.align === "right" && css`
		text-align: right;
	`}
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

const PriceContainer = styled.p`
	font-weight: 900;
	font-size: 1.25rem;
	display: flex;
	align-items:flex-end;
	${props => props.align === "right" && css`
		justify-content: flex-end;
	`}
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
	gap: 0.75rem;
	.unavailable{
		color: var(--app-container-text-primary);
		font-weight: 900;
		font-size: 1rem;
	}
`

const TimeText = styled.span`
	margin-right: 0.5rem;
	font-size: 1.125rem;
`

const TopSection = styled.div`
	display: flex;
	align-items:center;
	justify-content:space-between;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	p{
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	h6{
		color: inherit;
		font-weight: 800;
		font-size: 0.75rem;
	}
	span{
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`

const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1.125rem;
	div{
		max-width: 20rem;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space:nowrap;
		font-style: normal;
		${respondTo.md`
			max-width: 5rem;
		`}
	}
`

const Logo = styled.div`
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url("${props => props.url && props.url}");
	background-size:cover;
	background-repeat:no-repeat;
	background-position: center;
`

const FunderSection = styled.div`
	margin-top: 1rem;
`

const Title = styled.h2`
	position: relative;
	font-size: 1.5rem;
	font-weight: 900;
	padding: 0.125rem 0.25rem;
	width: fit-content;
	&:after{
		content: "";
		bottom: 0;
		left: 0;
		position: absolute;
		height: 0.1rem;
		width:100%;
		background: var(--app-text);
		border-radius: 1000rem;
	}
`

const TitleContainer = styled.div`
	width: 100%;
	margin: 0.75rem 0;
	margin-bottom: 1rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
`

const SectionContainer = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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

const ConfigContainer = styled.div`
	flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const CurrentPrice = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const stateInfo = useStateInfo()
	const price = formatReefPrice(stateInfo.price || stateInfo.loanAmount)
	const [usdPrice, setUsdPrice] = useState((price * collectibleInfo.conversionRate).toFixed(2));
	useEffect(() => {
		setUsdPrice((price * collectibleInfo.conversionRate).toFixed(2));
		//eslint-disable-next-line
	}, [collectibleInfo.conversionRate])
	return (
		<Price>
			<ReefIcon />
			<p>
				<label title={numberSeparator(price.toString())}>{numberSeparator(price.toString())}</label>
				<span>(${usdPrice})</span>
			</p>
		</Price>
	)
}

const Deadline = () => {
	const stateInfo = useStateInfo()
	const deadline = stateInfo.deadline * 1000 //converting deadline from s to ms
	// const deadline = 1643836298054
	return (
		<SectionContainer>
			<Heading>Deadline</Heading>
			{stateInfo.deadline === 0 ? <p className="unavailable">Not set</p> : (
				<p>
					<TooltipCustom base={<TimeText>{formatDistance(new Date(deadline), new Date(), { addSuffix: true })}</TimeText>}>
						{capitalize(formatRelative(new Date(deadline), new Date()))}<br />
						({format(new Date(deadline), "EEEE, LLLL d, uuuu h:mm a")})
					</TooltipCustom>
				</p>
			)}
		</SectionContainer>
	)
}

const MinimumBid = () => {
	const stateInfo = useStateInfo()
	return (
		<SectionContainer>
			<Heading>Minimum Bid</Heading>
			<PriceContainer>
				<ReefIcon size={28} />
				<p>{numberSeparator(formatReefPrice(stateInfo.minBid))}</p>
			</PriceContainer>
		</SectionContainer>
	)
}

const HighestBid = () => {
	const stateInfo = useStateInfo()
	const highestBid = stateInfo.highestBid
	return (
		<>
			{highestBid !== 0 && (
				<SectionContainer>
					<Heading align="right">Highest Bid</Heading>
					<PriceContainer align="right">
						<ReefIcon size={28} />
						<p>{numberSeparator(formatReefPrice(highestBid))}</p>
					</PriceContainer>
				</SectionContainer>
			)}
		</>
	)
}

const TimePeriod = () => {
	const stateInfo = useStateInfo()
	const interval = stateInfo.numMinutes
	return (
		<SectionContainer>
			<Heading>Time Period</Heading>
			<TimeText>
				{capitalize(intervalToFormattedDuration(minutesToMilliseconds(interval)))}
			</TimeText>
		</SectionContainer>
	)
}

const PaybackFee = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const stateInfo = useStateInfo()
	const paybackFee = formatReefPrice(stateInfo.feeAmount)
	const [usdPrice, setUsdPrice] = useState((paybackFee * collectibleInfo.conversionRate).toFixed(2));
	useEffect(() => {
		setUsdPrice((paybackFee * collectibleInfo.conversionRate).toFixed(2));
		//eslint-disable-next-line
	}, [collectibleInfo.conversionRate])
	return (
		<SectionContainer>
			<Heading>Payback Fee</Heading>
			<PriceContainer>
				<ReefIcon size={28} />
				<p>
					<label title={numberSeparator(paybackFee.toString())}>{numberSeparator(paybackFee.toString())}</label>
					{usdPrice && (<span>(${usdPrice})</span>)}
				</p>
			</PriceContainer>
		</SectionContainer>
	)
}

const Funder = () => {
	const stateInfo = useStateInfo()
	return (
		<FunderSection>
			<Heading>Funder</Heading>
			<Content>
				<Logo
					url={getAvatarFromId(stateInfo.lender.address)}
				/>
				<NotStyledLink to={`/profile/${stateInfo.lender.address}`}><div>{stateInfo.lender.name}</div></NotStyledLink>
			</Content>
		</FunderSection>
	)
}

const ConfigWrapper = ({ children, state }) => {
	const isEmpty = Boolean(children.type() === null)
	return (
		<ConfigContainer>
			{!isEmpty ? (
				<>
					<TitleContainer>
						<Title>{constants.STATE_TYPES[state]}</Title>
					</TitleContainer>
					{children}
				</>
			) : (null)}
		</ConfigContainer>
	)
}

const Config1 = () => {
	// state-0 / not owned

	return (null)
}

const Config2 = () => {
	// state-0 / owned
	const [showAuctionModal, setShowAuctionModal] = useState(false)
	const [showPutOnSaleModal, setShowPutOnSaleModal] = useState(false)
	const [showLendModal, setShowLendModal] = useState(false)
	const [showRaffleModal, setShowRaffleModal] = useState(false)

	return (
		<BottomContainer>
			<AnimBtn onClick={() => setShowPutOnSaleModal(!showPutOnSaleModal)}>
				Put On Sale
			</AnimBtn>
			<AnimBtn onClick={() => setShowLendModal(!showLendModal)}>
				Lend
			</AnimBtn>
			<AnimBtn onClick={() => setShowAuctionModal(!showAuctionModal)}>
				Create Auction
			</AnimBtn>
			<AnimBtn onClick={() => setShowRaffleModal(!showRaffleModal)}>
				Create Raffle
			</AnimBtn>
			<CreateAuctionModal fee={50} isActive={showAuctionModal} setIsActive={setShowAuctionModal} />
			<PutOnSaleModal fee={25} isActive={showPutOnSaleModal} setIsActive={setShowPutOnSaleModal} />
			<LendModal fee={69} isActive={showLendModal} setIsActive={setShowLendModal} />
			<RaffleModal fee={0} isActive={showRaffleModal} setIsActive={setShowRaffleModal} />
		</BottomContainer>
	)
}

const Config3 = () => {
	// state-0 / not owned
	const [showBuyModal, setShowBuyModal] = useState(false)
	return (
		<BottomContainer>
			<RightContainer>
				<CurrentPrice />
			</RightContainer>
			<AnimBtn onClick={() => setShowBuyModal(!showBuyModal)}>
				Buy
			</AnimBtn>
			<BuyModal isActive={showBuyModal} setIsActive={setShowBuyModal} />
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

	const [showBidsModal, setShowBidsModal] = useState(false)

	return (
		<BottomWrapper>
			<Deadline />
			<TopSection>
				<MinimumBid />
				<HighestBid />
			</TopSection>
			<BottomContainer parent={false}>
				<AnimBtn onClick={() => setShowBidsModal(!showBidsModal)}>
					Bid
				</AnimBtn>
			</BottomContainer>
			<BidsModal isActive={showBidsModal} setIsActive={setShowBidsModal} />
		</BottomWrapper>
	)
}

const Config6 = () => {
	// state-2 / not owned / active / highest bidder

	return (
		<BottomWrapper>
			<Deadline />
			<TopSection>
				<MinimumBid />
				<HighestBid />
			</TopSection>
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
			<TopSection>
				<MinimumBid />
				<HighestBid />
			</TopSection>
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
			<TopSection>
				<MinimumBid />
				<HighestBid />
			</TopSection>
		</BottomWrapper>
	)
}

const Config9 = () => {
	// state-2 / owned / deadline over

	return (
		<Config7 />
	)
}

const Config10 = () => {
	// state-3 / not owned / active
	const [showEnterRaffleModal, setShowEnterRaffleModal] = useState(false)


	return (
		<BottomWrapper>
			<Deadline />
			<BottomContainer parent={false}>
				<AnimBtn onClick={() => setShowEnterRaffleModal(!showEnterRaffleModal)}>
					Enter Raffle
				</AnimBtn>
			</BottomContainer>
			<EnterRaffleModal isActive={showEnterRaffleModal} setIsActive={setShowEnterRaffleModal} />
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
		<Config11 />
	)
}

const Config14 = () => {
	// state-4 / not owned / not funded

	return (
		<BottomWrapper>
			<TopSection>
				<TimePeriod />
				<PaybackFee />
			</TopSection>
			<BottomContainer parent={false}>
				<RightContainer>
					<CurrentPrice />
				</RightContainer>
				<AnimBtn>
					Fund Loan
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config15 = () => {
	// state-4 / not funder / not owned / funded

	return (
		null
	)
}

const Config16 = () => {
	//state-4 / funder / funded

	return (
		<BottomWrapper>
			<TopSection>
				<Deadline />
				<PaybackFee />
			</TopSection>
			<BottomContainer parent={false}>
				<CurrentPrice />
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config17 = () => {
	// state-4 / funder / funded / deadline over

	return (
		<BottomWrapper>
			<TopSection>
				<Deadline />
				<PaybackFee />
			</TopSection>
			<BottomContainer parent={false}>
				<RightContainer>
					<CurrentPrice />
				</RightContainer>
				<AnimBtn>
					Liquidate Loan
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config18 = () => {
	// state-4 / owned / not funded

	return (
		<BottomWrapper>
			<TopSection>
				<TimePeriod />
				<PaybackFee />
			</TopSection>
			<BottomContainer parent={false}>
				<RightContainer>
					<CurrentPrice />
				</RightContainer>
				<AnimBtn>
					Unlist
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config19 = () => {
	// state-4 / owned / funded

	return (
		<BottomWrapper>
			<TopSection>
				<Deadline />
				<PaybackFee />
			</TopSection>
			<Funder />
			<BottomContainer parent={false}>
				<RightContainer>
					<CurrentPrice />
				</RightContainer>
				<AnimBtn>
					Repay
				</AnimBtn>
			</BottomContainer>
		</BottomWrapper>
	)
}

const Config20 = () => {

	return (
		<Config19 />
	)
}

const getComponent = (market) => {
	const showConfig = (id) => {
		let configMap = [
			// state-0 || Available
			<Config1 />,
			<Config2 />,
			// state-1 || Regular Sale
			<Config3 />,
			<Config4 />,
			// state-2 || Auction
			<Config5 />,
			<Config6 />,
			<Config7 />,
			<Config8 />,
			<Config9 />,
			// state-3 || Raffle
			<Config10 />,
			<Config11 />,
			<Config12 />,
			<Config13 />,
			<Config14 />,
			// state-4 || Loan
			<Config15 />,
			<Config16 />,
			<Config17 />,
			<Config18 />,
			<Config19 />,
			<Config20 />,
		]
		return <ConfigWrapper state={market.state}>{configMap[id - 1]}</ConfigWrapper>
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
	const { auth } = useContext(AuthContext)
	const { market } = collectibleInfo
	const stateInfo = useStateInfo()
	useEffect(() => {
		/*
			for debugging purpose
			should come from backend in the future
			REMEMBER TO PASS ACTIVE USER AS A UHHH DEPENDENCY FOR THE USEEFFECT OTHERWISE IT WILL NOT
			REFRESH THE CONFIG ONCE THE USER LOGS OUT

			Thank you past semolini, very cool!
		*/
		let updatedInfo = {
			...collectibleInfo,
			market: {
				state: collectibleInfo.state,
				owned: auth?.evmAddress === collectibleInfo.owner.address,
				active: (stateInfo && stateInfo.deadline) ? Date.now() < stateInfo.deadline * 1000 : false, // only for auctions, raffles, loans (dictated by deadline)
				highestBidder: stateInfo ? auth?.evmAddress === stateInfo.highestBidder?.address : false, // only for auctions
				funded: stateInfo ? Number(stateInfo.lender?.address) !== 0 : false, // only for loans
				funder: stateInfo ? auth?.evmAddress === stateInfo.lender?.address : false // only for loans
			}
		}
		setCollectibleInfo(updatedInfo)
		//eslint-disable-next-line
	}, [auth]);
	return (
		<LazyMotion features={domAnimation}>
			{getComponent(market)}
		</LazyMotion>
	);
};

export default MarketSection;