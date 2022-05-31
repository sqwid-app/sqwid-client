import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import "simplebar/dist/simplebar.min.css";
import { LazyMotion, domAnimation } from "framer-motion";
import LoadingIcon from "@static/svg/LoadingIcon";
import { getCurrentNetwork } from "@utils/network";
import bread from "@utils/bread";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`;

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const BackDrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	min-height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
	display: grid;
	place-items: center;
	z-index: 60;
`;

const Modal = styled.div`
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 15;
	width: 570px;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	word-wrap: break-word;
	iframe {
		border-radius: 0.5rem;
		border: 1px solid #4c4c4c;
		.nav-content.navigation {
			border: none;
		}
	}
	.hidden {
		display: none;
	}
	${props => (!props.remove ? modalEntryAnim : modalExitAnim)}
`;

const LoadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 6rem;
`;

const elemContains = (rect, x, y) => {
	return (
		rect.x <= x &&
		x <= rect.x + rect.width &&
		rect.y <= y &&
		y <= rect.y + rect.height
	);
};

const RoyaltyReceiverModal = ({ isVisible, setIsVisible, selectedAddress }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isVisible);
	const [isLoading, setIsLoading] = useState(true);
	const modalRef = useRef();
	//eslint-disable-next-line
	useEffect(() => {
		if (!isVisible) {
			setTimeout(() => {
				setElemIsVisible(isVisible);
			}, 200);
		} else {
			setElemIsVisible(isVisible);
		}
	}, [isVisible]);

	const splitzUrl =
		getCurrentNetwork() === "reef_testnet"
			? "https://splitz-dapp.web.app/testnet/create"
			: "https://splitz-dapp.web.app/create";

	const handleClickOutside = e => {
		let rect = modalRef.current.getBoundingClientRect();
		if (!elemContains(rect, e.clientX, e.clientY)) {
			setElemIsVisible(false);
			setIsVisible(false);
			setIsLoading(true);
		}
	};

	useEffect(() => {
		if (selectedAddress) {
			window.addEventListener("message", ev => {
				if (
					typeof ev.data === "object" &&
					ev.data.message &&
					ev.data.type === "accountsLoaded"
				) {
					setIsLoading(false);
					sendIframeMessage();
				}
			});

			sendIframeMessage();
		}
	}, [selectedAddress]);

	function sendIframeMessage() {
		if (selectedAddress) {
			const iframe = document.getElementById("iframe");
			if (isIFrame(iframe) && iframe.contentWindow) {
				iframe.contentWindow.postMessage(
					{ type: "addressChange", message: selectedAddress },
					"*"
				);
			}
		}
	}

	function onIframeError(error) {
		console.log("iframe error", error);
		bread("Error loading Splitz page");
		setElemIsVisible(false);
		setIsVisible(false);
		setIsLoading(true);
	}

	const isIFrame = input => input !== null && input.tagName === "IFRAME";

	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible && (
				<BackDrop remove={!elemIsVisible} onClick={handleClickOutside}>
					<Modal remove={!elemIsVisible} ref={modalRef}>
						<LoadingContainer
							className={`${!isLoading ? "hidden" : ""}`}
						>
							<LoadingIcon size={64} />
						</LoadingContainer>
						<iframe
							id="iframe"
							src={splitzUrl}
							height="620"
							width="100%"
							onError={error => onIframeError(error)}
							className={`${isLoading ? "hidden" : ""}`}
						></iframe>
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	);
};

export default RoyaltyReceiverModal;
