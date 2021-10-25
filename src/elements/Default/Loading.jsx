import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
	padding: 2rem;
	.loader {
		font-size: 10px;
		margin: 50px auto;
		text-indent: -9999em;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: ${props=>props.color?props.color:`var(--app-container-bg-primary)`};
		background: linear-gradient(to right, ${props=>props.color?props.color:`var(--app-container-bg-primary)`} 10%, rgba(255, 255, 255, 0) 42%);
		position: relative;
		-webkit-animation: load3 1.4s infinite linear;
		animation: load3 1.4s infinite linear;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
	}
	.loader:before {
		width: 50%;
		height: 50%;
		background: ${props=>props.color?props.color:`var(--app-container-bg-primary)`};
		border-radius: 100% 0 0 0;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
	}
	.loader:after {
		background: ${props=>props.bg?props.bg:`hsl(61, 79%, 49%)`};
		width: 75%;
		height: 75%;
		border-radius: 50%;
		content: '';
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	@-webkit-keyframes load3 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes load3 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

`

const Loading = () => {
	return (
		<LoadingContainer>
			<div className="loader"></div>
		</LoadingContainer>
	)
}

export default Loading
