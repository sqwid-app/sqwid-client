import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import FileContext from "@contexts/File/FileContext";
import { sanitize } from "@utils/textUtils";
import constants from "@utils/constants";

const Wrapper = styled.div`
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1.5rem;
		padding: 2rem;
		margin-top: 1rem;
		width: 100%;
		height: 15rem;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23787987FF' stroke-width='4' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
		border-radius: 1rem;
		outline: none;
		@media (max-width: 1224px) {
		}
	}
`;

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: var(--app-container-text-primary);
	font-size: 1rem;
	font-weight: 700;
	text-align: center;
`;

const DropzoneButton = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: var(--font-family);
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 1.25rem;
	border-radius: 1000rem;
	background: ${props =>
		props.modal
			? `var(--app-modal-btn-primary)`
			: `var(--app-container-bg-primary)`};
	color: var(--app-container-text-primary);
	outline: none;
	border: none;
	cursor: pointer;
	z-index: 2;
	user-select: none;
`;

const Dropzone = props => {
	// const initialDragText = props.modal ? "PNG, JPEG, GIF or WEBP. Max 30mb." : "PNG, GIF, WEBP, MP4, or MP3. Max 30mb."
	// const initialDragText = "PNG or JPEG. Max 30mb.";
	const initialDragText = "PNG, JPEG, MP4. Max 30mb.";
	const { fileData, setFileData } = useContext(FileContext);
	const [dragText, setDragText] = useState(initialDragText);
	const {
		getRootProps,
		getInputProps,
		open,
		acceptedFiles,
		isDragActive,
		fileRejections,
	} = useDropzone({
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		// accept: `image/jpeg, image/gif, image/png, image/webp, ${!props.modal&&`audio/mpeg, video/mp4`}`,
		accept: `${constants.CREATE_ACCEPTED_MIMETYPES.join(", ")}`,
		maxSize: props.maxSize,
	});
	useEffect(() => {
		if (acceptedFiles.length) {
			let file = acceptedFiles[0];
			setFileData({
				...fileData,
				file: new File([file], sanitize(file.name), {
					type: file.type,
				}),
			});
		}
		//eslint-disable-next-line
	}, [acceptedFiles]);
	useEffect(() => {
		isDragActive
			? setDragText(`Drop your files here`)
			: setDragText(initialDragText);
		//eslint-disable-next-line
	}, [isDragActive]);
	useEffect(() => {
		if (fileRejections.length) {
			fileRejections[0].errors[0].code === "file-too-large"
				? setDragText("File cannot be larger than 30mb")
				: setDragText(fileRejections[0].errors[0].message);
			setTimeout(() => {
				setDragText(initialDragText);
			}, 3000);
		}
		//eslint-disable-next-line
	}, [fileRejections]);
	return (
		<div {...getRootProps({ className: "dropzone" })}>
			<input {...getInputProps()} />
			<DropzoneText>{dragText}</DropzoneText>
			<DropzoneButton
				modal={props.modal}
				onClick={open}
				whileHover={{
					y: -5,
					x: 0,
					scale: 1.02,
				}}
				whileTap={{
					scale: 0.99,
				}}
			>
				Choose File
			</DropzoneButton>
		</div>
	);
};

const CustomDropzone = ({ modal }) => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper>
				<Dropzone modal={modal} maxSize={30000000} />
			</Wrapper>
		</LazyMotion>
	);
};

export default CustomDropzone;
