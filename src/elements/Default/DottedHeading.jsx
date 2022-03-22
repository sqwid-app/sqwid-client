import styled from "styled-components";

const DottedHeading = styled.h1`
	line-height: 1;
	position: relative;
	margin: 0.1rem 0.5rem;
	font-size: ${props => (props.size ? props.size : `3rem`)};
	font-weight: 900;
	color: ${props =>
		props.active ? `inherit` : `var(--app-container-text-primary)`};
	text-decoration: none;
	display: block;
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	text-align: left;
	width: fit-content;
	transition: color 0.1s, transform 0.1s;
	padding: 0.2rem;
	text-shadow: -0.2rem 0.1rem 0 var(--app-theme-primary);
	margin-bottom: ${props => (props.size ? `1rem` : `0`)};
	&:before {
		content: "";
		height: 100%;
		width: 100%;
		background-image: radial-gradient(
			hsla(240, 6%, 75%, 0.35) 0.75px,
			transparent 0.75px
		);
		background-size: calc(10 * 0.75px) calc(10 * 0.75px);
		z-index: 0;
		position: absolute;
		transform: ${props =>
			props.size
				? `translate(-0.75rem, 0.75rem)`
				: `translate(-1rem, 1rem)`};
	}
`;

export default DottedHeading;
