import styled from "styled-components";
import { m } from "framer-motion"

const BtnBase = styled.a`
	background: var(--app-theme-primary);
	font-family: var(--font-family);
    color: var(--app-text);
	outline: none;
    border: none;
	user-select: none;
	cursor: pointer;
`

const BtnBaseAnimated = styled(m.a)`
	background: var(--app-theme-primary);
	font-family: var(--font-family);
    color: var(--app-text);
	outline: none;
    border: none;
	user-select: none;
	cursor: pointer;
`

export { BtnBase, BtnBaseAnimated }
