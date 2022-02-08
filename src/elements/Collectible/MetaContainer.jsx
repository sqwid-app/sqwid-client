import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { clamp } from "@utils/textUtils";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-weight: 900;
	font-size: 2.5rem;
	width: 100%;
	label{
		word-break: break-all;
	}
	span{
		display: inline-block;
		vertical-align: baseline;
		font-size: 2rem;
		color: var(--app-container-text-primary);
	}
`

const Description = styled.h3`
	margin-top:0.5rem;
	font-weight: 800;
	font-size: 1rem;
	color: var(--app-container-text-primary-hover);
`

const MetaContainer = () => {
	const { collectibleInfo } = useContext(CollectibleContext)

	return (
		<Container>
			<Title>{collectibleInfo.meta.name}</Title>
			<label title={(collectibleInfo.meta.description.length > 196) ? collectibleInfo.meta.description : ""}>
				<Description>{clamp(collectibleInfo.meta.description, 196)}</Description>
			</label>
		</Container>
	)
}

export default MetaContainer
