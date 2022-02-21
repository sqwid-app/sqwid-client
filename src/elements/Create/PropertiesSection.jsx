import React, { useState } from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"
import PropertiesModal from "./PropertiesModal";

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	margin-bottom: 0.75rem;
`

const ChooseBtn = styled(m.a)`
	display: flex;
	align-items: center;
	justify-content:center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 0;
	border-radius: 0.5rem;
	border: 0.125rem solid var(--app-container-text-primary);
	color: var(--app-container-text-primary);
	outline: none;
	cursor: pointer;
	user-select:none;
`

const PropertiesSection = () => {
	const [showModal, setShowModal] = useState(false)
	return (
		<Container>
			<Title>Properties</Title>
			<LazyMotion features={domAnimation}>
				<ChooseBtn
					whileHover={{
						y: -2,
						x: 0,
						scale: 1.01
					}}
					whileTap={{
						scale: 0.99
					}}
					onClick={() => setShowModal(true)}
				>Add properties</ChooseBtn>
			</LazyMotion>
			<PropertiesModal isActive={showModal} setIsActive={setShowModal} />
		</Container>
	)
}

export default PropertiesSection
