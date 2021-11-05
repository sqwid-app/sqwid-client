import React from "react";
import styled from "styled-components";
import CardMedia from "./CardMedia";
import CardInfo from "./CardInfo";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Wrapper = styled(m.a)`
	display: grid;
	grid-template-rows: 2fr 1fr;
	border: 2px solid var(--app-container-bg-primary);
	border-radius: 0.375rem;
	/* overflow:hidden; */
	min-width: 16rem;
	aspect-ratio: calc(2/3);
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	color: var(--app-text);
`

const Card = ({ data }) => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper
				whileHover = {{
					x:0,
					y:-7.5,
				}}
				href={`${window.location.origin}/collectible/${data.id}`}
				target="_blank"
				rel="noreferrer"
			>
				<CardMedia media={data.media} />
				<CardInfo data={data} />
			</Wrapper>
		</LazyMotion>
	)
}

export default Card
