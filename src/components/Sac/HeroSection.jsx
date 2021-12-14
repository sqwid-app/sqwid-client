import SacContext from "@contexts/Sac/SacContext";
import Tooltip from "@elements/Default/Tooltip";
import ClaimSection from "@elements/Sac/ClaimSection";
import RedeemSection from "@elements/Sac/RedeemSection";
import StatsSection from "@elements/Sac/StatsSection";
import WaveSection from "@elements/Sac/WaveSection";
import { respondTo } from "@styles/styledMediaQuery";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1.heading{
			padding-left: 2rem;
		}
	`}
`

const HeadingSection = styled.div`
	position: relative;
	z-index:4;
`

const Heading = styled.h1`
	font-size: 2rem;
	font-weight: 900;
`

const SubHeading = styled.h2`
	font-size: 1.25rem;
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	display: flex;
	align-items: center;
	gap: 0.5rem;
`

const ContentContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: repeat(2, auto);
	gap: 1rem;
	& div:nth-child(1) {
		grid-area: 1 / 1 / 2 / 2;
	}
	& div:nth-child(2) {
		grid-area: 1 / 2 / 2 / 3;
	}
	& div:nth-child(3) {
		grid-area: 1 / 3 / 2 / 4;
	}
	& div:nth-child(4) {
		grid-area: 2 / 1 / 3 / 4;
	}
`

const HeroSection = ({ id }) => {
	const { setSacDetails } = useContext(SacContext)
	useEffect(() => {
		setSacDetails({
			name:"Sqwid",
			image:"https://images.unsplash.com/photo-1639480032529-36b4af636464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=453&q=80",
			price:"100",
			wave:"6",
			totalSellers:"76",
			topSellers:[{
				id: "0x2c15d99D65b2DB4592653827F1BCB9788a943f78",
				name: "Boidushya",
			},{
				id: "5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				name: "Andi"
			}],
			accumulated: "520230",
			date:"01/11/2021",
			percent:"75"
		})
	}, [setSacDetails])
	return (
		<Wrapper>
			<HeadingSection>
				<Heading className="heading">Ink Sacs</Heading>
				<SubHeading>
					Sustainable Revenue Sharing
					<Tooltip>Why is this awesome?</Tooltip>
				</SubHeading>
			</HeadingSection>
			<ContentContainer>
				<ClaimSection/>
				<WaveSection/>
				<RedeemSection/>
				<StatsSection/>
			</ContentContainer>
		</Wrapper>
	)
}

export default HeroSection
