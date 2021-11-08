import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";

const BackgroundContainer = styled.div`
	position: absolute;
	top: 8rem;
	background: linear-gradient(270deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%), url("https://images.unsplash.com/photo-1634662488276-087e4e126917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	height: 30vh;
	width: 100%;
	z-index:0;
	${respondTo.md`
		top: 6rem;
		background: url("https://images.unsplash.com/photo-1634662488276-087e4e126917?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
		width: 100%;
	`}
`

const Background = ({ seed }) => {
	return <BackgroundContainer seed={seed}/>
}

export default React.memo(Background)
