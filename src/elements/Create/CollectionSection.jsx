import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import CollectionModal from "./CollectionModal";
import FileContext from "@contexts/File/FileContext";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	margin-bottom: 0.75rem;
`;

const ButtonsContainer = styled.div`
	width: 100%;
	display: grid;
	align-items: center;
	grid-template-columns: 1fr auto;
	gap: 1rem;
`;

const ChooseBtn = styled(m.a)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 0;
	border-radius: 0.5rem;
	border: 0.125rem solid var(--app-container-text-primary);
	color: var(--app-container-text-primary);
	outline: none;
	cursor: pointer;
	user-select: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const NewBtn = styled(m.a)`
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1.25rem;
	font-weight: 700;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23787987FF' stroke-width='4' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	border-radius: 8px;
	color: var(--app-container-text-primary);
	outline: none;
	cursor: pointer;
	height: 2rem;
	width: 2rem;
	user-select: none;
`;

const ButtonText = styled.span`
	max-width: 10rem;
	overflow: hidden;
	white-space: nowrap;
	display: block;
	text-overflow: ellipsis;
`;

const CollectionSection = () => {
	const [isCollectionActive, setIsCollectionActive] = useState({
		status: false,
		type: "",
	});
	const { files } = useContext(FileContext);
	return (
		<Container>
			<Title>Collection</Title>
			<ButtonsContainer>
				<LazyMotion features={domAnimation}>
					<ChooseBtn
						whileHover={{
							y: -2,
							x: 0,
							scale: 1.01,
						}}
						whileTap={{
							scale: 0.99,
						}}
						onClick={() =>
							setIsCollectionActive({
								status: true,
								type: "choose",
							})
						}
					>
						<ButtonText>{`${
							files.collectionName.length
								? files.collectionName
								: `Choose from existing`
						}`}</ButtonText>
					</ChooseBtn>
					<NewBtn
						whileHover={{
							y: -2,
							x: 0,
							scale: 1.01,
						}}
						whileTap={{
							scale: 0.98,
						}}
						onClick={() =>
							setIsCollectionActive({ status: true, type: "new" })
						}
					>
						+
					</NewBtn>
				</LazyMotion>
			</ButtonsContainer>
			<CollectionModal
				isActive={isCollectionActive}
				setIsActive={setIsCollectionActive}
			/>
		</Container>
	);
};

export default CollectionSection;
