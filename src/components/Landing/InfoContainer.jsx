import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { respondTo } from "@styles/styledMediaQuery";
import constants from "@utils/constants";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { domAnimation, LazyMotion } from "framer-motion";
import React from "react";
import styled, { keyframes } from "styled-components";

const bgGradientAnimation = keyframes`
	0%{
		background-size: 300%;
		background-position: 0%;
	}
	50%{
		background-size: 150%;
		background-position: 100%;
	}
	100%{
		background-size: 300%;
		background-position: 0%;
	}
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items:center;
	line-height: 1.125;
	gap: 2rem;
	min-height: 100%;
	h1{
		font-weight: 900;
		font-size: 6rem;
		text-align:center;
		background: -webkit-linear-gradient(0deg,var(--app-text) 0%, #619feb 50%, var(--app-text) 100%);
		background-size: 300%;
		background-repeat: no-repeat;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		cursor: pointer;
		animation: ${bgGradientAnimation} 10s ease infinite;
	}
	h2{
		font-weight: 500;
		font-size: 1.675rem;
	}
	${respondTo.md`
		padding-left: 0;
		h2{
			text-align:center;
			margin-right:0;
		}
	`}
`

const Btn = styled(BtnBaseAnimated)`
	display: flex;
	align-items: center;
	font-size: 1.5rem;
	font-weight: 700;
	padding: 0 1.5rem;
	border-radius: 1000rem;
	height: 3.5rem;
	z-index:2;
	text-decoration: none;
	width:90%;
	justify-content:center;
`

const BtnContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:center;
	width: 100%;
	margin-top: 4rem;
`

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		whileHover={{
			y: -10,
			x: 0
		}}
		{...props}
	>{children}</Btn>
)

const InfoContainer = () => {
	const isTabletOrMobile = useIsTabletOrMobile();
	return (
		<Wrapper>
			<h1>{constants.APP_NAME}</h1>
			<h2>{constants.APP_DESCRIPTION}</h2>
			{!isTabletOrMobile&&(
				<BtnContainer>
					<LazyMotion features={domAnimation}>
						<AnimBtn
							href="/explore"
						>Dive in</AnimBtn>
					</LazyMotion>
				</BtnContainer>
			)}
		</Wrapper>
	)
}

export default InfoContainer
