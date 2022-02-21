import React, { useContext } from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import AuthContext from "@contexts/Auth/AuthContext";
import { Container, Wrapper } from "./StyledElements";
const SalesCard = React.lazy(() => import("@elements/Explore/Cards/Sales/SalesCard"));

const OnSaleSection = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	const userID = id ? id : auth?.evmAddress
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards profile={userID} Card={SalesCard} state={1} />
				</Container>
			</Wrapper>
		</>
	)
}

export default OnSaleSection
