import Wrapper from "@components/Default/Wrapper";
import React, { useContext } from "react";
import HeroSection from "@components/LandingRedesign/HeroSection";
import AuthContext from "@contexts/Auth/AuthContext";

const Landing = () => {
	const { token } = useContext(AuthContext);
	console.log(token);
	return (
		<Wrapper landing>
			<HeroSection />
		</Wrapper>
	);
};

export default Landing;
