import React from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import { Container, Wrapper } from "./StyledElements";
const AuctionCard = React.lazy(() => import("@elements/Explore/Cards/Auction/AuctionCard"));

const AuctionSection = () => {
	const { id } = useParams()
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards collection={id} Card={AuctionCard} state={2} />
				</Container>
			</Wrapper>
		</>
	)
}

export default AuctionSection
