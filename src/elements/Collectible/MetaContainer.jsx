import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { clamp } from "@utils/textUtils";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-weight: 900;
	font-size: 2.5rem;
`

const Description = styled.h3`
	margin-top:1rem;
	font-weight: 800;
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
`

const MetaContainer = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			<Title>{collectibleInfo.title}</Title>
			<label title={(collectibleInfo.description.length>196)?collectibleInfo.description:""}>
				<Description>{clamp(collectibleInfo.description,196)}</Description>
			</label>
		</Container>
	)
}

export default MetaContainer
