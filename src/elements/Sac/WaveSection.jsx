import React, { useContext } from "react";
import Container from "./Container";
import Heading from "./Heading";
import ProgressBar from "./ProgressBar";
import SacContext from "@contexts/Sac/SacContext";
import styled from "styled-components";

const ContentContainer =  styled.div`
	padding: 0 1rem;
`

const WaveSection = () => {
	const { sacDetails } = useContext(SacContext);
	return (
		<Container>
			<Heading>Wave #{sacDetails.wave}</Heading>
			<ContentContainer>
				<ProgressBar percent={sacDetails.percent}/>
			</ContentContainer>
		</Container>
	)
}

export default WaveSection
