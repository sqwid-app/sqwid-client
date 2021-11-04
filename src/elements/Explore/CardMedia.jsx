import React from "react";
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

const CardMedia = ({ media }) => {
	//eslint-disable-next-line
	const { url, type } = media
	return (
		<ImageContainer url={url}>
			<Image src={url}/>
		</ImageContainer>
	)
}

export default CardMedia
