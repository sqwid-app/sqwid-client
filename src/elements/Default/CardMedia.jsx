import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
	position: relative;
	height: 16rem;
	width: 100%;
	display: flex;
	justify-content:center;
	border-radius: 0.25rem 0.25rem 0 0;
	overflow:hidden;
	&:hover {
		img{
			transform: scale(1.1);
		}
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('${props=>props.url&&props.url}');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
		filter: blur(3px) brightness(0.5) saturate(30%);
	}
`

const Image = styled.img`
	position:relative;
	max-height: 100%;
	max-width: 100%;
	height: auto;
	object-fit: cover;
	transition: transform 0.5s cubic-bezier(0.18, 0.86, 0.34, 1.02);
`

const VideoContainer = styled.div`
	position:relative;
	height: 16rem;
	width: 100%;
	text-align: center;
	object-fit: cover;
	border-radius: 0.5rem;
	overflow: hidden;
	& video{
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
		object-position: center;
	}
	&:before{
		content:"▶";
		font-weight: 900;
		display: grid;
		place-items:center;
		font-size: 1.25rem;
		color:white;
		top:-1.5rem;
		left:-1.5rem;
		height: 2rem;
		width: 2rem;
		border-radius: 1000rem;
		position:absolute;
		background:rgba(0,0,0,0.2);
		box-shadow: 0 0 50px 50px rgba(0,0,0,0.2);
		color: var(--app-text);
		padding: 1.5rem 2rem 2rem 1.25rem;
		margin: 1rem;
		opacity:${props=>!props.playing?1:0};
		transition: opacity 0.2s linear;
	}
`;

const VideoCard = ({ url }) => {
	const videoRef = useRef();
	//eslint-disable-next-line
	const [videoLoading, setVideoLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const togglePlay = () => setIsPlaying(!isPlaying);
	useEffect(() => {
		isPlaying ? videoRef.current.play() : videoRef.current.pause();
	}, [isPlaying]);
	return (
		<VideoContainer playing={isPlaying} onMouseEnter={togglePlay} onMouseLeave={togglePlay}>
			<video
			ref={videoRef}
			loop
			muted
			preload="auto"
			onLoadedData={() => setVideoLoading(false)}
			>
			<source
				src={url}
				type="video/mp4"
			/>
			Your browser does not support the video tag.
			</video>
		</VideoContainer>
	)
}

const ImageCard = ({ url }) => {
	return (
		<ImageContainer url={url}>
			<Image src={url}/>
		</ImageContainer>
	)
}

const CardMedia = ({ media }) => {
	//eslint-disable-next-line
	const { url, type } = media
	return (
		<>
			{type.startsWith("image")?(
				<ImageCard url={url}/>
			):(
				<VideoCard url={url}/>
			)}
		</>
	)
}

export default CardMedia
