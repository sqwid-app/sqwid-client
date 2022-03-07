import SacContext from "@contexts/Sac/SacContext";
import Tooltip from "@elements/Default/Tooltip";
import ClaimSection from "@elements/Sac/ClaimSection";
import RedeemSection from "@elements/Sac/RedeemSection";
import StatsSection from "@elements/Sac/StatsSection";
import WaveSection from "@elements/Sac/WaveSection";
import { respondTo } from "@styles/styledMediaQuery";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0 1.5rem;
	`}
`;

const HeadingSection = styled.div`
	position: relative;
	z-index: 4;
`;

const Heading = styled.h1`
	font-size: 2rem;
	font-weight: 900;
`;

const SubHeading = styled.h2`
	font-size: 1.25rem;
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

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
	${respondTo.md`
		grid-template-rows: auto 1fr auto;
		grid-template-columns: repeat(2, auto);
		& div:nth-child(1) {
			grid-area: 1 / 1 / 1 / 4;
		}
		& div:nth-child(2) {
			grid-area: 2 / 1 / 2 / 4;
		}
		& div:nth-child(3) {
			grid-area: 3 / 1 / 3 / 4;
		}
		& div:nth-child(4) {
			grid-area: 4 / 1 / 4 / 4;
		}
	`}
`;

const ErrorContainer = styled(Wrapper)`
	display: grid;
	align-items: center;
	justify-content: center;
`;

const Error = ({ stack }) => {
	const { pathname } = window.location;
	return (
		<ErrorContainer>
			<div>
				<h1>404 not found</h1>
				<p>{pathname}</p>
				{stack && <code>{stack}</code>}
			</div>
		</ErrorContainer>
	);
};

const HeroSection = () => {
	const { setSacDetails } = useContext(SacContext);
	const { id } = useParams();
	const [hasError, setHasError] = useState(false);

	const redeemCard1 = {
		id: 2,
		name: "Golden Ink Sac",
		wave: "1",
		price: "100",
		image: "https://images.unsplash.com/photo-1638130419943-1242ff0300bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
		totalSellers: "10",
		topSellers: [
			{
				id: "0x2c15d99D65b2DB4592653827F1BCB9788a943f78",
				name: "Boidushya",
			},
			{
				id: "5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				name: "Andi",
			},
		],
		accumulated: "42069",
		date: "01/11/2021",
		percent: "10",
		redeemCards: [],
	};
	const redeemCard2 = {
		id: 3,
		name: "Ink Sac with a really long name wtf its so fricking long dude wth",
		wave: "2",
		price: "500",
		image: "https://images.unsplash.com/photo-1639459841176-a520a8aff562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
		totalSellers: "14",
		topSellers: [
			{
				id: "0x2c15d99D65b2DB4592653827F1BCB9788a943f78",
				name: "Boidushya",
			},
			{
				id: "5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				name: "Andi",
			},
		],
		accumulated: "111",
		date: "01/11/2021",
		percent: "33",
		redeemCards: [redeemCard1],
	};
	const redeemCard3 = {
		id: 4,
		name: "short",
		wave: "5",
		price: "500",
		image: "https://images.unsplash.com/photo-1639745297141-347515fdb8aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
		totalSellers: "90",
		topSellers: [
			{
				id: "0x2c15d99D65b2DB4592653827F1BCB9788a943f78",
				name: "Boidushya",
			},
			{
				id: "5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				name: "Andi",
			},
		],
		accumulated: "123456",
		date: "01/11/2021",
		percent: "90",
		redeemCards: [redeemCard1, redeemCard2],
	};

	const card = {
		id: 1,
		name: "Sqwid",
		image: "https://images.unsplash.com/photo-1639480032529-36b4af636464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
		price: "100",
		wave: "6",
		totalSellers: "76",
		topSellers: [
			{
				id: "0x2c15d99D65b2DB4592653827F1BCB9788a943f78",
				name: "Boidushya",
			},
			{
				id: "5FYmfz6QSbwQZ1MrYLhfdGVADmPyUZmE8USLBkYP4QmgkgDA",
				name: "Andi",
			},
		],
		accumulated: "520230",
		date: "01/11/2021",
		percent: "75",
		redeemCards: [redeemCard1, redeemCard2, redeemCard3],
	};

	const cards = [card, redeemCard1, redeemCard2, redeemCard3];

	let activeSac = cards.find(card => card.id === Number(id));

	useEffect(() => {
		activeSac ? setSacDetails(activeSac) : setHasError(true);

		//eslint-disable-next-line
	}, [setSacDetails, id]);
	return (
		<>
			{!hasError ? (
				<Wrapper>
					<HeadingSection>
						<Heading className="heading">Ink Sacs</Heading>
						<SubHeading>
							Sustainable Revenue Sharing
							<Tooltip>Why is this awesome?</Tooltip>
						</SubHeading>
					</HeadingSection>
					<ContentContainer>
						<ClaimSection />
						<WaveSection />
						<RedeemSection />
						<StatsSection />
					</ContentContainer>
				</Wrapper>
			) : (
				<Error stack={`Ink Sac with id ${id} is not valid`} />
			)}
		</>
	);
};

export default HeroSection;
