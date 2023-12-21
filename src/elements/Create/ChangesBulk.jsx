import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import AlertIcon from "@static/svg/AlertIcon";
import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { initialState } from "@contexts/CollectionBulk/initialState";

const Container = styled.div``;

const fadeIn = keyframes`
	0%{
		transform: translateX(-1rem);
		opacity: 0;
	}
	100%{
		transform: translateX(0);
		opacity: 1;
	}
`;

const fadeOut = keyframes`
	0%{
		transform: translateX(0);
		opacity: 1;
	}
	100%{
		transform: translateX(-1rem);
		opacity: 0;
	}
`;

const Title = styled.h1`
	font-size: 1rem;
	font-weight: 600;
	color: var(--app-container-text-primary);
	display: flex;
	align-items: center;
	gap: 0.5rem;
	animation: ${props => (!props.animateOut ? fadeIn : fadeOut)} 0.2s
		cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`;

const deepEqual = (x, y) => {
	const ok = Object.keys,
		tx = typeof x,
		ty = typeof y;
	return x && y && tx === "object" && tx === ty
		? ok(x).length === ok(y).length &&
				ok(x).every(key => deepEqual(x[key], y[key]))
		: x === y;
};

const ChangesBulk = () => {
	const { collectionBulkData } = useContext(CollectionBulkContext);
	const [isVisible, setIsVisible] = useState(false);
	const [animateOut, setAnimateOut] = useState(false);
	useEffect(() => {
		const equalityCheck = deepEqual(
			{
				collectionName: initialState.collectionName,
				collectionDescription: initialState.collectionDescription,
				coverFile: initialState.coverFile,
				zipFile: initialState.zipFile,
				royaltyRecipient: initialState.royaltyRecipient,
				royalty: initialState.royalty,
				copies: initialState.copies,
			},
			{
				collectionName: collectionBulkData.collectionName,
				collectionDescription: collectionBulkData.collectionDescription,
				coverFile: collectionBulkData.coverFile,
				zipFile: collectionBulkData.zipFile,
				royaltyRecipient: collectionBulkData.royaltyRecipient,
				royalty: collectionBulkData.royalty,
				copies: collectionBulkData.copies,
			}
		);
		if (!equalityCheck) {
			setAnimateOut(false);
			setIsVisible(true);
		} else {
			setAnimateOut(true);
			setTimeout(() => {
				setIsVisible(false);
			}, 200);
		}
	}, [collectionBulkData]);
	return (
		<Container>
			{isVisible && (
				<Title animateOut={animateOut}>
					<AlertIcon />
					<span>Unsaved Changes</span>
				</Title>
			)}
		</Container>
	);
};

export default ChangesBulk;
