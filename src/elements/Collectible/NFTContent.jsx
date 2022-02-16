import React, { useContext, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { respondTo } from "@styles/styledMediaQuery";
import Plyr from "@elements/Default/Plyr";
import "@styles/plyr.css";
import { CSSTransition } from 'react-transition-group';
import { getCloudflareURL, getDwebURL } from "@utils/getIPFSURL";

const Container = styled.div`
	display: grid;
	place-items: center;
	user-select: none;
	${respondTo.md`
		grid-row: 1;
	`}
`

const blur = css`
	filter: blur(2rem) brightness(0.4);
	transform: scale(1.1);
	pointer-events: none;
`

const ImageContainer = styled.img`
	height: 100%;
    width: 100%;
	max-height: 80vh;
	/* background-image: url(${props => props.url && props.url});
	background-size:contain;
	background-repeat:no-repeat;
	background-position: center; */
	object-fit: contain;
	transition: filter 0.1s ease, transform 0.2s ease;
	${props => props.blur && blur}
	${respondTo.md`
		min-height: 16rem;
	`}
`

const WarningTextContainer = styled.div`
	--close-btn-dimension: 1.5rem;
	--warning-text: rgb(255 251 235);
	--warning-border: rgb(251 191 36);
	position: absolute;
	margin: 1rem;
	padding: 0.75rem 1rem;
	z-index:2;
	border-radius: 0.5rem;
	background-color: rgb(251 191 36 / 25%);
	font-weight: 500;
	border: solid 0.125rem var(--warning-border);
	color:var(--warning-text);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px, inset rgba(0, 0, 0, 0.0.05) 0px 10px 15px -3px, inset rgba(0, 0, 0, 0.025) 0px 4px 6px -2px;
	p{
		width: calc(100% - (2 * var(--close-btn-dimension)));
	}
	b{
		font-weight: 700;
	}
	svg{
		position: absolute;
		top:0;
		right: 0;
		margin:  0.75rem;
		cursor: pointer;
		fill: currentColor;
		height: var(--close-btn-dimension);
		width: var(--close-btn-dimension);
		margin-left: auto;
	}
`

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	max-height: 100%;
	overflow: hidden;
	display: grid;
    place-items: center;
`

const VideoWrapper = ImageWrapper

const center = css`
	display: grid;
	place - items: center;
	.plyr{
		border - radius: 0 0 0.25rem 0.25rem;
	}
`

const Content = styled.div`
	display: block;
	width: 100%;
	${respondTo.md`
		padding: 0;
	`}
`

const PlyrContainer = styled.div`
	width: 100%;
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
	transition: filter 0.1s ease, transform 0.2s ease;
	${props => props.blur && blur};
	${props => props.audio && center};
`

const PlyrCover = styled.div`
	background - image: url('${props => props.src && props.src}');
	background - repeat: no - repeat;
	background - size: cover;
	background - position: center;
	min-height: 24rem;
	min-width: 100%;
	border - radius: 0.25rem 0.25rem 0 0;
	${respondTo.md`
		min-height: 12rem;
	`}
`

const VideoContainer = ({ data, blur }) => {
	let type = data.mimetype.split("/")[0];
	const settings = useMemo(() => ({
		type: type,
		sources: [{
			src: getDwebURL(data.media)
		}]
	}), [data.media, type])
	const options = useMemo(() => ({
		controls: [
			'play',
			'progress',
			'current-time',
			'duration',
			'mute',
			'volume',
			'fullscreen'
		],
	}), [])
	return (
		<PlyrContainer blur={blur} audio={type === "audio"}>
			<Content>
				{type === "audio" && <PlyrCover src={getCloudflareURL(data.image)} />}
				{<Plyr
					source={settings}
					options={options}
				/>}
			</Content>
		</PlyrContainer>
	)
}

const CloseBtn = () => {
	return (
		<svg role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
	)
}

const WarningText = ({ isBlurred, setIsBlurred }) => {
	return (
		<CSSTransition
			in={isBlurred}
			timeout={300}
			classNames="warning"
			unmountOnExit
		>
			<WarningTextContainer>
				<div onClick={() => setIsBlurred(!isBlurred)} ><CloseBtn /></div>
				<p>This item isn't approved. If you're the creator and you've just minted it, please allow a few minutes for Sqwid to approve it.
					<b> Closing this warning will unblur this media for you!</b>
				</p>
			</WarningTextContainer>
		</CSSTransition>
	)
}

const NFTContent = () => {
	const { collectibleInfo } = useContext(CollectibleContext)
	const [isBlurred, setIsBlurred] = useState(!collectibleInfo.approved);

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
				<ImageWrapper title={collectibleInfo.meta.name}>
					<WarningText isBlurred={isBlurred} setIsBlurred={setIsBlurred} />
					<ImageContainer blur={isBlurred} src={getCloudflareURL(collectibleInfo.meta.media)} />
				</ImageWrapper>
			) : (
				<VideoWrapper>
					<WarningText isBlurred={isBlurred} setIsBlurred={setIsBlurred} />
					<VideoContainer blur={isBlurred} data={collectibleInfo.meta} />
				</VideoWrapper>
			)}
		</Container>
	)
}

export default React.memo(NFTContent)
