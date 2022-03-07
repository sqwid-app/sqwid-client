import { respondTo } from "@styles/styledMediaQuery";
// import axios from "axios";
import React from "react";
import styled from "styled-components";
// import RecentlyListed from "./RecentlyListed";
// import RecentlyListedPaginated from "@components/ExploreRedesign/RecentlyListedPaginated";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
const SalesCard = React.lazy(() =>
	import("@elements/Explore/Cards/Sales/SalesCard")
);

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
`;

const Container = styled.div`
	width: 100%;
`;

const Header = styled.h1`
	font-weight: 900;
`;

const SalePage = () => {
	return (
		<>
			<Wrapper>
				<Container>
					<Header>
						Sales <span className="emoji">📃</span>
					</Header>
					<PaginatedCards Card={SalesCard} state={1} />
				</Container>
			</Wrapper>
		</>
	);
};

export default SalePage;
