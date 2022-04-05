import styled, { css } from "styled-components";
import { m } from "framer-motion";

const baseStyles = css`
	/* background: var(--app-theme-primary); */
	font-family: var(--font-family);
	color: var(--app-text);
	outline: none;
	border: none;
	user-select: none;
	cursor: pointer;
	background-image: linear-gradient(
		110deg,
		var(--app-theme-primary) 0%,
		var(--app-theme-secondary) 50%,
		var(--app-theme-primary) 100%
	);
	background-size: 200%;
	transition: background-position 0.4s ease 0.1s;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
	&:hover {
		background-position: right center;
	}
`;

const BtnBase = styled.a`
	${baseStyles}
`;

const BtnBaseAnimated = styled(m.a)`
	${baseStyles}
`;

export { BtnBase, BtnBaseAnimated };
