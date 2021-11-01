import React,{ useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Container = styled.div``

const Property = styled(m.div)`

`

const PropertiesSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			{collectibleInfo.properties.map(( item,index ) => {
				
			})}
		</Container>
	)
}

export default PropertiesSection
