import React from "react";
import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
import { useParams } from "react-router-dom";
import { Container, Wrapper } from "./StyledElements";
const SalesCard = React.lazy(() =>
	import("@elements/Explore/Cards/Sales/SalesCard")
);

const OnSaleSection = () => {
	const { id } = useParams();
	return (
		<>
			<Wrapper>
				<Container>
					<PaginatedCards
						collection={id}
						Card={SalesCard}
						state={1}
					/>
				</Container>
			</Wrapper>
		</>
	);
};

export default OnSaleSection;
