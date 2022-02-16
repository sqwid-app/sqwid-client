import { useState } from "react";
import styled from "styled-components";

const MagnifyingGlass = styled.div`
	position: absolute;
	pointer-events: none;
	border-radius: 1000rem;
	opacity: 1;
	border: 0.1rem solid var(--app-text);
	background-color: var(--app-background);
	background-image: url("${props => props.src}");
	background-repeat: no-repeat;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`
const Image = styled.img`
	height: ${props => props.height};
	width: ${props => props.height};
	cursor: none;
`

const ImageMagnifier = ({
	src,
	width,
	height,
	alt = "picture",
	magnifierHeight = 250,
	magnifierWidth = 250,
	zoomLevel = 2.5
}) => {
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = useState(false);
	const [[x, y], setXY] = useState([0, 0]);
	const handleEnter = (e) => {
		const elem = e.currentTarget;
		const { width, height } = elem.getBoundingClientRect();
		setSize([width, height]);
		setShowMagnifier(true);
	}
	const handleMove = (e) => {

		const elem = e.currentTarget;
		const { top, left } = elem.getBoundingClientRect();

		// const x = e.pageX - left - window.pageXOffset;
		// const y = e.pageY - top - window.pageYOffset;

		const x = e.clientX - left;
		const y = e.clientY - top;

		setXY([x, y]);
	}
	const handleLeave = () => {
		setShowMagnifier(false);
	}
	return (
		<Container>
			<Image
				src={src}
				height={height}
				width={width}
				onMouseEnter={handleEnter}
				onMouseMove={handleMove}
				onMouseLeave={handleLeave}
				onContextMenu={(e) => e.preventDefault()}
				alt={alt}
			/>

			<MagnifyingGlass
				src={src}
				style={{
					display: showMagnifier ? "" : "none",
					height: `${magnifierHeight}px`,
					width: `${magnifierWidth}px`,
					top: `${y - magnifierHeight / 2}px`,
					left: `${x - magnifierWidth / 2}px`,
					backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
					backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
					backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
				}}
			></MagnifyingGlass>
		</Container>
	);
}

export default ImageMagnifier;