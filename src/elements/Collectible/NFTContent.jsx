import React, { useContext } from "react";
import styled from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";

const Container = styled.div``

const ImageContainer = styled.div`
	height: 100%;
	background-image: url(${props=>props.url&&props.url});
	background-size:contain;
	background-repeat:no-repeat;
	background-position: center;
	object-fit: contain;
    max-width: 100%;
`

const NFTContent = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	return (
		<Container>
			<label title={collectibleInfo.title}><ImageContainer url={collectibleInfo.contentURL}/></label>
		</Container>
	)
}

export default NFTContent
