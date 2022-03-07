import React, { Suspense } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
const SalesCard = React.lazy(() =>
	import("@elements/Explore/Cards/Sales/SalesCard")
);

const Container = styled.div`
	width: 100%;
`;

const Header = styled.h1`
	font-weight: 900;
`;

const HotBids = ({ data }) => {
	//eslint-disable-next-line
	const { items, pagination } = data;

	return (
		<Container>
			<Header>
				Hot Bids <span className="emoji">🔥</span>
			</Header>
			<CardSectionContainer>
				<Suspense>
					{items.map((item, index) => (
						<SalesCard key={index} data={item} />
					))}
				</Suspense>
			</CardSectionContainer>
		</Container>
	);
};

export default HotBids;
