import Navbar from "@components/Default/Navbar";
import SacProvider from "@contexts/Sac/SacProvider";
import Container from "@elements/Default/Container";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { respondTo } from "@styles/styledMediaQuery";
import React, { Suspense } from "react";
import styled from "styled-components";
const HeroSection = React.lazy(() => import("@components/Sac/HeroSection"));

const MarginDiv = styled.div`
	margin-top: 6rem;
	${respondTo.md`
		margin-top:4rem;
	`}
`;

const Wrapper = ({ children, landing }) => {
	return (
		<>
			<Navbar />
			<Container landing={landing}>
				<MarginDiv>{children}</MarginDiv>
			</Container>
		</>
	);
};

const Sac = () => {
	return (
		<Suspense fallback={<FullPageLoading init component="sac" />}>
			<SacProvider>
				<Wrapper>
					<HeroSection />
				</Wrapper>
			</SacProvider>
		</Suspense>
	);
};

export default Sac;
