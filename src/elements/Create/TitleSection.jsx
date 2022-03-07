import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";

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
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`;

const TitleSection = () => {
	const { files, setFiles } = useContext(FileContext);
	const handleInput = e => {
		setFiles({
			...files,
			name: e.target.value,
		});
	};
	return (
		<Container>
			<Title>Title</Title>
			<InputContainer
				value={files.name}
				onChange={handleInput}
				placeholder={`e.g "Pogchamp logo"`}
			/>
		</Container>
	);
};

export default TitleSection;
