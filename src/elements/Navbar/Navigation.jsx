import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import LinkGroups from "./LinkGroups";

const swipeLeft = keyframes`
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`;

const swipeRight = keyframes`
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(100%);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
	animation: ${swipeLeft} 0.2s var(--easing) forwards;
`;

const modalExitAnim = css`
	animation: ${swipeRight} 0.2s ease forwards;
`;

const Wrapper = styled.div`
	position: absolute;
	height: 100vh;
	width: 100%;
	top: 0;
	background: var(--app-container-bg-primary);
	font-family: var(--font-family);
	padding-top: 6rem;
	padding-left: 2rem;
	color: var(--app-text);
	z-index: -1;
	${props => (!props.remove ? modalEntryAnim : modalExitAnim)};
`;

const Navigation = ({ isOpen }) => {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		if (isOpen === false) {
			setTimeout(() => {
				setIsVisible(false);
			}, 200);
		} else {
			setIsVisible(isOpen);
		}
	}, [isOpen]);
	return (
		<>
			{isVisible && (
				<Wrapper remove={!isOpen}>
					<LinkGroups />
				</Wrapper>
			)}
		</>
	);
};

export default Navigation;
