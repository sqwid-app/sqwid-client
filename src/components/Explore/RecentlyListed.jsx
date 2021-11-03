import React from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
`

const Header = styled.h1`
	font-weight: 900;
`

const RecentlyListed = () => {
	return (
		<Container>
			<Header>Recently Listed 📃</Header>
		</Container>
	)
}

export default RecentlyListed