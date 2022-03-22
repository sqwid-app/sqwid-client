import React from "react";
import styled from "styled-components";

const SVG = styled.svg`
	background: transparent;
	path {
		stroke: currentColor;
		fill: none;
	}
`;

const ChevronRight = () => {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 512 512"
		>
			<title>Chevron Forward</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="48"
				d="M184 112l144 144-144 144"
			/>
		</SVG>
	);
};

export default ChevronRight;
