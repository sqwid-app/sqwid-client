import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
const LoanCard = React.lazy(() =>
	import("@elements/Explore/Cards/Loan/LoanCard")
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

const LoanPage = () => {
	return (
		<>
			<Wrapper>
				<Container>
					<Header>
						Loans <span className="emoji">🏦</span>
					</Header>
					<PaginatedCards Card={LoanCard} state={4} />
				</Container>
			</Wrapper>
		</>
	);
};

export default LoanPage;
