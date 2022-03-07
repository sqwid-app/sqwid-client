import React from "react";
import DetailsChart from "./DetailsChart";
import styled from "styled-components";

const DetailsContainer = styled.div`
	min-height: 25rem;
`;
const HistorySection = () => {
	return (
		<DetailsContainer>
			<DetailsChart />
		</DetailsContainer>
	);
};

export default HistorySection;
