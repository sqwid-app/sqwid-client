import FileContext from "@contexts/File/FileContext";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import bread from "@utils/bread";
import { createBulkCollectibles } from "@utils/createBulkCollectibles";
import { domAnimation, LazyMotion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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

export const CreateBulkButton = () => {
	const { files, fileData } = useContext(FileContext);
	const [buttonText, setButtonText] = useState("Create Collection");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const history = useHistory();
	const handleClick = () => {
		setButtonText(<FadeLoaderIcon />);
		setIsSubmitting(true);

		console.log("fileData", fileData);
		console.log("files", files);

		if (fileData.file && files.name.length) {
			createBulkCollectibles({ ...files, ...fileData })
				.then(res => {
					if (!res.error) history.push(`/collections/${res}`);
					else {
						// eslint-disable-next-line
						console.log(res.error);
						bread("Error creating collection");
					}
				})
				.catch(err => {
					bread(err.toString());
				});
		} else {
			setButtonText("Create Collection");
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
