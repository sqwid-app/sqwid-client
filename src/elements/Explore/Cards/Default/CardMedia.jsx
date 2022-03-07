import MusicIcon from "@static/svg/MusicIcon";
import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import LoadingIcon from "@static/svg/LoadingIcon";
import { getCloudflareURL, getDwebURL } from "@utils/getIPFSURL";
import { Link } from "react-router-dom";

const audioOverlay = css`
	content: "";
	position: absolute;
	top: -2rem;
	left: -2rem;
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='white' width='24' height='24'%3E%3Ctitle%3EMusical Notes%3C/title%3E%3Cpath d='M421.84 37.37a25.86 25.86 0 00-22.6-4.46L199.92 86.49A32.3 32.3 0 00176 118v226c0 6.74-4.36 12.56-11.11 14.83l-.12.05-52 18C92.88 383.53 80 402 80 423.91a55.54 55.54 0 0023.23 45.63A54.78 54.78 0 00135.34 480a55.82 55.82 0 0017.75-2.93l.38-.13 21.84-7.94A47.84 47.84 0 00208 423.91v-212c0-7.29 4.77-13.21 12.16-15.07l.21-.06L395 150.14a4 4 0 015 3.86v141.93c0 6.75-4.25 12.38-11.11 14.68l-.25.09-50.89 18.11A49.09 49.09 0 00304 375.92a55.67 55.67 0 0023.23 45.8 54.63 54.63 0 0049.88 7.35l.36-.12 21.84-7.95A47.83 47.83 0 00432 375.92V58a25.74 25.74 0 00-10.16-20.63z'/%3E%3C/svg%3E"),
		rgba(0, 0, 0, 0.2);
	background-repeat: no-repeat;
	background-position: center;
	box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.2);
	padding: 2rem;
	margin: 1rem;
	opacity: 1;
	transition: opacity 0.2s ease;
`;

const ImageContainer = styled(Link)`
	position: relative;
	height: 16rem;
	width: 100%;
	display: flex;
	justify-content:center;
	border-radius: 0.25rem 0.25rem 0 0;
	overflow:hidden;
	z-index:2;
	&:hover {
		img{
			transform: scale(1.1);
		}
		&:after{
			opacity:0;
		}
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('${props => props.url && props.url}');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100%;
		filter: blur(3px) brightness(0.5) saturate(30%);
	}
	&:after{
		${props => props.audio && audioOverlay}};
	}
`;

const Image = styled.img`
	position: relative;
	max-height: 100%;
	max-width: 100%;
	height: auto;
	object-fit: cover;
	transition: transform 0.5s cubic-bezier(0.18, 0.86, 0.34, 1.02);
`;

const videoOverlay = css`
	content: "";
	position: absolute;
	top: -2rem;
	left: -2rem;
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512' fill='white' width='24' height='24'%3E%3Ctitle%3EPlay%3C/title%3E%3Cpath d='M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z'/%3E%3C/svg%3E"),
		rgba(0, 0, 0, 0.2);
	background-repeat: no-repeat;
	background-position: center;
	box-shadow: 0 0 50px 50px rgba(0, 0, 0, 0.2);
	padding: 2rem;
	margin: 1rem;
`;

const VideoContainer = styled(Link)`
	position: relative;
	height: 16rem;
	width: 100%;
	text-align: center;
	object-fit: cover;
	overflow: hidden;
	z-index: 2;
	& video {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover;
		object-position: center;
		border-radius: 0.25rem 0.25rem 0 0;
	}
	&:before {
		${videoOverlay}
		opacity:${props => (!props.playing ? 1 : 0)};
		transition: opacity 0.2s linear;
	}
`;

const AudioIcon = styled.div`
	position: absolute;
	top: -1.5rem;
	left: -1.5rem;
	height: 2rem;
	width: 2rem;
	background: red;
`;

const skeletonAnim = keyframes`
	0%{
		background-position: -150% 0;
	}
	100%{
		background-position: 350% 0;
	}
`;

const LoaderContainer = styled.div`
	position: relative;
	height: 16rem;
	width: 100%;
	display: flex;
	justify-content: center;
	border-radius: 0.25rem 0.25rem 0 0;
	overflow: hidden;
	background-size: 200% 100%;
	background-position: -150% 0;
	background-repeat: no-repeat;
	color: var(--app-container-text-primary);
	background-image: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0,
		rgba(17, 19, 34, 0.5) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	animation: ${skeletonAnim} 1.2s infinite 0.6s;
`;

const VideoCard = ({ url, isLoading, to }) => {
	const videoRef = useRef();
	const [videoLoading, setVideoLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const togglePlay = () => setIsPlaying(!isPlaying);
	const previousUrl = useRef(url);
	useEffect(() => {
		isLoading ? setVideoLoading(true) : setVideoLoading(false);
	}, [isLoading]);
	useEffect(() => {
		url
			? !(videoRef.current.readyState >= 3) && setVideoLoading(true)
			: setVideoLoading(false);
		if (previousUrl.current === url) {
			return;
		}

		videoRef.current && videoRef.current.load();

		previousUrl.current = url;
	}, [url]);
	useEffect(() => {
		isPlaying ? videoRef.current.play() : videoRef.current.pause();
	}, [isPlaying]);
	return (
		<>
			<LoaderContainer style={{ display: !videoLoading && "none" }}>
				<LoadingIcon size="48" />
			</LoaderContainer>
			<VideoContainer
				to={to}
				style={{ display: videoLoading && "none" }}
				playing={isPlaying}
				onMouseEnter={togglePlay}
				onMouseLeave={togglePlay}
				onTouchStart={togglePlay}
				onTouchEnd={togglePlay}
			>
				<video
					ref={videoRef}
					loop
					muted
					preload="auto"
					onLoadedData={() => setVideoLoading(false)}
				>
					<source src={url} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</VideoContainer>
		</>
	);
};

const ImageCard = ({ url, isLoading, to }) => {
	const [loading, setLoading] = useState(false);
	const imageRef = useRef();
	useEffect(() => {
		isLoading ? setLoading(true) : setLoading(false);
	}, [isLoading]);

	return (
		<>
			<LoaderContainer style={{ display: !loading ? "none" : "flex" }}>
				<LoadingIcon size="48" />
			</LoaderContainer>
			<ImageContainer
				to={to}
				style={{ display: loading ? "none" : "flex" }}
				url={url}
			>
				<Image ref={imageRef} src={url} loading="lazy" />
			</ImageContainer>
		</>
	);
};

const AudioCard = ({ image, isLoading }) => {
	return (
		<ImageContainer url={image} audio>
			<AudioIcon>
				<MusicIcon />
			</AudioIcon>
			<Image src={image} loading="lazy" />
		</ImageContainer>
	);
};

const CardMedia = ({ meta, isLoading, to }) => {
	//eslint-disable-next-line
	const { image, media, mimetype } = meta;
	return (
		<>
			{
				{
					image: (
						<ImageCard
							to={to}
							isLoading={isLoading}
							url={getCloudflareURL(media)}
						/>
					),
					video: (
						<VideoCard
							to={to}
							isLoading={isLoading}
							url={getDwebURL(media)}
						/>
					),
					audio: (
						<AudioCard
							isLoading={isLoading}
							image={getDwebURL(image)}
						/>
					),
				}[mimetype.split("/")[0]]
			}
		</>
	);
};

export default CardMedia;
