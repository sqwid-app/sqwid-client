import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import ReactPaginate from "react-paginate";
import { fetchStateItems } from "@utils/marketplace";
import LoadingIcon from "@static/svg/LoadingIcon";
const SalesCard = React.lazy(() =>
	import("@elements/Explore/Cards/Sales/SalesCard")
);

const Container = styled.div`
	width: 100%;
`;

const Header = styled.h1`
	font-weight: 900;
`;

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

const Items = ({ currentItems, isLoading }) => {
	return (
		<>
			{currentItems?.map((item, index) => (
				<SalesCard key={index} data={item} isLoading={isLoading} />
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

const RecentlyListedPaginated = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isCardLoading, setIsCardLoading] = useState(true);
	const [salesItems, setSalesItems] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const items = await fetchStateItems(1);
			setSalesItems(items);
			setIsLoading(false);
			setIsCardLoading(false);
		};
		fetchData();
	}, []);
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		salesItems.pagination &&
			setPageCount(
				Math.ceil(
					salesItems.pagination.totalItems /
						salesItems.pagination.perPage
				)
			);
		//eslint-disable-next-line
	}, [salesItems.pagination]);

	const handlePageClick = event => {
		setIsCardLoading(true);
		const fetchData = async () => {
			const items = await fetchStateItems(1, event.selected + 1);
			setSalesItems(items);
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
				<Container>
					<Header>
						Sales <span className="emoji">📃</span>
					</Header>
					<CardSectionContainer>
						<Suspense>
							<Items
								currentItems={salesItems.items}
								isLoading={isCardLoading}
							/>
						</Suspense>
					</CardSectionContainer>
					<StyledReactPaginate
						breakLabel={<BreakIcon />}
						nextLabel={<NextIcon />}
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel={<PreviousIcon />}
						renderOnZeroPageCount={null}
					/>
				</Container>
			)}
		</>
	);
};

export default RecentlyListedPaginated;
