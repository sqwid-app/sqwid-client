import HeroSection from "@components/Collections/HeroSection";
import React from "react";
import { useParams } from "react-router";

const Collections = () => {
	const { id } = useParams()
	return (
		<>
			<HeroSection id={id}/>
		</>
	)
}

export default Collections
