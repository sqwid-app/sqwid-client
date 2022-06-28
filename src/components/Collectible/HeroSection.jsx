import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import InfoContent from "@elements/Collectible/InfoContent";
import NFTContent from "@elements/Collectible/NFTContent";
import LoadingIcon from "@static/svg/LoadingIcon";
import { respondTo } from "@styles/styledMediaQuery";
import bread from "@utils/bread";
import constants from "@utils/constants";

import {
	//eslint-disable-next-line
	fetchMarketplaceItem,
	//eslint-disable-next-line
	fetchRaffleEntries,
	//eslint-disable-next-line
	marketplaceItemExists,
} from "@utils/marketplace";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import styled from "styled-components";
import { getBackend } from "@utils/network";
import useStateInfo from "@utils/useStateInfo";

const Wrapper = styled.div`
	padding: 0 6rem;
	height: calc(100vh - 12rem);
	/* display: flex; */
	display: grid;
	grid-auto-columns: minmax(0, 1fr);
	grid-auto-flow: column;
	/* grid-template-columns: repeat(2,minmax(0,1fr)); */
	gap: 2rem;
	${respondTo.md`
		padding: 0 2rem;
		grid-auto-flow: row;
		min-height: 85vh;
		height: auto;
	`}
`;

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items: center;
`;

const MetaTags = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	// console.log(collectibleInfo)
	const stateInfo = useStateInfo();
	const emoji = stateInfo ? constants.STATE_EMOJI_MAP[stateInfo?.type] : null;
	const title = `${emoji ? `${emoji} | ` : ""}${
		collectibleInfo.meta.name
	} | ${constants.APP_NAME}`;
	const description = collectibleInfo.meta.description;
	const image = collectibleInfo.meta.image;
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={constants.APP_WEBSITE} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={constants.APP_WEBSITE} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />
		</Helmet>
	);
};

const HeroSection = () => {
	const { collectibleInfo, setCollectibleInfo } =
		useContext(CollectibleContext);
	const [isLoading, setIsLoading] = useState(true);
	const { addr } = useParams();

	useEffect(() => {
		// Axios request goes here ebin...
		// eslint-disable-next-line
		const getDataOld = async () => {
			const { data } = await axios.get(
				`${getBackend()}/get/marketplace/position/${addr}`
			);
			if (data && !data.error) {
				let conversionRate = null;
				try {
					let res = await axios(
						"https://api.coingecko.com/api/v3/simple/price?ids=reef&vs_currencies=usd"
					);
					let price = res.data["reef-finance"].usd;
					conversionRate = Number(price);
				} catch (err) {
					bread(err.response.data.error);
				}
				setCollectibleInfo({
					...data,
					conversionRate,
					isValidCollectible: true,
				});
				setIsLoading(false);
			} else {
				setCollectibleInfo({
					...collectibleInfo,
					isValidCollectible: false,
				});
			}
		};

		const getData = async () => {
			const collectiblePromise = axios.get(
				`${getBackend()}/get/marketplace/position/${addr}`
			);
			const pricePromise = axios(
				"https://api.coingecko.com/api/v3/simple/price?ids=reef&vs_currencies=usd"
			);
			try {
				const [collectible, price] = await Promise.all([
					collectiblePromise,
					pricePromise,
				]);
				if (collectible.data && collectible.data.error)
					setCollectibleInfo({
						...collectibleInfo,
						isValidCollectible: false,
					});
				else {
					let conversionRate = price.data
						? price.data["reef"].usd
						: 0;
					setCollectibleInfo({
						...collectible.data,
						conversionRate,
						isValidCollectible: true,
					});
					setIsLoading(false);
				}
			} catch (err) {
				bread(err);
				setCollectibleInfo({
					...collectibleInfo,
					isValidCollectible: false,
				});
			}
		};
		getData();
		//eslint-disable-next-line
	}, []);
	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Wrapper>
					<MetaTags />
					<InfoContent />
					<NFTContent />
				</Wrapper>
			)}
		</>
	);
};

export default HeroSection;
