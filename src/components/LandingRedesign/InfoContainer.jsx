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
	height:40rem;
	width: 100%;
	background: var(--app-banner-bg);
	background-repeat: repeat;
	display: flex;
	align-items:center;
	justify-content: space-around;
	line-height: 1.125;
	gap: 2rem;
	min-height: 100%;
	text-align: left;
	overflow: hidden;
	h1{
		line-height: 1;
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
		user-select: none;
	}
	h2{
		margin-top:2rem;
		font-weight: 500;
		font-size: 1.125rem;
		width: 25rem;
		color: var(--app-container-text-primary-hover);
	}
	${respondTo.md`
		padding-left: 0;
		background: transparent;
		h1{
			width: 100%;
			font-size: 3rem;
			text-align:center;
		}
		h2{
			text-align:justify;
			margin-right:0;
			width: 100%;
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
	--app-theme-opacity: 0.75;
	--app-theme-text: rgb(191, 215, 245);
	border: solid 0.2rem rgba(
		var(--app-theme-value),
		var(--app-theme-opacity)
	);
	/* background: rgba(
		var(--app-theme-value),
		calc(var(--app-theme-opacity) / 2)
	); */
	background: transparent;
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

const float = keyframes`
	0%{
		transform: translateY(0);
	}
	50%{
		transform: translateY(1rem);
	}
	100%{
		transform: translateY(0);
	}
`

const Image = styled.img`
	height: 100%;
	animation: ${float} 5s cubic-bezier(0.37, 0, 0.63, 1) infinite;
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

	const getImage = (dim) => `https://res.cloudinary.com/etjfo/image/upload/${dim}/v1646079322/sqwid/banner.png`

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
								href="/#explore"
							>Dive In</AnimBtn>
							<AnimBtn
								outline
								href="/create"
							>Create</AnimBtn>
						</LazyMotion>
					</BtnContainer>
				)}
			</ContentContainer>
			{!isTabletOrMobile && (
				<ImageContainer>
					<Image
						srcSet={`
							 	${getImage("f_auto,q_70,w_256")} 256w,
								${getImage("f_auto,q_70,w_512")} 512w,
								${getImage("f_auto,q_70,w_768")} 768w,
								${getImage("f_auto,q_70,w_1024")} 1024w,
								${getImage("f_auto,q_70,w_1024")} 1280w,
						`}
						sizes="(min-width: 30em) 28em, 100vw"
						src={`https://res.cloudinary.com/etjfo/image/upload/v1646079322/sqwid/banner.png`}
						alt="banner"
					/>
				</ImageContainer>
			)}
		</Wrapper>
	)
}

export default InfoContainer
