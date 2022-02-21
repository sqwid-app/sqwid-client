import React from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import { Container, Wrapper } from "./StyledElements";
const RaffleCard = React.lazy(() => import("@elements/Explore/Cards/Raffle/RaffleCard"));

const RaffleSection = () => {
	const { id } = useParams()
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards collection={id} Card={RaffleCard} state={3} />
				</Container>
			</Wrapper>
		</>
	)
}

export default RaffleSection
