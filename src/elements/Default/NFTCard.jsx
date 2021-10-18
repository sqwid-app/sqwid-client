import React from "react";
import styled from "styled-components";
import { useSpring, animated } from 'react-spring';

const NFTCardContainer = styled(animated.div)`
	cursor: pointer;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%), url(${props=>props.src&&props.src});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	border-radius: 1rem;
	height: 100%;
	padding: 1.5rem 1.25rem;
	min-width: 8rem;
	&:first-child{
		grid-column: span 1;
		grid-row-start: span 2;
		min-width: 16rem;
	}
	h1{
		font-size: ${props=>props.fullHeight?`1.75rem`:`1rem`};
		font-weight: ${props=>props.fullHeight?`900`:`800`};
	}
	h4{
		font-size: ${props=>props.fullHeight?`1em`:`0.75rem`};
		margin-top: 0.25rem;
		font-weight: 200;
	}
`

const NFTCard = ({ src, title, author, fullHeight }) => {
	const calc = (x, y) => [-(y - window.innerHeight / 2) / 200, (x - window.innerWidth / 2) / 200, 1]
	const trans = (x, y, s) => `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
	const [props, set] = useSpring(() => ({
			xys: [0, 0, 1],
			config: {
				mass: 10,
				tension: 750,
				friction: 50
			}
		})
	);
	return (
		<NFTCardContainer
			fullHeight={fullHeight}
			src={src}
			onMouseMove={({
				clientX: x,
				clientY: y
			}) => set({ xys: calc(x, y) })}
			onMouseLeave={() => set({ xys: [0, 0, 1] })}
			style={{ transform: props.xys.to(trans) }}
		>
			<h1>{title}</h1>
			<h4>by {author}</h4>
		</NFTCardContainer>
	)
}

export default NFTCard
