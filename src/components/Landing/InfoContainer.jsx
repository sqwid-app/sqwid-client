import constants from "@utils/constants";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: 2rem;
	line-height: 1.125;
	gap: 2rem;
	h1{
		font-weight: 900;
		font-size: 8rem;
	}
	h2{
		font-weight: 500;
		font-size: 2rem;
		margin-right: 8rem;
	}
`

const InfoContainer = () => {
	return (
		<Wrapper>
			<h1>{constants.APP_NAME}</h1>
			<h2>DeFi & Cross-chain Interoperability and other crypto/NFT buzzwords here</h2>
		</Wrapper>
	)
}

export default InfoContainer
