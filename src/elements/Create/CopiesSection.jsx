import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import React, { useContext } from "react";
import styled from "styled-components";
import FilesContext from "@contexts/Files/FilesContext";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
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
	margin-bottom: 0.5rem;
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`;

const HelperText = styled.p`
	font-weight: 700;
	font-size: 0.75rem;
	color: var(--app-container-text-primary);
	padding: 0.0675rem 0;
`;

const CopiesSection = ({ bulk = false }) => {
	const { files, setFiles } = useContext(FileContext);
	const { filess, setFiless } = useContext(FilesContext);
	
	const handleInput = e => {
		bulk ? setFiless({ ...filess, copies: e.target.value})
			: setFiles({ ...files, copies: e.target.value });
	};
	return (
		<Container>
			<Title>Number of editions</Title>
			<InputContainer
				value={bulk ? filess.copies : files.copies}
				onChange={handleInput}
				placeholder={`e.g 10`}
			/>
			<HelperText>Amount of tokens</HelperText>
		</Container>
	);
};

export default CopiesSection;
