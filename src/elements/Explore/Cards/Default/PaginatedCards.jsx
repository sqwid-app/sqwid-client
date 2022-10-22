import React, {
	Suspense,
	useCallback,
	// useContext,
	useEffect,
	useRef,
	useState,
} from "react";
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
import { useContext } from "react";
import FilterContext from "@contexts/Filter/FilterContext";
// import FilterContext from "@contexts/Filter/FilterContext";

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

// eslint-disable-next-line
const PaginatedCardsScroll = ({ Card, state, profile, collection, filter }) => {
	const loaderRef = useRef();
	const [startFrom, setStartFrom] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isCardLoading, setIsCardLoading] = useState(true);
	const [stateItems, setStateItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const { isVisible } = useOnScreen(loaderRef);
	const [isFirstFetch, setIsFirstFetch] = useState(true);

	const fetchData = useCallback(async () => {
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
			setIsFetching(false);
			return;
		}
		setStateItems([...stateItems, ...items?.items]);
		if (items.items.length < constants.EXPLORE_PAGINATION_LIMIT) {
			setIsLoading(false);
			setIsCardLoading(false);
			setIsFinished(true);
			setIsFetching(false);
			return;
		}
		setIsLoading(false);
		setIsCardLoading(false);
		setStartFrom(items.pagination.lowest - 1);
		setIsFetching(false);
		return;
		//eslint-disable-next-line
	}, [startFrom]);

	useEffect(() => {
		const getItems = async () => {
			if ((isFirstFetch && !isFetching) || (isVisible && !isFetching && !isFirstFetch)) {
				await fetchData();
				if (isFirstFetch) {
					setIsFirstFetch(false);
				}
			}
		};
		getItems();
		// eslint-disable-next-line
	}, [isVisible]);

	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Suspense fallback={<></>}>
					{stateItems?.length === 0 ? (
						<EmptySection state={state} />
					) : (
						<>
							<CardSectionContainer>
								<>
									{stateItems.map((item, index) => (
										<Card
											key={index}
											data={item}
											isLoading={isCardLoading}
										/>
									))}
								</>
							</CardSectionContainer>
						</>
					)}
				</Suspense>
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

const NewPaginatedCardsScroll = ({ Card, state, profile, collection }) => {
	const loaderRef = useRef();
	const [startFrom, setStartFrom] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isCardLoading, setIsCardLoading] = useState(true);
	const [stateItems, setStateItems] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const { isVisible } = useOnScreen(loaderRef);
	const [isFirstFetch, setIsFirstFetch] = useState(true);
	const [shouldReset, setShouldReset] = useState(false);
	const { filterDetails } = useContext (FilterContext);
	const [filterQuery, setFilterQuery] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			setIsFetching(true);
			const query = filterDetails?.filter (item => item.selected).map (item => `traits[${item.trait}]=${item.option}`).join ('&');

			const items = profile
				? await fetchUserItems(profile, state, sFrom)
				: collection
				? await fetchCollectionItems(collection, state, sFrom, query)
				: await fetchStateItems(state, sFrom);
				
			if (shouldReset) {
				setStateItems(items.items || []);
			} else {
				setStateItems([...stateItems, ...items?.items]);
			}
			if (!items.items || items?.items?.length === 0) {
				setIsLoading(false);
				setIsCardLoading(false);
				setIsFinished(true);
				setIsFetching(false);
				setShouldReset(false);
				return;
			} else {
				setIsFinished (false);
			}
			if (items.items.length < constants.EXPLORE_PAGINATION_LIMIT) {
				setIsLoading(false);
				setIsCardLoading(false);
				setIsFinished(true);
				setIsFetching(false);
				setShouldReset(false);
				return;
			} else {
				setIsFinished (false);
			}
			setIsLoading(false);
			setIsCardLoading(false);
			setStartFrom(items.pagination.lowest - 1);
			setIsFetching(false);
			setShouldReset(false);
			setIsFinished(false);
			return;
		}

		const sFrom = shouldReset ? 0 : startFrom;

		if (isFinished && !shouldReset) return;

		// console.log ('is first fetch', isFirstFetch, '\nis fetching', isFetching, '\nis visible', isVisible, '\nshould reset', shouldReset);

		if (
			(isFirstFetch && !isFetching && isVisible) ||
			(isVisible && !isFetching && !isFirstFetch) ||
			(shouldReset && !isFetching && !isFirstFetch)
		) {
			setStartFrom(sFrom);
			if (isFirstFetch) {
				setIsFirstFetch(false);
			}
			fetchData ();
		}
		// eslint-disable-next-line
	}, [shouldReset, isVisible]);

	useEffect(() => {
		const query = filterDetails?.filter (item => item.selected).map (item => `traits[${item.trait}]=${item.option}`).join ('&');
		if (query !== filterQuery && query !== undefined) {
			setFilterQuery(query);
			setShouldReset(true);
		}
	} , [filterDetails, filterQuery]);

	// const fetchData = useCallback(async () => {
	// 	setIsFetching(true);
	// 	const items = profile
	// 		? await fetchUserItems(profile, state, startFrom)
	// 		: collection
	// 		? await fetchCollectionItems(collection, state, startFrom)
	// 		: await fetchStateItems(state, startFrom);

	// 	if (!items.items || items?.items?.length === 0) {
	// 		setIsLoading(false);
	// 		setIsCardLoading(false);
	// 		setIsFinished(true);
	// 		setIsFetching(false);
	// 		return;
	// 	}
	// 	setStateItems([...stateItems, ...items?.items]);
	// 	if (items.items.length < constants.EXPLORE_PAGINATION_LIMIT) {
	// 		setIsLoading(false);
	// 		setIsCardLoading(false);
	// 		setIsFinished(true);
	// 		setIsFetching(false);
	// 		return;
	// 	}
	// 	setIsLoading(false);
	// 	setIsCardLoading(false);
	// 	setStartFrom(items.pagination.lowest - 1);
	// 	setIsFetching(false);
	// 	return;
	// 	//eslint-disable-next-line
	// }, [startFrom]);

	// useEffect(() => {
	// 	const getItems = async () => {
	// 		if ((isFirstFetch && !isFetching) || (isVisible && !isFetching && !isFirstFetch)) {
	// 			await fetchData();
	// 			if (isFirstFetch) {
	// 				setIsFirstFetch(false);
	// 			}
	// 		}
	// 	};
	// 	getItems();
	// 	// eslint-disable-next-line
	// }, [isVisible]);

	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Suspense fallback={<></>}>
					{stateItems?.length === 0 ? (
						<EmptySection state={state} />
					) : (
						<>
							<CardSectionContainer>
								<>
									{stateItems.map((item, index) => (
										<Card
											key={index}
											data={item}
											isLoading={isCardLoading}
										/>
									))}
								</>
							</CardSectionContainer>
						</>
					)}
				</Suspense>
			)}
			{/* {!isFinished ? ( */}
				<LoadMoreContainer
					style={{ visibility: isLoading || isFinished ? "hidden" : "visible" }}
					ref={loaderRef}
				>
					<span>🌊 the tide is rising</span>{" "}
					<FadeLoaderIcon size={24} />
				</LoadMoreContainer>
			{/* ) : null} */}
		</>
	);
};

export default NewPaginatedCardsScroll;
