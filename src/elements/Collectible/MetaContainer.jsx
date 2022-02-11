import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { clamp } from "@utils/textUtils";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 100%;
`

const TitleContainer = styled.div`
	span{
		display: inline-block;
		font-weight: 900;
		font-size: 1.5rem;
		margin-left: 1rem;
		color: var(--app-container-text-primary);
		&.cross{
			padding: 0 1rem;
		}
	}
`

const Title = styled.h1`
	font-weight: 900;
	font-size: 2.5rem;
	max-width: 45rem;
	word-break: break-word;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

const Description = styled.h3`
	margin-top:0.5rem;
	font-weight: 800;
	font-size: 1rem;
	max-width: 45rem;
	word-break: break-all;
	color: var(--app-container-text-primary-hover);
`

const MetaContainer = () => {
	const { collectibleInfo } = useContext(CollectibleContext)

	return (
		<Container>
			<TitleContainer><Title title={collectibleInfo.meta.name}>{collectibleInfo.meta.name}<span>×{collectibleInfo.amount}</span></Title></TitleContainer>
			<label title={(collectibleInfo.meta.description.length > 196) ? collectibleInfo.meta.description : ""}>
				<Description>{clamp(collectibleInfo.meta.description, 196)}</Description>
			</label>
		</Container>
	)
}

export default MetaContainer
