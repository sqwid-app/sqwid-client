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
import LoansSection from "@elements/Explore/Sections/LoansSection";
import { NavLink } from "react-router-dom";

const Container = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	max-width: 90rem;
	margin: 4rem auto;
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
	padding: 0 6rem;
`

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`

const Section = styled.section`
	width: 100%;
	margin: 6rem 0;
`


const Navbar = styled.nav`
	display:flex;
	gap:0.5rem;
	border-bottom: 0.1rem solid var(--app-container-bg-primary);
	border-radius: 0.1rem;
	margin-bottom: 0.5rem;
	user-select:none;
`

const NavContent = styled(NavLink)`
	position:relative;
	padding: 0.1rem 0.5rem;
	font-size: 2rem;
	font-weight: 900;
	color: ${props => props.active ? `inherit` : `var(--app-container-text-primary)`};
	cursor: pointer;
	text-decoration:none;
	display: block;
	text-decoration: none;
	color: inherit;
	font-size: 2rem;
	font-weight: 900;
	text-align:left;
	width: fit-content;
	transition: color 0.1s;
	&:hover{
		color: var(--app-container-text-primary-hover);
		&:before{
			border-bottom: 0.1rem solid var(--app-container-text-primary-hover);
		}
	}
	&:before{
		content: "";
		height: 100%;
		width: 100%;
		left:0;
		top: 0;
		position: absolute;
		border-bottom: 0.1rem solid var(--app-text);
		border-radius: 0.1rem;
		opacity: 0;
		opacity: ${props => props.active ? `1` : `0`};
		transition: opacity 0.1s ease;
	}
`

const Explore = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [onSale, setOnSale] = useState([]);
	const [auctions, setAuctions] = useState([]);
	const [raffles, setRaffles] = useState([]);
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
		<Section id="explore">
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Wrapper>
					<Navbar>
						<NavContent to="/explore" active>Explore</NavContent>
					</Navbar>
					<Container>
						<OnSaleSection items={onSale} />
						<AuctionSection items={auctions} />
						<RaffleSection items={raffles} />
						<LoansSection items={loans} />
					</Container>
				</Wrapper>
			)}
		</Section>
	)
}

export default Explore;