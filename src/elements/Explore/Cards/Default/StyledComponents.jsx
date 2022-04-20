import { respondTo } from "@styles/styledMediaQuery";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0.75rem 1.25rem;
`;

export const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.h2`
	font-weight: 900;
	font-size: 1.25rem;
	max-width: 9rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const Price = styled.label`
	font-weight: 900;
	font-size: 1.125rem;
	cursor: pointer;
	max-width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--app-container-text-primary-hover);
	svg {
		display: inline-block;
		vertical-align: sub;
		height: 1.375rem;
		width: 1.375rem;
	}
	span {
		max-width: 10rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const Amount = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary);
	margin-left: auto;
`;

export const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const Fee = styled(Price)`
	font-size: 1rem;
	color: var(--app-container-text-primary);
`;

export const TimeSpan = styled.p`
	font-weight: 900;
	color: var(--app-container-text-primary-hover);
`;

export const Logo = styled.div`
	height: 1.5rem;
	width: 1.5rem;
	border-radius: 1000rem;
	border: 0.1rem solid var(--app-text);
	background-image: url("${props => props.url && props.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

export const LenderContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	p {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
	h6 {
		color: inherit;
		font-weight: 800;
		font-size: 0.75rem;
	}
	span {
		font-weight: 700;
		font-size: 1rem;
		color: var(--app-container-text-primary);
	}
`;

export const NotStyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
	font-weight: 900;
	font-size: 1rem;
	max-width: 20rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export const LenderName = styled.div`
	max-width: 8rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	font-style: normal;
	${respondTo.md`
		max-width: 5rem;
	`}
`;

export const TotalAddresses = styled.div`
	position: relative;
	font-weight: 900;
	font-size: 1.125rem;
	color: var(--app-container-text-primary-hover);
	cursor: pointer;
	max-width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: flex;
	align-items: center;
	gap: 0.25rem;
	span {
		line-height: 25%;
	}
`;

export const Accumulated = styled.p``;
