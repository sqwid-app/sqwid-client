import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	span {
		font-weight: 700;
		color: var(--app-container-text-primary);
	}
`;

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline: none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`;

const CollectionDescriptionSection = ({ bulk = false }) => {
	const { files, setFiles } = useContext(FileContext);
	const { collectionBulkData, setCollectionBulkData } = useContext(
		CollectionBulkContext
	);
	const handleInput = e => {
		bulk
			? setCollectionBulkData({
					...collectionBulkData,
					collectionDescription: e.target.value,
			  })
			: setFiles({ ...files, description: e.target.value });
	};
	return (
		<Container>
			<Title>
				Collection description <span>(optional)</span>
			</Title>
			<InputContainer
				value={
					bulk
						? collectionBulkData.collectionDescription
						: files.description
				}
				onChange={handleInput}
				placeholder={`e.g “Pics of my heckin doggo”`}
			/>
		</Container>
	);
};

export default CollectionDescriptionSection;
