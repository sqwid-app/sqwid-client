import React from "react";
import styled from "styled-components";
import CustomDropzone from "./CustomDropzone";

const Container = styled.div`

`

const Title = styled.h1`
	font-size: 1rem;
	font-weight: 900;
`

const Upload = () => {
	return (
		<Container>
			<Title>Upload File</Title>
			<CustomDropzone/>
		</Container>
	)
}

export default Upload
