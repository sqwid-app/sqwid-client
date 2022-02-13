import Navbar from "@components/Default/Navbar";
import FullPageLoading from "@elements/Default/FullPageLoading";
import React, { Suspense } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import NotFound from "./NotFound";
const HeroSection = React.lazy(() => import("@components/CollectionsRedesign/HeroSection"))

const MarginDiv = styled.div`
	margin-top:8rem;
`

const Container = styled.div`
	padding: 1rem 0;
	min-height: 100vh;
`

const Wrapper = ({ children }) => {
	return (
		<>
			<Navbar />
			<Container>
				<MarginDiv>
					{children}
				</MarginDiv>
			</Container>

		</>
	)
}


const Collections = () => {
	const { id } = useParams()
	return (
		<>
			{(id) ? (
				<Suspense fallback={<FullPageLoading init component="collections" />}>
					<Wrapper>
						<HeroSection id={id} />
					</Wrapper>
				</Suspense>
			) : (
				<NotFound stack={`Not a valid collections id`} />
			)}
		</>
	)
}

export default Collections
