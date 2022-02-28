import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { respondTo } from "@styles/styledMediaQuery";
import constants from "@utils/constants";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { domAnimation, LazyMotion } from "framer-motion";
import React from "react";
import styled, { css, keyframes } from "styled-components";

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
	position: relative;
	height: 75vh;
	width: 100%;
	background: var(--app-banner-bg);
	border-radius: 2rem;
	display: flex;
	align-items:center;
	justify-content: space-around;
	max-height: 75vh;
	line-height: 1.125;
	gap: 2rem;
	min-height: 100%;
	text-align: left;
	overflow: hidden;
	h1{
		font-weight: 900;
		font-size: 4rem;
		background: -webkit-linear-gradient(0deg,var(--app-text) 0%, #619feb 50%, var(--app-text) 100%);
		background-size: 300%;
		background-repeat: no-repeat;
		background-clip: text;
		-webkit-background-clip: text;
		width: 25rem;
		-webkit-text-fill-color: transparent;
		cursor: pointer;
		animation: ${bgGradientAnimation} 10s ease infinite;
	}
	h2{
		margin-top:2rem;
		font-weight: 500;
		font-size: 1.25rem;
		width: 25rem;
		color: var(--app-container-text-primary-hover);
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
	${props => props.outline && outline}
`

const outline = css`
	--app-theme-opacity: 0.25;
	--app-theme-text: rgb(211 231 255);
	border: solid 0.3rem var(--app-theme-primary);
	background: rgba(
		var(--app-theme-value),
		var(--app-theme-opacity)
	);
	color: var(--app-theme-text);
`

const BtnContainer = styled.div`
	display: flex;
	align-items:center;
	justify-content:center;
	width: 100%;
	margin-top: 3rem;
	gap: 1rem;
`

const Image = styled.img`
	height: 100%;
`

const ImageContainer = styled.div`
	max-height: 100%;
	height: 100%;
	transform: scale(1.25) rotate(var(--img-angle));
`

const ContentContainer = styled.div`

`

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		whileHover={{
			y: -5,
			x: 0
		}}
		{...props}
	>{children}</Btn>
)

const InfoContainer = () => {
	let about = constants.APP_ABOUT

	const isTabletOrMobile = useIsTabletOrMobile();
	const getMatches = (str) => {
		let res = []
		const regex = /%([a-zA-Z0-9-_]+)%/g;
		let m;
		while ((m = regex.exec(str)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}
			res.push(m[1]);
		}
		return res;
	}

	getMatches(about).forEach(match => {
		about = about.replace(`%${match}%`, constants[match])
	});

	return (
		<Wrapper>
			<ContentContainer>
				<h1>{constants.APP_DESCRIPTION}</h1>
				<h2>{about}</h2>
				{/* <h2>{constants.APP_DESCRIPTION}</h2> */}
				{!isTabletOrMobile && (
					<BtnContainer>
						<LazyMotion features={domAnimation}>
							<AnimBtn
								href="/explore"
							>Dive in</AnimBtn>
							<AnimBtn
								outline
								href="/create"
							>Create</AnimBtn>
						</LazyMotion>
					</BtnContainer>
				)}
			</ContentContainer>
			<ImageContainer>
				<Image src={`https://res.cloudinary.com/etjfo/image/upload/v1646079322/sqwid/banner.png`} alt="banner" />
			</ImageContainer>
		</Wrapper>
	)
}

export default InfoContainer
