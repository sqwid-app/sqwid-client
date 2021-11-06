import React, { useContext } from "react";
import styled, { css } from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import Plyr from "plyr-react";
import "@styles/plyr.css";

const Container = styled.div`
	flex:1;
`

const ImageContainer = styled.div`
	height: 100%;
	background-image: url(${props=>props.url&&props.url});
	background-size:contain;
	background-repeat:no-repeat;
	background-position: center;
	object-fit: contain;
    max-width: 100%;
	${respondTo.md`
		min-height: 16rem;
	`}
`

const center = css`
	display: grid;
	place-items:center;
`

const PlyrContainer = styled.div`
	height: 100%;
	${props=>props.audio&&center};
`

const VideoContainer = ({ data }) => {
	let type = data.type.split("/")[0];
	const settings = {
		type: type,
		sources: [{
			src: data.url
		}]
	}
	return (
		<PlyrContainer audio={type==="audio"}>
			<Plyr
				source={settings}
			/>
		</PlyrContainer>
	)
}

const NFTContent = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	// const test={
	// 	media:{
	// 		type:"video/mp4",
	// 		url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
	// 	}
	// }
	return (
		<Container>
			{collectibleInfo.media?.type.startsWith("image")?(
				<label title={collectibleInfo.title}>
					<ImageContainer url={collectibleInfo.media.url}/>
				</label>
			):(
				<>
					<VideoContainer data={collectibleInfo.media}/>
				</>
			)}
		</Container>
	)
}

export default React.memo(NFTContent)
