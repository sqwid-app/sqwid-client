import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import ReactPaginate from "react-paginate";
import {
	fetchCollectionItems,
	fetchStateItems,
	fetchUserItems,
} from "@utils/marketplace";
import LoadingIcon from "@static/svg/LoadingIcon";
import constants from "@utils/constants";

const StyledReactPaginate = styled(ReactPaginate).attrs({
	activeClassName: "active",
})`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding-right: 2.5rem;
	list-style-type: none;
	li a {
		height: 2rem;
		width: 2rem;
		display: grid;
		place-items: center;
		cursor: pointer;
		color: var(--app-container-text-primary-hover);
		border-radius: 0.5rem;
		font-weight: 900;
		border: transparent 0.1rem solid;
		user-select: none;
	}
	li.previous a,
	li.next a {
		border-color: transparent;
		color: var(--app-theme-primary);
	}
	li.active a {
		border: var(--app-theme-primary) 0.1rem solid;
		border-color: ;
		color: var(--app-theme-primary);
	}
	li.disabled a {
		color: var(--app-container-text-primary);
	}
	li.disable,
	li.disabled a {
		cursor: default;
	}
`;

const SVG = styled.svg`
	width: 1.25rem;
	height: 1.25rem;
	fill: currentColor;
	path {
		border-radius: 0.25rem;
	}
`;

const NextIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
		</SVG>
	);
};

const PreviousIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
		</SVG>
	);
};

const Items = ({ currentItems, isLoading, Card }) => {
	return (
		<>
			{currentItems?.map((item, index) => (
				<Card key={index} data={item} isLoading={isLoading} />
			))}
		</>
	);
};

const BreakIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
		</SVG>
	);
};

const LoadingContainer = styled.div`
	height: 70vh;
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

const PaginatedCards = ({ Card, state, profile, collection }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isCardLoading, setIsCardLoading] = useState(true);
	const [stateItems, setStateItems] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const items = profile
				? await fetchUserItems(profile, state)
				: collection
				? await fetchCollectionItems(collection, state)
				: await fetchStateItems(state);
			setStateItems(items);
			setIsLoading(false);
			setIsCardLoading(false);
		};
		fetchData();
		//eslint-disable-next-line
	}, []);
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		stateItems.pagination &&
			setPageCount(
				Math.ceil(
					stateItems.pagination.totalItems /
						stateItems.pagination.perPage
				)
			);
		//eslint-disable-next-line
	}, [stateItems.pagination]);

	const handlePageClick = event => {
		const fetchData = async () => {
			setIsCardLoading(true);
			const items = profile
				? await fetchUserItems(profile, state, event.selected + 1)
				: collection
				? await fetchCollectionItems(
						collection,
						state,
						event.selected + 1
				  )
				: await fetchStateItems(state, event.selected + 1);
			setStateItems(items);
			setIsCardLoading(false);
		};
		fetchData();
	};
	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<>
					{stateItems?.items?.length === 0 ? (
						<EmptySection state={state} />
					) : (
						<>
							<CardSectionContainer>
								<Suspense>
									<Items
										currentItems={stateItems.items}
										isLoading={isCardLoading}
										Card={Card}
									/>
								</Suspense>
							</CardSectionContainer>
							{pageCount > 1 && (
								<StyledReactPaginate
									breakLabel={<BreakIcon />}
									nextLabel={<NextIcon />}
									onPageChange={handlePageClick}
									pageRangeDisplayed={5}
									pageCount={pageCount}
									previousLabel={<PreviousIcon />}
									renderOnZeroPageCount={null}
								/>
							)}
						</>
					)}
				</>
			)}
		</>
	);
};

export default PaginatedCards;
