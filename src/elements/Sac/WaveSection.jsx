import React, { useContext } from "react";
import Container from "./Container";
import Heading from "./Heading";
import ProgressBar from "./ProgressBar";
import SacContext from "@contexts/Sac/SacContext";

const WaveSection = () => {
	const { sacDetails } = useContext(SacContext);
	return (
		<Container>
			<Heading>Wave #{sacDetails.wave}</Heading>
			<ProgressBar percent={sacDetails.percent}/>
		</Container>
	)
}

export default WaveSection
