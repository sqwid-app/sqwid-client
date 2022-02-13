import Navbar from "@components/Default/Navbar";
import FullPageLoading from "@elements/Default/FullPageLoading";
import { fetchCollectionInfo } from "@utils/marketplace";
import React, { Suspense, useEffect, useState } from "react";
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
	const [isLoading, setIsLoading] = useState(true)
	const [collection, setCollection] = useState({})
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const data = await fetchCollectionInfo(id)
				if (!data?.error) {
					setCollection({
						...data,
						id: id
					});
				}
				else {
					setCollection(null);
				}
				setIsLoading(false)
			}
		}
		fetchData()
	}, [id])
	return (
		<>
			{(id && collection !== null) ? (
				<Suspense fallback={<FullPageLoading init component="collections" />}>
					<Wrapper>
						<HeroSection collectionInfo={collection} isLoading={isLoading} setIsLoading={setIsLoading} />
					</Wrapper>
				</Suspense>
			) : (
				<NotFound stack={`Not a valid collections id`} />
			)}
		</>
	)
}

export default Collections
