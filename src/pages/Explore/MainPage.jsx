import { respondTo } from "@styles/styledMediaQuery";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingIcon from "@static/svg/LoadingIcon";
// import RecentlyListed from "./RecentlyListed";
import { fetchMarketplaceItems } from "@utils/marketplace";
import OnSaleSection from "@components/ExploreRedesign/Sections/OnSaleSection";
import AuctionSection from "@components/ExploreRedesign/Sections/AuctionSection";
import RaffleSection from "@components/ExploreRedesign/Sections/RaffleSection";
import LoansSection from "@components/ExploreRedesign/Sections/LoansSection";

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
	const [loans, setLoans] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchMarketplaceItems();
			setOnSale(items.sort((a, b) => Number(b.highestBid) - Number(a.highestBid)).slice(0, 4));
			setAuctions(items.sort((itemA, itemB) => {
				return Number(itemB.id) - Number(itemA.id);
			}).slice(0, 4));
			setRaffles(items.sort((a, b) => Number(b.highestBid) - Number(a.highestBid)).reverse().slice(0, 4));
			setLoans(items.sort((itemA, itemB) => {
				return Number(itemB.id) - Number(itemA.id);
			}).reverse().slice(0, 4));

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
					<LoansSection items={loans} />
				</Wrapper>
			)}
		</>
	)
}

export default MainPage;