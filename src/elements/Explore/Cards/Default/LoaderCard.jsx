import React from "react";
import styled, { keyframes } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loader from "../Default/Loader";
import LoadingIcon from "@static/svg/LoadingIcon";

const Wrapper = styled(m.div)`
	position: relative;
	display: grid;
	grid-template-rows: 2fr 1fr;
	border: 0.125rem solid var(--app-container-bg-primary);
	border-radius: 0.375rem;
	/* overflow:hidden; */
	min-width: 16rem;
	aspect-ratio: calc(2 / 3);
	cursor: pointer;
	user-select: none;
	text-decoration: none;
	color: var(--app-text);
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
		rgba(17, 19, 34, 0.75) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	animation: ${skeletonAnim} 1s infinite;
`;

const LoaderCard = () => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper
				whileTap={{
					x: 0,
					y: 0,
					scale: 0.99,
				}}
			>
				<LoaderContainer>
					<LoadingIcon size="48" />
				</LoaderContainer>
				<Loader />
			</Wrapper>
		</LazyMotion>
	);
};

export default LoaderCard;
