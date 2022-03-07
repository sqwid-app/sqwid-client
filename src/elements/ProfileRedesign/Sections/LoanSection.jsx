import React, { useContext } from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import AuthContext from "@contexts/Auth/AuthContext";
import { Container, Wrapper } from "./StyledElements";
const LoanCard = React.lazy(() =>
	import("@elements/Explore/Cards/Loan/LoanCard")
);

const LoanSection = () => {
	const { auth } = useContext(AuthContext);
	const { id } = useParams();
	const userID = id ? id : auth?.evmAddress;
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards
						profile={userID}
						Card={LoanCard}
						state={4}
					/>
				</Container>
			</Wrapper>
		</>
	);
};

export default LoanSection;
