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
// import { useErrorModalHelper } from "@elements/Default/ErrorModal";

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
	// const { showErrorModal } = useErrorModalHelper();
	return (
		<>
			<Wrapper>
				<InfoContainer />
				{isTabletOrMobile && <MobileContainer />}
				<ExploreContainer>
					<NavWrapper>
						<Navbar>
							<DottedHeading
							// onClick={() =>
							// 	showErrorModal()
							// 	"I am not crazy! I know he swapped those numbers. I knew it was 1216. One after Magna Carta. As if I could ever make such a mistake. Never. Never! I just - I just couldn't prove it. He covered his tracks, he got that idiot at the copy shop to lie for him. You think this is something? You think this is bad? This? This chicanery? He's done worse. That billboard! Are you telling me that a man just happens to fall like that? No! *He* orchestrated it! Jimmy! He *defecated* through a *sunroof*! And I saved him! And I shouldn't have. I took him into my own firm! What was I *thinking*? He'll never change. He'll *never* change! Ever since he was 9, *always* the same! Couldn't keep his hands out of the cash drawer! But not our Jimmy! Couldn't be precious *Jimmy*! Stealing them blind! And *HE* gets to be a lawyer? What a sick joke! I should've stopped him when I had the chance!"
							// }
							>
								Featured
							</DottedHeading>
							<StyledNavLink to="/explore">
								Explore All <ChevronRight />
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
