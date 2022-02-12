import React, { useContext } from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import AuthContext from "@contexts/Auth/AuthContext";
import { Container, Wrapper } from "./StyledElements";
const AuctionCard = React.lazy(() => import("@elements/Explore/Cards/Auction/AuctionCard"));

const RaffleSection = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	const userID = id ? id : auth?.evmAddress
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards profile={userID} Card={AuctionCard} state={3} />
				</Container>
			</Wrapper>
		</>
	)
}

export default RaffleSection
