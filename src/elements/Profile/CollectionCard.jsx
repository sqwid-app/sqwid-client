import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";

const CollectionCardContainer = styled(m(Link))`
	display: flex;
	cursor: pointer;
	user-select: none;
	background-image: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 65%,
			rgba(0, 0, 0, 0.75) 100%
		),
		url("${props => props.src && props.src}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	border-radius: 1rem;
	min-height: 16rem;
	min-width: 16rem;
	height: 16rem;
	width: 16rem;
	overflow: hidden;
	text-decoration: none;
	div {
		align-self: flex-end;
		font-size: 1.5rem;
		font-weight: 900;
		color: var(--app-text);
		padding: 0.5rem 1.125rem;
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

const CollectionCard = ({ src, title, link }) => {
	return (
		<LazyMotion features={domAnimation}>
			<CollectionCardContainer
				target="_blank"
				referrer="no-referrer"
				to={link}
				src={src}
				whileHover={{
					y: -10,
					x: 0,
					scale: 1.02,
				}}
				whileTap={{
					scale: 0.99,
				}}
				transition={{
					type: "tween",
					ease: "backOut",
				}}
			>
				<div>{title}</div>
			</CollectionCardContainer>
		</LazyMotion>
	);
};

export default React.memo(CollectionCard);
