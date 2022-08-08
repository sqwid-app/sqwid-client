import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import { getInfuraURL } from "@utils/getIPFSURL";

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	& > a {
		position: absolute;
		left: 0;
	}
	& > a:nth-child(1) {
		left: calc(-3rem);
		z-index: 3;
	}
	& > a:nth-child(2) {
		left: calc(-3rem * 2 / 3);
		z-index: 2;
	}
	& > a:nth-child(3) {
		left: calc(-3rem / 3);
		z-index: 1;
	}
	& > a:hover {
		z-index: 4;
	}
`;

const Icon = styled(m(Link))`
	position: relative;
	height: 1.5rem;
	width: 1.5rem;
	border-radius: 1000rem;
	outline: 2.5px solid var(--app-background);
	background-color: var(--app-background);
	background-image: url("${props => props.url && props.url}");
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
	&:before {
		content: "${props => (props.tooltip ? props.tooltip : ``)}";
		position: absolute;
		top: -150%;
		left: 50%;
		transform: translate(-50%, 0);
		color: var(--app-container-text-primary-hover);
		background: var(--app-modal-btn-primary);
		font-weight: 900;
		font-size: 0.875rem;
		border-radius: 0.25rem;
		opacity: 0;
		transition: opacity 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
		padding: 0.25rem 0.75rem;
		white-space: nowrap;
		display: none;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 12rem;
	}
	&:hover {
		&:before {
			opacity: 1;
			display: block;
		}
	}
`;

const AnimatedIcons = props => {
	return (
		<Icon
			whileTap={{
				scale: 0.95,
			}}
			whileHover={{
				x: 0,
				y: -5,
				scale: 1.05,
			}}
			{...props}
		>
			{props.children}
		</Icon>
	);
};

const CardHeaderIcons = ({ data }) => {
	const { owner, collection, creator } = data;
	console.log (collection);
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper>
				<AnimatedIcons
					to={`/profile/${owner.address}`}
					url={owner.avatar}
					tooltip={`Owner: ${owner.name}`}
				/>
				<AnimatedIcons
					to={`/profile/${creator.address}`}
					url={creator.avatar}
					tooltip={`Creator: ${creator.name}`}
				/>
				<AnimatedIcons
					to={collection.id !== 'ASwOXeRM5DfghnURP4g2' ? `/collections/${collection.id}` : '#'}
					url={getInfuraURL(collection.image)}
					tooltip={`Collection: ${collection.name}`}
				/>
			</Wrapper>
		</LazyMotion>
	);
};

export default CardHeaderIcons;
