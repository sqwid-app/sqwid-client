import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import InfoContainer from "./InfoContainer";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import { LazyMotion, domAnimation } from "framer-motion";
//eslint-disable-next-line
import Wave from 'react-wavify'
import Explore from "./Explore";
import { Suspense } from "react";
import LoadingIcon from "@static/svg/LoadingIcon";
import { NavLink } from "react-router-dom";
import ChevronRight from "@static/svg/ChevronRight";

const ExploreContainer = styled.div`
	margin: 4rem auto;
	width: 100%;
`

const Wrapper = styled.div`
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

//eslint-disable-next-line
const WaveContainer = styled.div`
	position: absolute;
    bottom: 0;
	left: 0;
    width: 100%;
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

const NavWrapper = styled.div`
	padding: 0 12rem;
	width: 100%;
`

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`

const Navbar = styled.nav`
	position:relative;
	z-index: 1;
	display:flex;
	gap:0.5rem;
	/* border-bottom: 0.1rem solid var(--app-container-bg-primary); */
	margin-bottom: 0.5rem;
	user-select:none;
	&:after{
		content:'';
		display:block;
		margin-top: auto;
		width:100%;
		height:0.15rem;
		border-radius: 1000rem;
		background-color:var(--app-container-bg-primary);
	}
`

const Heading = styled.h1`
	line-height: 1;
	position:relative;
	margin: 0.1rem 0.5rem;
	font-size: 3rem;
	font-weight: 900;
	color: ${props => props.active ? `inherit` : `var(--app-container-text-primary)`};
	text-decoration:none;
	display: block;
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	text-align:left;
	width: fit-content;
	transition: color 0.1s, transform 0.1s;
	padding: 0.2rem;
	text-shadow: -0.2rem 0.1rem 0 var(--app-theme-primary);
	&:before{
		content: "";
		height: 100%;
		width: 100%;
		background-image: radial-gradient(hsla(240, 6%, 75%, 0.5) 0.75px, transparent 0.75px);
		background-size: calc(10 * 0.75px) calc(10 * 0.75px);
		z-index: -1;
		position: absolute;
		transform: translate(-1rem, 1rem);
	}
`

const StyledNavLink = styled(NavLink)`
	position: absolute;
	right: 0;
	bottom: 0;
	margin-bottom: 0.5rem;
	display: flex;
	align-items:center;
	text-decoration: none;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
	font-weight: 800;
	transition: color 0.2s ease;
	&:hover{
		color: var(--app-text);
	}
`

const AnimBtn = ({ children, ...props }) => (
	<Btn
		whileTap={{
			scale: 0.97
		}}
		{...props}
	>{children}</Btn>
)

const MobileContainer = () => {
	return (
		<MobileSection>
			<LazyMotion features={domAnimation}>
				<AnimBtn href="/explore">Dive in</AnimBtn>
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
				<InfoContainer />
				{isTabletOrMobile && (
					<MobileContainer />
				)}
				<ExploreContainer>
					<NavWrapper>
						<Navbar>
							<Heading>Explore</Heading>
							<StyledNavLink to="/explore">Dive In <ChevronRight /></StyledNavLink>
						</Navbar>
					</NavWrapper>
					<Suspense fallback={
						<Loader />
					}>
						<Explore />
					</Suspense>
				</ExploreContainer>
			</Wrapper>
		</>
	)
}

const Loader = () => {
	return (<LoadingContainer>
		<LoadingIcon size={64} />
	</LoadingContainer>);
}

export default HeroSection
