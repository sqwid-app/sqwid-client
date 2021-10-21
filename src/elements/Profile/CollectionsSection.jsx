import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	margin-top: 25%;
	padding-top: 0.5rem;
	padding-left: 2rem;
	flex:1;
`

const Container = styled.div`
	padding: 1rem 0.75rem;
`

const Title = styled.h1`
	font-weight: 800;
	font-size: 2rem;
`

const CollectionsSection = () => {
	return (
		<Wrapper>
			<Title>Collections</Title>
			<Container>
				ok👍
			</Container>
		</Wrapper>
	)
}

export default CollectionsSection
