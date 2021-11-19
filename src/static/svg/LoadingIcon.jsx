import React from "react";
import styled, { keyframes } from "styled-components";

const animateLoadingLogo = keyframes`
	0% {
		stroke-dashoffset: 0px;
		fill: currentColor;
	}
	25% {
		fill: transparent;
	}
	50% {
		fill: transparent;
	}
	75%{
		stroke-width: 2.5px;
	}
	90%{
		stroke-dashoffset: 110px;
	}
	100%{
		stroke-dashoffset: 0px;
		fill: currentColor;
		stroke-width: 0;
	}
`

const rotateLoadingLogo = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
`

const Wrapper = styled.div`
	cursor: pointer;
	display: grid;
	place-items:center;
	svg {
		stroke: currentColor;
		stroke-width: 2.5px;
		stroke-dasharray: 50px;
		stroke-dashoffset: 50px;
		stroke-linecap: round;
		stroke-linejoin: round;
		animation: ${animateLoadingLogo} 1.2s ease infinite, ${rotateLoadingLogo} 1.2s cubic-bezier(0.68, -0.55, 0.51, 1.57) infinite;
	}
`

const LoadingIcon = ({ size }) => {
	return (
		<Wrapper>
			<svg xmlnsDc="http://purl.org/dc/elements/1.1/" xmlnsCc="http://creativecommons.org/ns#" xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlnsSvg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape" width={size?size:`64`} height={size?size:`64`} viewBox="0 0 100 100">
				<path d="M50 7C29.554 7 13 23.554 13 44v3c0 3.217 1.358 5.972 3.219 7.875C18.079 56.778 20.417 58 23 58h8v13c0 2.652-1.59 4-4 4-1.284 0-2.549-.911-3.344-2.406a3.006 3.006 0 1 0-5.312 2.812C19.954 78.436 23.057 81 27 81c5.345 0 10-4.342 10-10V58h4v23c0 2.652-1.59 4-4 4-1.153 0-2.234-.463-2.844-1.094a3 3 0 1 0-4.312 4.156C31.749 90.031 34.367 91 37 91c5.345 0 10-4.342 10-10V58h6v23c0 5.658 4.655 10 10 10 2.633 0 5.251-.969 7.156-2.938a3 3 0 1 0-4.312-4.156C65.234 84.536 64.154 85 63 85c-2.41 0-4-1.348-4-4V58h4v13c0 5.658 4.655 10 10 10 3.943 0 7.046-2.564 8.656-5.594a3.006 3.006 0 1 0-5.312-2.812C75.549 74.089 74.284 75 73 75c-2.41 0-4-1.348-4-4V58h8c2.583 0 4.92-1.222 6.781-3.125A11.265 11.265 0 0 0 87 47v-3C87 23.554 70.446 7 50 7zm0 6c17.226 0 31 13.774 31 31v3c0 1.533-.642 2.747-1.531 3.656C78.579 51.566 77.417 52 77 52H23c-.417 0-1.58-.434-2.469-1.344C19.642 49.746 19 48.533 19 47v-3c0-17.226 13.774-31 31-31zM40 33c-4.38 0-8 3.62-8 8a3 3 0 1 0 6 0c0-1.16.84-2 2-2 1.16 0 2 .84 2 2a3 3 0 1 0 6 0c0-4.38-3.62-8-8-8zm20 0c-4.38 0-8 3.62-8 8a3 3 0 1 0 6 0c0-1.16.84-2 2-2 1.16 0 2 .84 2 2a3 3 0 1 0 6 0c0-4.38-3.62-8-8-8z"/>
			</svg>
		</Wrapper>
	)
}

export default LoadingIcon
