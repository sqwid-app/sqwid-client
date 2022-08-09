import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import SocialsContainer from "./SocialsContainer";

// const BackgroundContainer = styled.div`
// 	margin-top: 1.75rem;
// 	background: linear-gradient(
// 			345deg,
// 			rgba(0, 0, 0, .7) 0%,
// 			rgba(0, 0, 0, 0) 50%
// 		),
// 		// url("https://images.unsplash.com/photo-1634662488276-087e4e126917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80");
// 		// url("https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1932&q=80");
// 		url("https://images.unsplash.com/photo-1464925257126-6450e871c667?auto=format&fit=crop&w=1932&h=500&q=80");
// 	background-size: cover;
// 	background-position: center 0px;
// 	background-repeat: no-repeat;
// 	height: 30vh;
// 	width: 100%;
// 	border-radius: 0.5rem;
// 	// margin-bottom: -15rem;
// 	${respondTo.md`
// 		background: url("https://images.unsplash.com/photo-1634662488276-087e4e126917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
// 		width: 100%;
// 	`}
// `;

// const Background = React.memo(() => {
// 	return <BackgroundContainer />;
// });

const BackgroundContainer = styled.div`
	margin-top: 1.75rem;
	background: linear-gradient(
			345deg,
			rgba(0, 0, 0, .75) 0%,
			rgba(0, 0, 0, 0) 50%
		),
		url("https://images.unsplash.com/photo-1464925257126-6450e871c667?auto=format&fit=crop&w=1932&h=500&q=80");
	background-size: cover;
	background-position: center 0px;
	background-repeat: no-repeat;
	height: 30vh;
	width: 100%;
	border-radius: 0.5rem;
	${respondTo.md`
		background: linear-gradient(
			195deg,
			rgba(0, 0, 0, .85) 0%,
			rgba(0, 0, 0, 0) 60%
		),
		url("https://images.unsplash.com/photo-1464925257126-6450e871c667?auto=format&fit=crop&w=800&h=300&q=80");
		width: 100%;
		background-size: cover;
		background-position: center 0px;
		background-repeat: no-repeat;
	`}
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const SocialsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	padding: .75rem;
	padding-right: 1rem;
	${respondTo.md`
		align-self: flex-start;
	`}
`;

const Background = React.memo(({ socials }) => {
	return (
		<BackgroundContainer>
			<SocialsWrapper>
				<SocialsContainer {...socials} />
			</SocialsWrapper>
		</BackgroundContainer>
	);
});

export default Background;
