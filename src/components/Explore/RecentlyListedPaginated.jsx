import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import ReactPaginate from 'react-paginate';
const Card = React.lazy(() => import("@elements/Default/Card"));

const Container = styled.div`
	width: 100%;
`

const Header = styled.h1`
	font-weight: 900;
`

const StyledReactPaginate = styled(ReactPaginate).attrs({
	activeClassName: 'active',
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
		place-items:center;
		cursor: pointer;
		color: var(--app-container-text-primary-hover);
		border-radius: 0.5rem;
		font-weight: 900;
		border: transparent 0.1rem solid;
		user-select: none;

	}
	li.previous a,
	li.next a,
	li.break a {
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
	path{
		border-radius: 0.25rem;
	}
`

const Items = ({ currentItems }) => {
	return (
		<>
			{currentItems?.map((item, index) => (
				<Card
					key={index}
					data={item}
				/>
			))}
		</>
	);
}

const NextIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
		</SVG>
	)
}

const PreviousIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path>
		</SVG>
	)
}

const BreakIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
		</SVG>
	)
}

const PaginatedItems = ({ itemsPerPage, items }) => {
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		setCurrentItems(items.slice(itemOffset, itemOffset + itemsPerPage));
		setPageCount(Math.ceil(items.length / itemsPerPage));
	//eslint-disable-next-line
	}, [itemOffset, itemsPerPage]);

	const handlePageClick = (event) => {
		setItemOffset((event.selected * itemsPerPage) % items.length);
	};

	return (
		<>
			<CardSectionContainer>
				<Suspense>
					<Items currentItems={currentItems} />
				</Suspense>
			</CardSectionContainer>
			<StyledReactPaginate
				breakLabel={<BreakIcon/>}
				nextLabel={<NextIcon/>}
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel={<PreviousIcon/>}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}


const RecentlyListedPaginated = ({ items }) => {
	return (
		<Container>
			<Header>Recently Listed <span className="emoji">📃</span></Header>
			<PaginatedItems itemsPerPage={8} items={items} />
		</Container>
	)
}

export default RecentlyListedPaginated