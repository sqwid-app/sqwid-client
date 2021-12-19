import React from "react";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
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

const Address = ({ wrapDetails, setWrapDetails }) => {
	const handleInput = (e) => {
		setWrapDetails({
			...wrapDetails,
			address: e.target.value
		})
	}
	return (
		<Container>
			<Title>Contract Address</Title>
			<InputContainer
				value={wrapDetails.address}
				onChange={handleInput}
				placeholder={`e.g "0x123...abc"`}
			/>
		</Container>
	)
}

export default Address
