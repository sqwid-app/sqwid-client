import { respondTo } from "@styles/styledMediaQuery";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingIcon from "@static/svg/LoadingIcon";
// import RecentlyListed from "./RecentlyListed";
import { fetchMarketplaceItems } from "@utils/marketplace";
import OnSaleSection from "@elements/Explore/Sections/OnSaleSection";
import AuctionSection from "@elements/Explore/Sections/AuctionSection";
import RaffleSection from "@elements/Explore/Sections/RaffleSection";
//eslint-disable-next-line
import LoansSection from "@elements/Explore/Sections/LoansSection";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	max-width: 90rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1{
			padding-left: 3rem;
		}
	`}
`

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`

const MainPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [onSale, setOnSale] = useState([]);
	const [auctions, setAuctions] = useState([]);
	const [raffles, setRaffles] = useState([]);
	//eslint-disable-next-line
	const [loans, setLoans] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchMarketplaceItems();
			setOnSale(items.sale);
			setAuctions(items.auction);
			setRaffles(items.raffle);
			setLoans(items.loan);

			setIsLoading(false);
		}
		fetchData();
	}, []);
	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Wrapper>
					<OnSaleSection items={onSale} />
					<AuctionSection items={auctions} />
					<RaffleSection items={raffles} />
					{/* <LoansSection items={loans} /> */}
				</Wrapper>
			)}
		</>
	)
}

export default MainPage;