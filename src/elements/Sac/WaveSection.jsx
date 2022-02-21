import React, { useContext } from "react";
import Container from "./Container";
import Heading from "./Heading";
import ProgressBar from "./ProgressBar";
import SacContext from "@contexts/Sac/SacContext";
import styled from "styled-components";
import { numberSeparator } from "@utils/numberSeparator";
import ReefIcon from "@static/svg/ReefIcon";
import { respondTo } from "@styles/styledMediaQuery";

const ContentContainer = styled.div`
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0.5rem 0;
	`}
`

const Base = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	h3, p{
		font-size: 1.25rem;
	}
	p{
		display: flex;
		align-items: center;
		span{
			vertical-align: middle;
		}
	}
`

const AccumulatedCollateral = styled(Base)``

const TotalSellers = styled(Base)``

const WaveSection = () => {
	const { sacDetails } = useContext(SacContext);
	return (
		<Container>
			<Heading>Wave #{sacDetails.wave}</Heading>
			<ContentContainer>
				<ProgressBar percent={sacDetails.percent} date={sacDetails.date} />
				<AccumulatedCollateral>
					<h3>Accumulated Collateral</h3>
					<p>
						<ReefIcon size={24} />
						<span>{numberSeparator(sacDetails.accumulated)}</span>
					</p>
				</AccumulatedCollateral>
				<TotalSellers>
					<h3>Total Sellers</h3>
					<p>
						{sacDetails.totalSellers}
					</p>
				</TotalSellers>
			</ContentContainer>
		</Container>
	)
}

export default WaveSection
