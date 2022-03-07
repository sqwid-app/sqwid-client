import { respondTo } from "@styles/styledMediaQuery";
import styled from "styled-components";

const ProfilePicture = styled.img`
	min-height: 8rem;
	min-width: 8rem;
	height: 8rem;
	width: 8rem;
	border: 10px solid #ffffff;
	border-radius: 1000rem;
	${respondTo.md`
		background: var(--app-background);
	`}
`;

export default ProfilePicture;
