import Card from "@elements/Create/Unwrap/Card";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SimpleBarReact from "simplebar-react";

const SimpleBarContainer = styled(SimpleBarReact)`
	overflow-y: auto;
	width: 100%;
	height: 85%;
`

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill,minmax(0,14rem));
	width: 100%;
	justify-content: space-around;
	padding: 1.5rem 1.25rem;
	grid-gap: 2rem 1rem;
`

const UnwrapSection = () => {
	const [cards, setCards] = useState([]);
	useEffect(() => {
		setCards([{
			id: 0,
			name: "Card 1",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 1,
			name: "Card with a really big name",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 2,
			name: "smol",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 3,
			name: "Amazing Card",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 4,
			name: "Im running out of names",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 5,
			name: "yes",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 0,
			name: "Card 1",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 1,
			name: "Card with a really big name",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 2,
			name: "smol",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 3,
			name: "Amazing Card",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 4,
			name: "Im running out of names",
			image: "https://images.unsplash.com/photo-1639762773242-17d38bdb79f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		},{
			id: 5,
			name: "yes",
			image: "https://images.unsplash.com/photo-1639793677434-b7c29536388a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
		}])
	},[])
	return (
		<SimpleBarContainer>
			<Wrapper>
				{cards.map((card, index) => (
					<Card {...card} />
				))}
			</Wrapper>
		</SimpleBarContainer>
	)
}

export default UnwrapSection
