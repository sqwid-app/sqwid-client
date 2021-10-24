import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`

const InputContainer = styled.input`
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline:none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	padding-right:2ch;
	border-bottom: 2px solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	position:relative;
	&:focus{
		border-bottom: 2px solid var(--app-container-text-primary-hover);
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type=number] {
		-moz-appearance: textfield;
	}
`

const InputWrapper = styled.div`
	position: relative;
	margin-bottom: 0.5rem;
	&:after{
		content: "%";
		color: var(--app-container-text-primary);
		position: absolute;
		right:0;
		top:50%;
		transform: translateY(-50%);
	}
`

const HelperText = styled.p`
	font-weight: 700;
	font-size: 0.75rem;
	color: var(--app-container-text-primary);
	padding: 0.0675rem 0;
`

const RoyaltySection = () => {
	const { files, setFiles } = useContext(FileContext)
	const handleInput = (e) => {
		let { value, min, max } = e.target;
		value = Math.max(Number(min), Math.min(Number(max), Number(value)));
		setFiles({
			...files,
			royalty: value
		})
	}
	return (
		<Container>
			<Title>Royalties</Title>
			<InputWrapper>
				<InputContainer
					value={files.royalty}
					onChange = {handleInput}
					placeholder={`10`}
					type="number"
					min="0"
					max="50"
					onBlur={()=>setFiles({
						...files,
						royalty: ""
					})}
				/>
			</InputWrapper>
			<HelperText>Suggested: 0%, 10%, 20%, 30%</HelperText>
			<HelperText>Maximum: 50%</HelperText>
		</Container>
	)
}

export default RoyaltySection
