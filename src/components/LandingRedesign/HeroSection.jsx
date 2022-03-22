import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import InfoContainer from "./InfoContainer";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
//eslint-disable-next-line
import Wave from "react-wavify";
import Explore from "./Explore";
import { Suspense } from "react";
import LoadingIcon from "@static/svg/LoadingIcon";
import { NavLink } from "react-router-dom";
import ChevronRight from "@static/svg/ChevronRight";
import Footer from "./Footer";
import DottedHeading from "@elements/Default/DottedHeading";

const ExploreContainer = styled.div`
	margin: 4rem auto;
	width: 100%;
`;

const Wrapper = styled.div`
	display: grid;
	place-items: center;
	text-align: center;

	${respondTo.md`
		position:absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: block;
		min-width: 100vw;
	    height: 100%;
	`}
`;

//eslint-disable-next-line
const WaveContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	& > div {
		display: flex !important;
		& > svg {
			align-self: flex-end;
		}
	}
`;

const MobileSection = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	padding: 2rem;
	gap: 2rem;
	background: linear-gradient(
		180deg,
		transparent 50%,
		var(--app-background) 100%
	);
	p {
		color: var(--app-container-text-primary-hover);
		text-align: center;
	}
`;

const NavWrapper = styled.div`
	padding: 0 12rem;
	width: 100%;
	${respondTo.md`
		padding: 0 2rem;
	`}
`;

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items: center;
`;

const Navbar = styled.nav`
	position: relative;
	z-index: 1;
	display: flex;
	gap: 0.5rem;
	/* border-bottom: 0.1rem solid var(--app-container-bg-primary); */
	margin-bottom: 0.5rem;
	user-select: none;
	&:after {
		content: "";
		display: block;
		margin-top: auto;
		width: 100%;
		height: 0.15rem;
		border-radius: 1000rem;
		background-color: var(--app-container-bg-primary);
	}
`;

const StyledNavLink = styled(NavLink)`
	position: absolute;
	right: 0;
	bottom: 0;
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
	font-weight: 800;
	transition: color 0.2s ease;
	&:hover {
		color: var(--app-text);
	}
`;

const MobileContainer = () => {
	return (
		<MobileSection>
			<p>For the best user experience, switch to a desktop browser</p>
		</MobileSection>
	);
};

const HeroSection = () => {
	const isTabletOrMobile = useIsTabletOrMobile();
	return (
		<>
			<Wrapper>
				<InfoContainer />
				{isTabletOrMobile && <MobileContainer />}
				<ExploreContainer>
					<NavWrapper>
						<Navbar>
							<DottedHeading>Explore</DottedHeading>
							<StyledNavLink to="/explore">
								View All <ChevronRight />
							</StyledNavLink>
						</Navbar>
					</NavWrapper>
					<Suspense fallback={<Loader />}>
						<Explore />
					</Suspense>
				</ExploreContainer>
				<Footer />
			</Wrapper>
		</>
	);
};

const Loader = () => {
	return (
		<LoadingContainer>
			<LoadingIcon size={64} />
		</LoadingContainer>
	);
};

export default HeroSection;
