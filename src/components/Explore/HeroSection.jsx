import { respondTo } from "@styles/styledMediaQuery";
import React from "react";
import styled from "styled-components";
import HotBids from "./HotBids";
import RecentlyListed from "./RecentlyListed";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1{
			padding-left: 3rem;
		}
	`}
`

const HeroSection = () => {
	return (
		<Wrapper>
			<HotBids/>
			<RecentlyListed/>
		</Wrapper>
	)
}

export default HeroSection
