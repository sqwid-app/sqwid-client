import React, { useState } from "react";
// import PaginatedCards from "@elements/Explore/Cards/Default/PaginatedCards";
// import { useParams } from "react-router-dom";
// import AuthContext from "@contexts/Auth/AuthContext";
import styled from "styled-components";
import { Wrapper as StyledWrapper } from "./StyledElements";
import { useEffect } from "react";
import { claimClaimables, fetchClaimables } from "@utils/marketplace";
import { domAnimation, LazyMotion, m } from "framer-motion";
// import { Link } from "react-router-dom";
import CardMedia from "@elements/Explore/Cards/Default/CardMedia";
import { CustomCardHeaderIcons } from "@elements/Explore/Cards/Default/CardHeaderIcons";
import { BottomContainer, Title, TopContainer } from "@elements/Explore/Cards/Default/StyledComponents";
import { getInfuraURL } from "@utils/getIPFSURL";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import Loading from "@elements/Default/Loading";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";
import bread from "@utils/bread";

const CardWrapper = styled(m.div)`
	position: relative;
	display: grid;
	grid-template-rows: 2fr 1fr;
	border: 0.125rem solid var(--app-container-bg-primary);
	border-radius: 0.375rem;
	/* overflow:hidden; */
	min-width: 16rem;
	aspect-ratio: calc(2/3);
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	color: var(--app-text);
`;

const Btn = styled(BtnBaseAnimated)`
	width: 10rem;
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	user-select: none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	};
	flex: 1;
`;

const CardSectionContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(0, 16rem));
	width: 100%;
	justify-content: space-around;
	padding: 1.5rem 1.25rem;
	grid-gap: 2rem 0.5rem;
	overflow-x: hidden;
`;

const CardInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 0.75rem 1.25rem;
`;

const EmptySectionContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
`;
const EmptySectionText = styled.h2`
	font-weight: 900;
	color: var(--app-container-text-primary);
	text-align: center;
	font-size: 1.25rem;
`;

const AnimBtn = ({ children, onClick, disabled }) => (
	<Btn
		whileTap={{
			scale: 0.97,
		}}
		whileHover={{
			y: -5,
			x: 0,
		}}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Btn>
);

const CardInfo = ({ data, claiming, setClaiming, setIsClaimed }) => {
	const headerData = {
		sender: {
			link: `/profile/${data.from.address}`,
			image: data.from.avatar,
			tooltip: `Sender: ${data.from.name}`
		},
		creator: {
			link: `/profile/${data.creator.address}`,
			image: data.creator.avatar,
			tooltip: `Creator: ${data.creator.name}`
		},
		collection: {
			link: `/collections/${data.collection.id}`,
			image: getInfuraURL (data.collection.thumbnail || data.collection.image),
			tooltip: `Collection: ${data.collection.name}`
		}
	}
	const initialButtonText = `Claim x${data.amount}`;
	const [buttonText, setButtonText] = useState (initialButtonText);
	const { showErrorModal } = useErrorModalHelper();

	const handleClaim = async () => {
		if (claiming) return;
		setClaiming (true);
		setButtonText ("Claiming...");
		try {
			const res = await claimClaimables (data.itemId, data.tokenId);
			if (res && !res.error) {
				// setButtonText ("Claimed");
				bread ('Claimed!');
			} else {
				setButtonText (initialButtonText);
				showErrorModal (res.message);
			}
			setClaiming (false);
			setIsClaimed (true);
		} catch (e) {
			setButtonText (initialButtonText);
			showErrorModal (e.toString ());
		}
	}

	return (
		<CardInfoWrapper>
			<TopContainer>
				<Title>
					<label title={data.meta.meta.name}>{data.meta.meta.name}</label>
				</Title>
				<CustomCardHeaderIcons data={headerData} />
			</TopContainer>
			<BottomContainer>
				<AnimBtn disabled = {claiming} onClick = {handleClaim}>
					{claiming ? <Loading/> : buttonText}
				</AnimBtn>
			</BottomContainer>
		</CardInfoWrapper>
	);
};

const Claimable = ({item}) => {
	const [claiming, setClaiming] = useState (false);
	const [isClaimed, setIsClaimed] = useState (false);
	return (
		<>
			{!isClaimed && <LazyMotion features={domAnimation}>
				<CardWrapper>
					<CardMedia
						to={`#`}
						isLoading={false}
						meta={item.meta.meta}
					/>
					<CardInfo
						data={item}
						claiming = {claiming}
						setClaiming = {setClaiming}
						// isClaimed = {isClaimed}
						setIsClaimed = {setIsClaimed}/>
				</CardWrapper>
			</LazyMotion>}
		</>
	);
}

const ActivitySection = () => {
	const [claimables, setClaimables] = useState ([]);
	useEffect (() => {
		const fetchData = async () => {
			const data = await fetchClaimables ();
			setClaimables (data);
		}
		fetchData ();
	}, []);
	return (
		<>
			<StyledWrapper>

				{claimables.length ? <CardSectionContainer>
					{claimables.map ((item) => <Claimable key = {item.itemId} item = {item} />)}
				</CardSectionContainer> : (<EmptySectionContainer>
					<EmptySectionText>
						Looks like there is nothing to be claimed right now. Check back later! 😊
					</EmptySectionText>
				</EmptySectionContainer>)}
			</StyledWrapper>
		</>
	);
};

export default ActivitySection;
