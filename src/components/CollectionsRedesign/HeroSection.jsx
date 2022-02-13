import CardSectionContainer from "@elements/Default/CardSectionContainer";
import { respondTo } from "@styles/styledMediaQuery";
// import { getAvatarFromId } from "@utils/getAvatarFromId";
import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import LoadingIcon from "@static/svg/LoadingIcon";
import { Link } from "react-router-dom";
const Card = React.lazy(() => import("@elements/Default/Card"));

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0 2rem;
	`}
`

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
`

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
`

const CollectionsLogo = styled.div`
	position:relative;
	height: 2rem;
	width: 2rem;
	border-radius: 1000rem;
	border: 3px solid var(--app-text);
	background-color: var(--app-background);
	background-image: url('${props => props.url && props.url}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	cursor: pointer;
`

const CreatorLogo = styled(CollectionsLogo)`
	height: 1.5rem;
	width: 1.5rem;
	border: 0.125rem solid var(--app-text);
`

const Creator = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: 900;
	cursor: pointer;
	text-decoration: none;
	color: var(--app-container-text-primary-hover);
`
const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`

const NoItems = styled.div`
	text-align: center;
	font-size: 1.5rem;
`

const HeroSection = ({ id }) => {
	const [collectionsInfo, setCollectionsInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`${process.env.REACT_APP_API_URL}/get/r/marketplace/fetchMarketItems/collection/${id}`);
			let items = result.data;
			setCollectionsInfo(items);
			setIsLoading(false);
		}
		fetchData();
	}, [id]);

	return (
		<>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon size={64} />
				</LoadingContainer>
			) : (
				<Wrapper>
					<HeaderContainer>
						<Header>
							<CollectionsLogo
								url={collectionsInfo.thumb}
							/>
							{collectionsInfo.name}
						</Header>
						<Creator
							to={`/profile/${collectionsInfo.creator.id}`}
						>
							by
							<CreatorLogo
								url={collectionsInfo.creator.thumb}
							/>
							{collectionsInfo.creator.name}
						</Creator>
					</HeaderContainer>
					{collectionsInfo.content.length === 0 ? (
						<NoItems>No items in this collection 💀</NoItems>
					) : <CardSectionContainer>
						<Suspense>
							{collectionsInfo.content.map((item, index) => (
								<Card
									key={index}
									data={item}
									collections
								/>
							))}
						</Suspense>
					</CardSectionContainer>
					}
				</Wrapper>
			)}
		</>
	)
}

export default HeroSection
