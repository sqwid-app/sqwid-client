import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CollectionCard from "./CollectionCard";
import CustomScrollbar from "@elements/Default/CustomScrollbar";
import AuthContext from "@contexts/Auth/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCloudflareURL } from "@utils/getIPFSURL";
import LoadingIcon from "@static/svg/LoadingIcon";
import { respondTo } from "@styles/styledMediaQuery";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import bread from "@utils/bread";
import { getBackend } from "@utils/network";

const Wrapper = styled.div`
	position: relative;
	margin-top: 9.5rem;
	padding: 0.5rem 0;
	flex:1;
	${respondTo.md`
		margin: 0;
	`}
`

const Container = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	padding: 1.5rem 0.75rem;
	padding-top: 4.5rem;
	gap: 1.25rem;
	${respondTo.md`
		position: relative;
		max-width: 95vw;
		overflow: auto;
		padding: 1.5rem 2rem;
	`}
`

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	place-items:center;
`

const Title = styled.h1`
	position:absolute;
	font-weight: 800;
	font-size: 2rem;
	user-select: none;
	padding-left: 2rem;
	${respondTo.md`
		position: relative;
		margin-top: 2rem;
	`}
`

const CollectionsSection = () => {
	const { auth } = useContext(AuthContext)
	const { id } = useParams()
	const userID = id ? id : auth?.evmAddress
	const [cards, setCards] = useState(JSON.parse(localStorage.getItem("collections")) || [])
	const [isLoading, setIsLoading] = useState(true)
	const isTabletOrMobile = useIsTabletOrMobile();
	useEffect(() => {
		axios.get(`${getBackend()}/get/collections/owner/${userID}`)
			.then((res) => {
				localStorage.setItem("collections", JSON.stringify(res.data.collections))
				setCards(res.data.collections.map(item => {
					return {
						src: getCloudflareURL(item.data.image),
						title: item.data.name,
						link: `/collections/${item.id}`
					}
				}))
			})
			.catch(err => {
				bread(err.response.data.error)
			})
			.finally(() => {
				setIsLoading(false)
			})
		//eslint-disable-next-line
	}, [])
	return (
		<Wrapper>
			{isTabletOrMobile ? (
				<>
					<Title>Collections</Title>
					{isLoading ? (
						<LoadingContainer>
							<LoadingIcon />
						</LoadingContainer>
					) : (
						<Container>
							{cards.map((item, index) => (
								<CollectionCard key={index} {...item} fullHeight={index === 0 && true} />
							))}
						</Container>
					)}
				</>
			) : (
				<>
					<Title>Collections</Title>
					<CustomScrollbar autoHide>
						{isLoading ? (
							<LoadingContainer>
								<LoadingIcon />
							</LoadingContainer>
						) : (
							<Container>
								{cards.map((item, index) => (
									<CollectionCard key={index} {...item} fullHeight={index === 0 && true} />
								))}
							</Container>
						)}
					</CustomScrollbar>
				</>
			)}
		</Wrapper>
	)
}

export default CollectionsSection
