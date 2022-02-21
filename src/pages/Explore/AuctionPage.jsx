import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
const AuctionCard = React.lazy(() => import("@elements/Explore/Cards/Auction/AuctionCard"));

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

const Container = styled.div`
	width: 100%;
`

const Header = styled.h1`
	font-weight: 900;
`

const AuctionPage = () => {
	return (
		<>
			<Wrapper>
				<Container>
					<Header>Auctions <span className="emoji">⌛</span></Header>
					<PaginatedCards Card={AuctionCard} state={2} />
				</Container>
			</Wrapper>
		</>
	)
}

export default AuctionPage
