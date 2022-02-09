import React, { useContext } from "react";
import styled, { css } from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import Plyr from "plyr-react";
import "@styles/plyr.css";
import { getCloudflareURL, getDwebURL } from "@utils/getIPFSURL";

const Container = styled.div`
	flex:1;
	${respondTo.md`
		flex: none;
	`}
`

const ImageContainer = styled.div`
	height: 100%;
	background-image: url(${props => props.url && props.url});
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
	.plyr{
		border-radius: 0 0 0.25rem 0.25rem;
	}
`

const Content = styled.div`
	display: block;
	padding: 0 2rem;
    width: 100%;
	${respondTo.md`
		padding: 0;
	`}
`

const PlyrContainer = styled.div`
	height: 100%;
	display: grid;
    place-items: center;
	.plyr{
		height: ${props => props.audio ? `auto` : `100%`};
		border-radius: 0.25rem;
		video{
			max-height: 65vh;
		}
	}
	.plyr:-webkit-full-screen{
		video{
			max-height: 100%;
		}
	}
	${props => props.audio && center};
`

const PlyrCover = styled.div`
	background-image: url('${props => props.src && props.src}');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	min-height: 24rem;
	min-width: 100%;
	border-radius: 0.25rem 0.25rem 0 0;
	${respondTo.md`
		min-height: 12rem;
	`}
`

const VideoContainer = React.memo(({ data }) => {
	let type = data.mimetype.split("/")[0];
	const settings = {
		type: type,
		sources: [{
			src: getDwebURL(data.media)
		}]
	}
	const options = {
		controls: [
			'play',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'fullscreen'
		],
	}
	return (
		<PlyrContainer audio={type === "audio"}>
			<Content>
				{type === "audio" && <PlyrCover src={getCloudflareURL(data.image)} />}
				<Plyr
					source={settings}
					options={options}
				/>
			</Content>
		</PlyrContainer>
	)
})

const NFTContent = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	/*
	Couldn't be arsed to change the value every time so two constants 👍

	const test={
		media:{
			type:"audio/mp3",
			url:"https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
		}
	}
	const test={
		media:{
			type:"video/mp4",
			url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
		}
	}
	*/
	return (
		<Container>
			{collectibleInfo.meta?.mimetype.startsWith("image") ? (
				<label title={collectibleInfo.meta.name}>
					<ImageContainer url={getCloudflareURL(collectibleInfo.meta.media)} />
				</label>
			) : (
				<>
					<VideoContainer data={collectibleInfo.meta} />
				</>
			)}
		</Container>
	)
}

export default React.memo(NFTContent)
