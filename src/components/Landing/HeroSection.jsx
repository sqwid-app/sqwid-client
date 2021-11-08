import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import InfoContainer from "./InfoContainer";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { LazyMotion, domAnimation } from "framer-motion";
import Wave from 'react-wavify'

const Wrapper = styled.div`
	padding: 0 6rem;
	// padding-right:0;
	height: 65vh;
	display: grid;
	place-items:center;
	text-align:center;
	${respondTo.md`
		height: 90vh;
		grid-template-rows: none;
		grid-template-columns: none;
		padding: 0 2rem;
	`}
`

const WaveContainer = styled.div`
	position: absolute;
    bottom: 0;
    width: 100vw;
	& > div {
		display: flex !important;
		& > svg{
			align-self: flex-end;
		}
	}
`

const MobileSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	p{
		color: var(--app-container-text-primary);
		text-align:center;
	}
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

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale:0.97
		}}
		{...props}
	>{children}</Btn>
)

const MobileContainer = () => {
	return (
		<MobileSection>
			<LazyMotion features={domAnimation}>
				<AnimBtn href="/explore">Explore</AnimBtn>
			</LazyMotion>
			<p>For the best user experience, switch to a desktop browser</p>
		</MobileSection>
	)
}

const HeroSection = () => {
	const isTabletOrMobile = useIsTabletOrMobile();
	return (
		<>
		<Wrapper>
			<InfoContainer/>
			{isTabletOrMobile?(
				<MobileContainer/>
			):(
				<WaveContainer>
					<Wave
						fill="url(#gradient)"
						paused={false}
						options={{
							height: 20,
							amplitude: 50,
							speed: 0.2,
							points: 2
						}}
					>
						<defs>
							<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" style={{
								stopColor:"var(--app-theme-primary)",
								stopOpacity:"1"
							}}/>
							<stop offset="100%" style={{
								stopColor:"var(--app-theme-primary-transparent)",
								stopOpacity:"1"
							}}/>
							</linearGradient>
						</defs>
					</Wave>
				</WaveContainer>
			)}
		</Wrapper>
		</>
	)
}

export default HeroSection
