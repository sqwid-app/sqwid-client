import { respondTo } from "@styles/styledMediaQuery";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-self: flex-start;
	position: relative;
	padding: 0.5rem 0;
	width: 100%;
	flex: 1;
	${respondTo.md`
		margin: 0;
	`}
`;

export default Wrapper;
