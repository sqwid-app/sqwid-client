import React from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion"

const Container = styled.div``

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	margin-bottom:0.75rem;
`

const ButtonsContainer = styled.div`
	width: 100%;
	display: grid;
	align-items:center;
	grid-template-columns: 1fr auto;
	gap: 1rem;
`

const ChooseBtn = styled(m.a)`
	display: flex;
	align-items: center;
	justify-content:center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 0;
	border-radius: 0.5rem;
	border: 2px solid var(--app-container-text-primary);
	color: var(--app-container-text-primary);
	outline: none;
	cursor: pointer;
	user-select:none;
`

const NewBtn = styled(m.a)`
	display: grid;
	place-items: center;
	font-family: "Nunito Sans", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	font-size: 1.25rem;
	font-weight: 700;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23787987FF' stroke-width='4' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	border-radius: 8px;
	color: var(--app-container-text-primary);
	outline: none;
	cursor: pointer;
	height: 2rem;
	width: 2rem;
	user-select:none;
`

const TitleSection = () => {
	return (
		<Container>
			<Title>Collection</Title>
			<ButtonsContainer>
				<LazyMotion features={domAnimation}>
					<ChooseBtn
						whileHover={{
							y: -2,
							x: 0,
							scale:1.01
						}}
						whileTap={{
							scale:0.99
						}}
						transition={{
							type: "tween",
							ease:"backOut",
						}}
					>Choose from existing</ChooseBtn>
					<NewBtn
						whileHover={{
							y: -2,
							x: 0,
							scale:1.01
						}}
						whileTap={{
							scale:0.98
						}}
						transition={{
							type: "tween",
							ease:"backOut",
						}}
					>+</NewBtn>
				</LazyMotion>
			</ButtonsContainer>
		</Container>
	)
}

export default TitleSection
