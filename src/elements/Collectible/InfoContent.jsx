import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import MetaContainer from "./MetaContainer";
import InfoContainer from "./InfoContainer";
import TransactionSection from "./TransactionSection";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0;
	gap: 1rem;
`

const InfoContent = () => {
	//eslint-disable-next-line
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			<MetaContainer/>
			<InfoContainer/>
			<TransactionSection/>
		</Container>
	)
}

export default InfoContent
