import { respondTo } from "@styles/styledMediaQuery";
import constants from "@utils/constants";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 4rem;
	line-height: 1.125;
	gap: 2rem;
	h1{
		font-weight: 900;
		font-size: 6rem;
	}
	h2{
		font-weight: 500;
		font-size: 2rem;
		margin-right: 8rem;
	}
	${respondTo.md`
		padding-left: 0;
		h1{
			text-align:center;
			background: -webkit-linear-gradient(0deg,var(--app-text) 0%, var(--app-theme-primary) 150%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		h2{
			text-align:center;
			margin-right:0;
		}
	`}
`

const InfoContainer = () => {
	return (
		<Wrapper>
			<h1>{constants.APP_NAME}</h1>
			<h2>{constants.APP_DESCRIPTION}</h2>
		</Wrapper>
	)
}

export default InfoContainer
