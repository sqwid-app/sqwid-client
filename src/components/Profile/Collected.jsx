import Card from "@elements/Default/Card";
import CardSectionContainer from "@elements/Default/CardSectionContainer";
import AuthContext from "@contexts/Auth/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Suspense } from "react";
import styled from "styled-components";
import axios from "axios";
import Wrapper from "@elements/ProfileRedesign/Wrapper";
import LoadingIcon from "@static/svg/LoadingIcon";
import { getBackend } from "@utils/network";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";

const LoadingContainer = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
`;
const Collected = () => {
	const { auth } = useContext(AuthContext);
	const { id } = useParams();
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { showErrorModal } = useErrorModalHelper();

	useEffect(() => {
		let addressToCheck = id || auth?.evmAddress;
		axios(
			`${getBackend()}/get/r/marketplace/fetchMarketItems/owner/${addressToCheck}`
		)
			.then(result => {
				setItems(result.data);
			})
			.catch(err => {
				showErrorModal(err.response.data.error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth, auth?.evmAddress, id]);
	return (
		<Wrapper>
			{isLoading ? (
				<LoadingContainer>
					<LoadingIcon />
				</LoadingContainer>
			) : (
				<>
					{items.length !== 0 && (
						<CardSectionContainer>
							<Suspense>
								{items.map((item, index) => (
									<Card key={index} data={item} collections />
								))}
							</Suspense>
						</CardSectionContainer>
					)}
				</>
			)}
		</Wrapper>
	);
};

export default Collected;
