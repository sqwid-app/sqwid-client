import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
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
	padding-right: 2ch;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	position: relative;
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

const InputWrapper = styled.div`
	position: relative;
	margin-bottom: 0.5rem;
	&:after {
		content: "%";
		color: var(--app-container-text-primary);
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
`;

const HelperText = styled.p`
	font-weight: 700;
	font-size: 0.75rem;
	color: var(--app-container-text-primary);
	padding: 0.0675rem 0;
`;

const RoyaltySection = ({ bulk = false }) => {
	const { files, setFiles } = useContext(FileContext);
	const { collectionBulkData, setCollectionBulkData } = useContext(
		CollectionBulkContext
	);
	const handleInput = e => {
		let { value, min, max } = e.target;
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		bulk
			? setCollectionBulkData({ ...collectionBulkData, royalty: value })
			: setFiles({ ...files, royalty: value });
	};
	return (
		<Container>
			<Title>Royalties value</Title>
			<InputWrapper>
				<InputContainer
					value={bulk ? collectionBulkData.royalty : files.royalty}
					onChange={handleInput}
					placeholder={`e.g 10`}
					type="number"
					min="0"
					max="50"
					onBlur={e =>
						e.target.value === "0" &&
						(bulk
							? setCollectionBulkData({
									...collectionBulkData,
									royalty: "",
							  })
							: setFiles({ ...files, royalty: "" }))
					}
				/>
			</InputWrapper>
			<HelperText>Suggested: 0%, 10%, 20%, 30%</HelperText>
			<HelperText>Maximum: 50%</HelperText>
		</Container>
	);
};

export default RoyaltySection;
