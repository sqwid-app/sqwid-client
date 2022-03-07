import React, { useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Path = props => (
	<motion.path
		fill="transparent"
		strokeWidth="3"
		stroke="#fff"
		strokeLinecap="round"
		{...props}
	/>
);

const Button = styled.button`
	outline: none;
	border: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	cursor: pointer;
	width: 2.5rem;
	height: 2.5rem;
	display: grid;
	place-items: center;
	border-radius: 1000rem;
	background: var(--app-container-bg-primary);
`;

export const MenuToggle = ({ isOpen, toggleOpen }) => {
	const containerRef = useRef(null);
	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			ref={containerRef}
		>
			<Button onClick={() => toggleOpen()}>
				<svg width="20" height="20" viewBox="0 0 22 18">
					<Path
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5" },
							open: { d: "M 3 16.5 L 17 2.5" },
						}}
					/>
					<Path
						d="M 2 9.423 L 20 9.423"
						variants={{
							closed: { opacity: 1 },
							open: { opacity: 0 },
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346" },
							open: { d: "M 3 2.5 L 17 16.346" },
						}}
					/>
				</svg>
			</Button>
		</motion.nav>
	);
};
