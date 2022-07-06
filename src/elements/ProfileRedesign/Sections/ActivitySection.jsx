import React, { useState } from "react";
// import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
// import { useParams } from "react-router-dom";
// import AuthContext from "@contexts/Auth/AuthContext";
import styled from "styled-components";
import { Container, Wrapper } from "./StyledElements";
import { useEffect } from "react";
import { fetchOngoingBids } from "@utils/marketplace";
// const SalesCard = React.lazy(() =>
// 	import("@elements/Explore/Cards/Sales/SalesCard")
// );

const ColumnsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ActivitySection = () => {
	// const { auth } = useContext(AuthContext);
	// const { id } = useParams();
	// const userID = id ? id : auth?.evmAddress;
	// eslint-disable-next-line no-unused-vars
	const [bids, setBids] = useState ([]);
	useEffect (() => {
		const fetchData = async () => {
			const data = await fetchOngoingBids ();
			setBids (data.bids);
		}
		fetchData ();
	}, []);
	return (
		<>
			<Wrapper>
				<Container>
					<ColumnsWrapper>
						Under construction
					</ColumnsWrapper>
					{/* <PaginatedCards
						profile={userID}
						Card={SalesCard}
						state={0}
					/> */}
				</Container>
			</Wrapper>
		</>
	);
};

export default ActivitySection;
