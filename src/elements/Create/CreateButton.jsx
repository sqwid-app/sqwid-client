import FileContext from "@contexts/File/FileContext";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import FadeLoaderIcon from "@static/svg/FadeLoader";
// import bread from "@utils/bread";
import { createCollectible } from "@utils/createCollectible";
import { domAnimation, LazyMotion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";

const BtnContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
`;

const Btn = styled(BtnBaseAnimated)`
	height: 3rem;
	width: 50%;
	min-width: fit-content;
	display: grid;
	place-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.75rem 1.25rem;
	border-radius: 1000rem;
	color: var(--app-text);
	outline: none;
	border: none;
	cursor: pointer;
	user-select: none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
`;

const AnimBtn = ({ children, onClick, disabled }) => (
	<Btn
		whileTap={{
			scale: 0.97,
		}}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Btn>
);

export const CreateButton = () => {
	const { files, fileData } = useContext(FileContext);
	const [buttonText, setButtonText] = useState("Create Item");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const history = useHistory();
	const { showErrorModal } = useErrorModalHelper();

	const handleClick = () => {
		localStorage.removeItem("properties");
		setButtonText(<FadeLoaderIcon />);
		setIsSubmitting(true);
		if (
			fileData.file &&
			files.name.length &&
			!(files.royaltyRecipient && !Number(files.royalty))
		) {
			// let id = 0;

			createCollectible({ ...files, ...fileData })
				.then(res => {
					if (!res.error)
						// showErrorModal("Smack the goofy outta you 🤓");
						history.push(`/collectible/${res}`);
					else {
						// eslint-disable-next-line
						console.log(res.error);
						showErrorModal("Error creating collectible");
						// bread("Error creating collectible");
					}
				})
				.catch(err => {
					if (
						err
							.toString()
							.endsWith("{ index: 6, error: 2, message: None }")
					) {
						showErrorModal(
							"This account does not have enough balance to execute the transaction"
						);
					} else {
						showErrorModal(err.toString());
					}
					// bread(err.response.data.error);
					// bread(err.toString());
				});

			// .finally(()=>{
			// 	setTimeout(() => {
			// 	}, 250);
			// })
		} else {
			setButtonText("Create Item");
			setIsSubmitting(false);
		}
	};
	return (
		<BtnContainer>
			<LazyMotion features={domAnimation}>
				<AnimBtn
					disabled={isSubmitting ? true : false}
					onClick={handleClick}
				>
					{buttonText}
				</AnimBtn>
			</LazyMotion>
		</BtnContainer>
	);
};
