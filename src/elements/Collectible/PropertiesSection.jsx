import React,{ useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
//eslint-disable-next-line
import { LazyMotion, domAnimation, m } from "framer-motion";

const Container = styled.div``

//eslint-disable-next-line
const Property = styled(m.div)`

`

const PropertiesSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			{/* eslint-disable-next-line */}
			{collectibleInfo.properties.map(( item,index ) => {

			})}
		</Container>
	)
}

export default PropertiesSection
