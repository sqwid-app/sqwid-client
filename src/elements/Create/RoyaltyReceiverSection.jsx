import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import RoyaltyReceiverModal from "./RoyaltyReceiverModal";
import bread from "@utils/bread";

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

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline: none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	padding-right: 2ch;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	position: relative;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
`;

const BtnContainer = styled.div`
	position: relative;
	span {
		text-transform: capitalize;
	}
	.popup {
		width: 200px;
		text-align: center;
		padding-top: 0.25rem;
		position: absolute;
		font-weight: 800;
		bottom: calc(-50% - 2rem);
		left: 50%;
		transform: translateX(-50%);
		opacity: 0;
		transition: opacity 0.2s ease 0.15s;
	}
	&:hover {
		.popup {
			opacity: 1;
		}
	}
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

const HelperText = styled.p`
	font-weight: 700;
	font-size: 0.75rem;
	color: var(--app-container-text-primary);
	padding: 0.0675rem 0;
`;

const RoyaltyReceiverSection = ({ bulk = false }) => {
	const [isRoyaltyModalVisible, setIsRoyaltyModalVisible] = useState(false);
	const { files, setFiles } = useContext(FileContext);
	const { collectionBulkData, setCollectionBulkData } = useContext(
		CollectionBulkContext
	);
	const signer = JSON.parse(localStorage.getItem("auth"))?.auth;
	const selectedAddress =
		signer && signer.evmAddress ? signer.evmAddress : "";

	const handleInput = e => {
		bulk
			? setCollectionBulkData({
					...collectionBulkData,
					royaltyRecipient: e.target.value,
			  })
			: setFiles({ ...files, royaltyRecipient: e.target.value });
	};

	return (
		<Container>
			<Title>Royalties receiver</Title>
			<ButtonsContainer>
				<LazyMotion features={domAnimation}>
					<InputContainer
						value={
							bulk
								? collectionBulkData.royaltyRecipient
								: files.royaltyRecipient
						}
						onChange={handleInput}
						placeholder={`Receiver address`}
						onBlur={e =>
							e.target.value === "" &&
							(bulk
								? setCollectionBulkData({
										...collectionBulkData,
										royaltyRecipient: "",
								  })
								: setFiles({ ...files, royaltyRecipient: "" }))
						}
					/>
					<BtnContainer>
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
								!selectedAddress
									? bread("No address selected")
									: setIsRoyaltyModalVisible(true)
							}
						>
							+
						</NewBtn>
						<p className="popup">
							Create payment splitter contract with Splitz app
						</p>
					</BtnContainer>
				</LazyMotion>
			</ButtonsContainer>
			<HelperText>Leave blank to use current address.</HelperText>
			<RoyaltyReceiverModal
				isVisible={isRoyaltyModalVisible}
				setIsVisible={setIsRoyaltyModalVisible}
				selectedAddress={selectedAddress}
			/>
		</Container>
	);
};

export default RoyaltyReceiverSection;
