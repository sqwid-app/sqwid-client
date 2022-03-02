import { respondTo } from "@styles/styledMediaQuery";
// import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import RecentlyListed from "./RecentlyListed";
import { fetchMarketplaceItems } from "@utils/marketplace";
import OnSaleSection from "@elements/Explore/Sections/OnSaleSection";
import AuctionSection from "@elements/Explore/Sections/AuctionSection";
import RaffleSection from "@elements/Explore/Sections/RaffleSection";
import LoansSection from "@elements/Explore/Sections/LoansSection";
import useOnScreen from "@utils/useOnScreen";

// changed the min height ot 20 instead of 70 to stop the quirky thing
const Container = styled.div`
	padding: 0 6rem;
	min-height: 20vh;
	max-width: 90rem;
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

const Wrapper = styled.div`
	padding: 0 12rem;
`

const Section = styled.section`
	width: 100%;
	margin: 4rem 0;
`

const Explore = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [onSale, setOnSale] = useState([]);
	const [auctions, setAuctions] = useState([]);
	const [raffles, setRaffles] = useState([]);
	const [loans, setLoans] = useState([]);
	const containerRef = useRef()
	const isVisible = useOnScreen(containerRef)

	const fetchData = async () => {
		// console.log("sending request")
		const { sale, auction, raffle, loan } = await fetchMarketplaceItems();
		setOnSale(sale);
		setAuctions(auction);
		setRaffles(raffle);
		setLoans(loan);
		setIsLoading(false);
	}

	useEffect(() => {
		// console.log ("isVisible", isVisible);
		isVisible && (onSale.length === 0) && fetchData();
		// if (isVisible && (onSale.length === 0)) {
		// 	fetchData().then(() => {
		// 		console.log ("fetchData")
		// 	})
		// }
		// console.log(isVisible ? "visible" : "not visible")
		//eslint-disable-next-line
	}, [isVisible])

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const items = await fetchMarketplaceItems();
	// 		setOnSale(items.sale);
	// 		setAuctions(items.auction);
	// 		setRaffles(items.raffle);
	// 		setLoans(items.loan);
	// 		setIsLoading(false);
	// 	}
	// 	fetchData();
	// }, []);
	return (
		<Section id="explore">
			<Wrapper>
				{/* <Navbar>
					<Heading>Explore</Heading>
					<StyledNavLink to="/explore">Dive In <ChevronRight /></StyledNavLink>
				</Navbar> */}
				<Container ref={containerRef}>
					{!isLoading && (
						<>
							<OnSaleSection items={onSale} />
							<AuctionSection items={auctions} />
							<RaffleSection items={raffles} />
							<LoansSection items={loans} />
						</>
					)}
				</Container>
			</Wrapper>
		</Section>
	)
}

export default Explore;