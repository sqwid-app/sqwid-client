import LoadingIcon from "@static/svg/LoadingIcon";
import React from "react";
import styled, { css } from "styled-components";

const padded = css`
	padding: 2rem;
`;

const LoadingContainer = styled.div`
	${props => props.navbar && padded}
`;

const Loading = ({ navbar }) => {
	return (
		<LoadingContainer navbar={navbar}>
			<LoadingIcon size="20" />
		</LoadingContainer>
	);
};

export default Loading;
