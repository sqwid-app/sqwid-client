import LoadingIcon from "@static/svg/LoadingIcon";
import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
	height: 70vh;
	width: 100%;
	display: grid;
	place-items:center;
`
const FullPageLoading = () => {
	return (
		<LoadingContainer>
			<LoadingIcon size={64}/>
		</LoadingContainer>
	)
}

export default FullPageLoading
