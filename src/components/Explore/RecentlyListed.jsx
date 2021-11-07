import React, { Suspense } from "react";
import styled from "styled-components";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
const Card = React.lazy(()=>import("@elements/Default/Card"));
const Container = styled.div`
	width: 100%;
`

const Header = styled.h1`
	font-weight: 900;
`

const RecentlyListed = ({ items }) => {
	return (
		<Container>
			<Header>Recently Listed 📃</Header>
			<CardSectionContainer>
				<Suspense>
					{items.map((item,index)=>(
						<Card
							key={index}
							data={item}
						/>
					))}
				</Suspense>
			</CardSectionContainer>
		</Container>
	)
}

export default RecentlyListed