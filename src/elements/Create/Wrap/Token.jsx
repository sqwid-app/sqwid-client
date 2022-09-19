import React from "react";
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
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
`;

const Token = ({ wrapDetails, setWrapDetails }) => {
	const handleInput = e => {
		setWrapDetails({
			...wrapDetails,
			token: e.target.value,
		});
	};
	return (
		<Container>
			<Title>Token ID</Title>
			<InputContainer
				value={wrapDetails.token}
				onChange={handleInput}
				type="number"
				placeholder={`e.g. "100000"`}
			/>
		</Container>
	);
};

export default Token;
