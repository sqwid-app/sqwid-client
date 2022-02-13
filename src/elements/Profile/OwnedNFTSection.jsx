import Card from "@elements/Default/Card";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import { respondTo } from "@styles/styledMediaQuery";
import AuthContext from "@contexts/Auth/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Suspense } from "react";
import styled from "styled-components";
import axios from 'axios';
import { getBackend } from "@utils/network";

const Wrapper = styled.div`
	position: relative;
	margin-top: 9.5rem;
	padding: 0 6rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	flex:1;
	${respondTo.md`
		margin-top: 2rem;
		padding: 0 2rem;
	`}
`

const Header = styled.h1`
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 900;
`

const OwnedNFTSection = () => {
	const { auth } = useContext(AuthContext);
	const { id } = useParams()
	const [items, setItems] = useState([]);

	useEffect(() => {
		let addressToCheck = id || auth?.evmAddress;
		const fetchData = async () => {
			const result = await axios(`${getBackend()}/get/r/marketplace/fetchMarketItems/owner/${addressToCheck}`);
			let items = result.data;
			setItems(items);
		}
		fetchData();
	}, [auth, auth?.evmAddress, id]);
	return (
		<>
			{items.length !== 0 && (
				<Wrapper>
					<Header>Collected</Header>
					<CardSectionContainer>
						<Suspense>
							{items.map((item, index) => (
								<Card
									key={index}
									data={item}
									collections
								/>
							))}
						</Suspense>
					</CardSectionContainer>
				</Wrapper>
			)}
		</>
	)
}

export default OwnedNFTSection
