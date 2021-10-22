import React from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";

const Wrapper = styled.div`
	position: relative;
	margin-top: 25%;
	padding-top: 0.5rem;
	padding-left: 2rem;
	flex:1;
`

const Container = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	padding: 1.5rem 0.75rem;
	gap: 1rem;
`

const Title = styled.h1`
	font-weight: 800;
	font-size: 2rem;
`

const CollectionsSection = () => {
	const cards = [{
		src:"https://images.unsplash.com/photo-1634337256330-aae44dc7b8f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1964&q=80",
		title:"You've got",
		link:"/"
	},{
		src:"https://images.unsplash.com/photo-1634840150834-f6d4544f5b9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1927&q=80",
		title:"A friend",
		link:"/"
	},{
		src:"https://images.unsplash.com/photo-1634819875292-83e02980a99b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
		title:"In me",
		link:"/"
	}]
	return (
		<Wrapper>
			<Title>Collections</Title>
			<Container>
				{cards.map((item,index)=>(
					<CollectionCard key={index} {...item} fullHeight={index===0&&true}/>
				))}
			</Container>
		</Wrapper>
	)
}

export default CollectionsSection
