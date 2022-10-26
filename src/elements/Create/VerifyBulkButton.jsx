// import FileContext from "@contexts/File/FileContext";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import FadeLoaderIcon from "@static/svg/FadeLoader";
// import bread from "@utils/bread";
// import { createCollectible } from "@utils/createCollectible";
import { domAnimation, LazyMotion } from "framer-motion";
import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";
import VerifyContext from "@contexts/Verify/Verify";
import verifyBulk from "@utils/verifyBulk";
import bread from "@utils/bread";

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

export const VerifyBulkButton = () => {
	// const { files, fileData } = useContext(FileContext);
	const initialButtonText = "Verify";
	const { verifyData, setVerifyData } = useContext(VerifyContext);
	const [buttonText, setButtonText] = useState(initialButtonText);
	const [isSubmitting, setIsSubmitting] = useState(false);
	// const history = useHistory();
	const { showErrorModal } = useErrorModalHelper();

	const handleClick = () => {
		setButtonText(<FadeLoaderIcon />);
		setIsSubmitting(true);
		if (
			verifyData.json
		) {
			verifyBulk (verifyData.json).then (res => {
				setButtonText(initialButtonText);
				if (res.error) {
					showErrorModal (res.error);
				} else {
					bread("Collectibles have been verified");
				}
				setIsSubmitting(false);
			}).catch (err => {
				setButtonText(initialButtonText);
				setIsSubmitting(false);
				showErrorModal(err.toString ());
			}).finally (() => {
				setVerifyData ({
					...verifyData,
					json: null,
				})
			});
			
		} else {
			setButtonText(initialButtonText);
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
