import React from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import { Container, Wrapper } from "./StyledElements";
const LoanCard = React.lazy(() =>
	import("@elements/Explore/Cards/Loan/LoanCard")
);

const LoanSection = () => {
	const { id } = useParams();
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards collection={id} Card={LoanCard} state={4} />
				</Container>
			</Wrapper>
		</>
	);
};

export default LoanSection;
