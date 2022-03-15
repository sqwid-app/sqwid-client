import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import {
	fetchCollectionItems,
	fetchStateItems,
	fetchUserItems,
} from "@utils/marketplace";
import constants from "@utils/constants";
import InfiniteScroll from "react-infinite-scroller";
import LoaderCard from "./LoaderCard";

const CardWrapper = styled.div`
	width: 100%;
`;

const PaginatedCardsScroll = ({ Card, state, profile, collection }) => {
	const [startFrom, setStartFrom] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [stateItems, setStateItems] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const containerRef = useRef();

	const fetchData = () => {
		const items = profile
			? fetchUserItems(profile, state, startFrom)
			: collection
			? fetchCollectionItems(collection, state, startFrom)
			: fetchStateItems(state, startFrom);
		items.then(value => {
			if (!value.items || value?.items?.length === 0) {
				console.log("oopsie");
				setHasMore(false);
			} else {
				console.log("i am here");
				setIsLoading(false);
				setStateItems([...stateItems, ...value?.items]);
				setStartFrom(value.pagination.lowest - 1);
			}
		});
	};

	useEffect(() => {
		console.log(stateItems);
	}, [stateItems]);

	return (
		<CardWrapper>
			<InfiniteScroll
				pageStart={0}
				element={CardSectionContainer}
				loadMore={fetchData}
				hasMore={hasMore}
				threshold={500}
				loader={Array.from(
					{
						length:
							constants.EXPLORE_PAGINATION_LIMIT -
							(stateItems.length %
								constants.EXPLORE_PAGINATION_LIMIT),
					},
					(_, index) => (
						<LoaderCard className={index} key={index} />
					)
				)}
				getScrollParent={() => containerRef}
			>
				<Suspense>
					{stateItems.map((item, index) => (
						<Card key={index} data={item} isLoading={isLoading} />
					))}
				</Suspense>
			</InfiniteScroll>
		</CardWrapper>
	);
};

export default PaginatedCardsScroll;
