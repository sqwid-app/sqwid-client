import { respondTo } from "@styles/styledMediaQuery";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HotBids from "./HotBids";
import LoadingIcon from "@static/svg/LoadingIcon";
import RecentlyListed from "./RecentlyListed";
import { fetchMarketplaceItems } from "@utils/marketplace";
import RecentlyListedPaginated from "./RecentlyListedPaginated";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
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

const HeroSection = () => {
	const [hotBids, setHotBids] = useState([]);
	const [recentlyListed, setRecentlyListed] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	useEffect (() => {
		const fetchData = async () => {
			const items = await fetchMarketplaceItems ();
			setHotBids (items.sort ((a, b) => Number (b.highestBid) - Number (a.highestBid)).slice (0, 3));
			setRecentlyListed (items.sort ((itemA, itemB) => {
				return Number (itemB.id) - Number (itemA.id);
			}));

			setIsLoading (false);
		}
		fetchData ();
	}, []);

	return (
		<>
			{isLoading?(
				<LoadingContainer>
					<LoadingIcon size={64}/>
				</LoadingContainer>
			):(
				<Wrapper>
				<HotBids items = { hotBids } />
				<RecentlyListedPaginated items = { recentlyListed }/>
			</Wrapper>
			)}
		</>
	)
}

export default HeroSection
