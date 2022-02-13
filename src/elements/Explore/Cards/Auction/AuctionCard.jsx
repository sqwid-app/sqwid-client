import React from "react";
import styled from "styled-components";
import CardInfo from "./CardInfo";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import CardMedia from "@elements/Explore/Cards/Default/CardMedia";
import Deadline from "@elements/Explore/Cards/Default/Deadline";
import { format } from "date-fns";
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
	z-index:1;
`

const DeadlineContainer = styled.div`
	position:absolute;
	z-index: 1;
	top:0;
	left:50%;
	margin-top: 0.5rem;
	transform:translateX(-50%);
`

const AuctionCard = ({ data, isLoading }) => {
	const formattedDeadline = data.auction && format(new Date(data.auction?.deadline), "EEEE, LLLL d, uuuu h:mm a")
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
				<DeadlineContainer title={`Deadline: ${formattedDeadline}`}><Deadline time={data.auction?.deadline} /></DeadlineContainer>
				<CardMedia isLoading={isLoading} meta={data.meta} deadline={data.auction?.deadline} />
				{isLoading ? <Loader /> : (<CardInfo data={data} isLoading={isLoading} />)}
			</Wrapper>
		</LazyMotion>
	)
}

export default AuctionCard
