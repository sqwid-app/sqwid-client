import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import {
	fetchCollectionItems,
	fetchStateItems,
	fetchUserItems,
} from "@utils/marketplace";
import LoadingIcon from "@static/svg/LoadingIcon";
import constants from "@utils/constants";
import useOnScreen from "@utils/useOnScreen";
import FadeLoaderIcon from "@static/svg/FadeLoader";

const LoadingContainer = styled.div`
	width: 100%;
	display: grid;
	place-items: center;
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

const LoadMoreContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	color: var(--app-container-text-primary);
	margin: 1rem 0;
	span {
		font-weight: 900;
	}
`;

const EmptySection = ({ state }) => {
	return (
		<EmptySectionContainer>
			{state >= 0 && (
				<EmptySectionText>
					{constants.STATE_EMPTY_MESSAGE_MAP[state]}
				</EmptySectionText>
			)}
		</EmptySectionContainer>
	);
};

const PaginatedCardsScroll = ({ Card, state, profile, collection }) => {
	const loaderRef = useRef();
	const [startFrom, setStartFrom] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isCardLoading, setIsCardLoading] = useState(true);
	const [stateItems, setStateItems] = useState([]);
	const { isVisible } = useOnScreen(loaderRef);
	const [isFetching, setIsFetching] = useState(false);
	const [isFinished, setIsFinished] = useState(false);

	const fetchData = async () => {
		setIsFetching(true);
		const items = profile
			? await fetchUserItems(profile, state, startFrom)
			: collection
			? await fetchCollectionItems(collection, state, startFrom)
			: await fetchStateItems(state, startFrom);
		
		if (!items.items || items?.items?.length === 0) {
			setIsLoading(false);
			setIsCardLoading(false);
			setIsFinished(true);
			return;
		}
		setStateItems([...stateItems, ...items?.items]);
		setIsLoading(false);
		setIsCardLoading(false);
		setStartFrom(items.pagination.lowest - 1);
		setIsFetching(false);
		return;
		//eslint-disable-next-line
	};

	useEffect(() => {
		const getItems = async () => {
			if (isVisible && !isFetching) {
				await fetchData();
			}
		};
		getItems();
		// eslint-disable-next-line
	}, [stateItems.length, isVisible]);
	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<>
					{stateItems?.length === 0 ? (
						<EmptySection state={state} />
					) : (
						<>
							<CardSectionContainer>
								<Suspense>
									{stateItems.map((item, index) => (
										<Card
											key={index}
											data={item}
											isLoading={isCardLoading}
										/>
									))}
								</Suspense>
							</CardSectionContainer>
						</>
					)}
				</>
			)}
			{!isFinished ? (
				<LoadMoreContainer
					style={{ visibility: isLoading ? "hidden" : "visible" }}
					ref={loaderRef}
				>
					<span>🌊 the tide is rising</span>{" "}
					<FadeLoaderIcon size={24} />
				</LoadMoreContainer>
			) : null}
		</>
	);
};

export default PaginatedCardsScroll;
