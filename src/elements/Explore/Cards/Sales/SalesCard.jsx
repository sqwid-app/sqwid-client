import React from "react";
import styled from "styled-components";
import CardInfo from "./CardInfo";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import CardMedia from "@elements/Explore/Cards/Default/CardMedia";
import Loader from "../Default/Loader";

const Wrapper = styled(m.div)`
	position: relative;
	display: grid;
	grid-template-rows: 2fr 1fr;
	border: 0.125rem solid var(--app-container-bg-primary);
	border-radius: 0.375rem;
	/* overflow:hidden; */
	min-width: 16rem;
	aspect-ratio: calc(2/3);
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	color: var(--app-text);
`


const LinkWrapper = styled(Link)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index:0;
`

const SalesCard = ({ data, isLoading }) => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper
				whileTap={{
					x: 0,
					y: 0,
					scale: 0.99
				}}
			>
				<LinkWrapper to={`/collectible/${data.positionId}`}></LinkWrapper>
				<CardMedia to={`/collectible/${data.positionId}`} meta={data.meta} />
				{isLoading ? <Loader /> : (<CardInfo data={data} isLoading={isLoading} />)}
			</Wrapper>
		</LazyMotion>
	)
}

export default SalesCard
