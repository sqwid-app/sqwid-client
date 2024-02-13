import Wrapper from "@components/Default/Wrapper";
import React, { useEffect } from "react";
import HeroSection from "@components/LandingRedesign/HeroSection";
import useCheckJWT from "@utils/useCheckJWT";
import { convertREEFtoUSD } from "@utils/convertREEFtoUSD";

const Landing = () => {
	useCheckJWT();
	useEffect(()=>{
		const fetcher = async()=>{
			console.log(await convertREEFtoUSD(10))
		}
		fetcher()
	},[])
	return (
		<Wrapper landing>
			<HeroSection />
		</Wrapper>
	);
};

export default Landing;
