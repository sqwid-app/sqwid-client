import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
	from{
		transform: rotate(0deg);
	}
	to{
		transform: rotate(360deg);
	}
`

const SVG = styled.svg`
	background: transparent;
	fill: white;
	animation: ${rotate} 1s linear infinite;
`

const FadeLoaderIcon = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20.2 21.15" className="loader">
			<defs>
				<clipPath id="a" transform="translate(-1.9 -0.94)">
					<path d="M14.8,4.41l-.27-.11-.11,0A1,1,0,0,1,13.87,3a1,1,0,0,1,1.29-.56l.34.14Z" style={{ fill: "none" }} />
				</clipPath>
				<clipPath id="b" transform="translate(-1.9 -0.94)">
					<path d="M11.64,1.92l.36,0a1,1,0,0,1,1.05,1,1,1,0,0,1-1,1H12l-.29,0Z" style={{ fill: "none" }} />
				</clipPath>
			</defs>
			<g>
				<g style={{ clipPath: "url(#a)" }}>
					<image width="23" height="17" transform="translate(8.9 -0.22) scale(0.24)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAARCAYAAAA2cze9AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAZ0lEQVQ4T+2T0QqAIAxFz6z//2Afsoe8ZhFFdHvzwNjEcRhDo5TCX6Snhi8M+SVDLgKYdJhvGt8SNWDzJvfkB1zyOEUCsksu+tXYJoddGkAGv7xNDR65dqw668Il73PD8c6XmtvnESuO8Qcw2VptwwAAAABJRU5ErkJggg==" />
				</g>
				<image width="86" height="86" transform="translate(-0.22 0.74) scale(0.24)" xlinkHref="data:image/png;base64,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" />
				<g style={{ clipPath: "url(#b)" }}>
					<image width="22" height="10" transform="translate(8.9 0.74) scale(0.24)" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAKCAYAAACwoK7bAAAACXBIWXMAAC4jAAAuIwF4pT92AAAANElEQVQoU2P8//8/AxJA4VACWBioaBgyYCKkgFwwajAc0NRgRkKKyAE0czELIQVIgCSfAQANdgUVV7kY8wAAAABJRU5ErkJggg==" />
				</g>
			</g>
		</SVG>
	)
}

export default FadeLoaderIcon
