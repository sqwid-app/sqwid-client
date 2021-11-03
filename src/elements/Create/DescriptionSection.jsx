import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	span{
		font-weight: 700;
		color: var(--app-container-text-primary);
	}
`

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
`

const DescriptionSection = () => {
	const { files, setFiles } = useContext(FileContext)
	const handleInput = (e) => {
		setFiles({
			...files,
			description: e.target.value
		})
	}
	return (
		<Container>
			<Title>Description <span>(optional)</span></Title>
			<InputContainer
				value={files.description}
				onChange = {handleInput}
				placeholder={`e.g “The pogchamp logo, literally that.”`}
			/>
		</Container>
	)
}

export default DescriptionSection
