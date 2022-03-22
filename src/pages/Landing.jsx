import Wrapper from "@components/Default/Wrapper";
import React from "react";
import HeroSection from "@components/LandingRedesign/HeroSection";
import useCheckJWT from "@utils/useCheckJWT";

const Landing = () => {
	useCheckJWT();
	return (
		<Wrapper landing>
			<HeroSection />
		</Wrapper>
	);
};

export default Landing;
