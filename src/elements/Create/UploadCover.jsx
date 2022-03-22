import FileContext from "@contexts/File/FileContext";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";

const border = css`
	border: 0.125rem solid var(--app-container-text-primary);
	border-radius: 0.5rem;
`;

const FilePreview = styled.div`
	overflow: hidden;
	padding: 0;
	max-width: 100%;
	min-height: ${props => (!props.fileType ? `100%` : `auto`)};
	overflow: hidden;
	display: grid;
	grid-template-columns: 1fr auto;
	place-items: center;
	width: 100%;

	img {
		max-width: 100%;
		max-height: 4rem;
		margin: 0;
		display: block;
		margin-right: auto;
		${border}
	}
`;

const Title = styled.h1`
	font-size: 1rem;
	font-weight: 900;
	margin-bottom: 0.5rem;
`;

const ImageThumbWrapper = styled.div`
	width: 100%;
`;

const Wrapper = styled.div`
	margin-top: 1.25rem;
	display: flex;
	align-items: center;
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 1rem 0;
		gap: 0.5rem;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23787987FF' stroke-width='4' stroke-dasharray='6%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
		border-radius: 16px;
		outline: none;
		width: 100%;
	}
`;

const DropzoneText = styled.p`
	margin-bottom: 0;
	padding: 0 2rem;
	color: var(--app-container-text-primary);
	font-size: 0.75rem;
	font-weight: 700;
	text-align: center;
`;

const DropzoneButton = styled(m.a)`
	display: flex;
	align-items: center;
	font-family: var(--font-family);
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.5rem 1rem;
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

const ImageThumb = () => {
	const { fileData, setFileData } = useContext(FileContext);
	let image = fileData.coverFile;
	return (
		<ImageThumbWrapper>
			<Title>Cover Image</Title>
			<FilePreview>
				<img src={URL.createObjectURL(image)} alt={image.name} />
				<LazyMotion features={domAnimation}>
					<DropzoneButton
						whileHover={{
							y: -5,
							x: 0,
							scale: 1.02,
						}}
						whileTap={{
							scale: 0.99,
						}}
						onClick={() =>
							setFileData({
								...fileData,
								coverFile: null,
							})
						}
					>
						Reset Image
					</DropzoneButton>
				</LazyMotion>
			</FilePreview>
		</ImageThumbWrapper>
	);
};

const Dropzone = props => {
	const initialDragText = "PNG, JPEG, GIF or WEBP. Max 2mb.";
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
		accept: `image/jpeg, image/gif, image/png, image/webp`,
		maxSize: props.maxSize,
	});
	useEffect(() => {
		if (acceptedFiles.length) {
			setFileData({
				...fileData,
				coverFile: acceptedFiles[0],
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
				? setDragText("File cannot be larger than 2mb")
				: setDragText(fileRejections[0].errors[0].message);
			setTimeout(() => {
				setDragText(initialDragText);
			}, 3000);
		}
		//eslint-disable-next-line
	}, [fileRejections]);
	return (
		<LazyMotion features={domAnimation}>
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
					Choose Cover
				</DropzoneButton>
			</div>
		</LazyMotion>
	);
};

const UploadCover = () => {
	const { fileData } = useContext(FileContext);
	return (
		<Wrapper>
			{!fileData.coverFile ? (
				<Dropzone maxSize={2000000} />
			) : (
				<ImageThumb />
			)}
		</Wrapper>
	);
};

export default UploadCover;
