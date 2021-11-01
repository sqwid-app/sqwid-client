import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import MetaContainer from "./MetaContainer";
import InfoContainer from "./InfoContainer";
import PropertiesSection from "./PropertiesSection";
import TransactionSection from "./TransactionSection";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1rem 0;
`

const InfoContent = () => {
	//eslint-disable-next-line
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			<MetaContainer/>
			<InfoContainer/>
			<PropertiesSection/>
			<TransactionSection/>
		</Container>
	)
}

export default InfoContent
