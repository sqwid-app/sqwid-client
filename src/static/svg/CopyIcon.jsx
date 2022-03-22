import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";

const SVG = styled.svg`
	background: transparent;
	cursor: pointer;
	fill: var(--app-container-text-primary-hover);
	transition: fill 0.2s ease;
	&:hover {
		fill: var(--app-text);
	}
`;

const SVGContainer = styled(m.div)`
	display: grid;
	place-items: center;
`;

const CopyIcon = ({ onClick }) => {
	return (
		<LazyMotion features={domAnimation}>
			<SVGContainer
				onClick={onClick}
				whileTap={{
					scale: 0.85,
				}}
			>
				<SVG
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
				>
					<path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path>
					<path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
				</SVG>
			</SVGContainer>
		</LazyMotion>
	);
};

export default CopyIcon;
