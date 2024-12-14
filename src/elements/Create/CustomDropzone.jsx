import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import FilesContext from "@contexts/Files/FilesContext";
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
	font-size: 1rem;
	font-weight: 700;
	padding: 0.675rem 1.25rem;
	border-radius: 1000rem;
	background: ${props => (props.modal ? `var(--app-modal-btn-primary)` : `var(--app-container-bg-primary)`)};
	color: var(--app-container-text-primary);
	outline: none;
	border: none;
	cursor: pointer;
`;

const Dropzone = ({ modal, cover, acceptMultipleImages, maxSize = 1000000000 }) => {
	const initialDragText = cover ? "PNG, JPEG, GIF or WEBP. Max 100mb." : acceptMultipleImages ? "PNG, JPEG, MP4, WEBP. Max 1000mbs/100 files." : "PNG, JPEG, MP4, WEBP. Max 100mb";
	const {files, setFiles, fileData, setFileData } = useContext(FileContext);
	const {filess, setFiless, filesData, setFilesData } = useContext(FilesContext);
	// const { collectionBulkData, setCollectionBulkData } = useContext(CollectionBulkContext);
	const [dragText, setDragText] = useState(initialDragText);
	const { getRootProps, getInputProps, open, acceptedFiles, isDragActive, fileRejections } = useDropzone({
		noClick: true,
		noKeyboard: true,
		accept: cover ? constants.COVER_ACCEPTED_MIMETYPES : constants.CREATE_ACCEPTED_MIMETYPES,
		maxSize: maxSize,
		maxFiles: acceptMultipleImages ? 100 : 1,
	});
	console.log("acceptedFiles", acceptedFiles);
useEffect(() => {
	if (acceptedFiles.length) {
		console.log("cover==", cover);
		console.log("acceptMultipleImages==", acceptMultipleImages);

		if (cover && !acceptMultipleImages) {
			// Handle cover file only
			const coverFile = acceptedFiles[0];
			setFilesData(prevData => ({
				...prevData,
				coverFile: new File([coverFile], sanitize(coverFile.name), { type: coverFile.type }),
			}));
		} else if (acceptMultipleImages && !cover) {
			// Handle multiple files, but only if it's not a cover file
			const sanitizedFiles = acceptedFiles.map(file =>
				new File([file], sanitize(file.name), { type: file.type })
			);
			setFilesData(prevData => ({
				...prevData,
				files: [...prevData.files, ...sanitizedFiles],
			}));
		} else if (!acceptMultipleImages && !cover) {
			// Handle a single non-cover file
			const file = acceptedFiles[0];
			setFileData({
				...fileData,
				file: new File([file], sanitize(file.name), { type: file.type }),
			});
		}
	}
}, [acceptedFiles, acceptMultipleImages, cover, fileData, setFileData, setFilesData]);


	// console.log("file info for single file", files);
	// console.log("file Data for single file", fileData);


	console.log("files info for bulk", filess);
	console.log("files Data for bulk", filesData);


	useEffect(() => {
		setDragText(isDragActive ? "Drop your files here" : initialDragText);
	}, [isDragActive, initialDragText]);

	useEffect(() => {
		if (fileRejections.length) {
			const errorMessage =
				fileRejections[0].errors[0].code === "file-too-large"
					? "File cannot be larger than 100mb"
					: fileRejections[0].errors[0].message;
			setDragText(errorMessage);
			setTimeout(() => setDragText(initialDragText), 3000);
		}
	}, [fileRejections, initialDragText]);

	return (
		<div {...getRootProps({ className: "dropzone" })}>
			<input {...getInputProps()} />
			<DropzoneText>{dragText}</DropzoneText>
			<DropzoneButton modal={modal} onClick={open} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.99 }}>
			 Choose File{acceptMultipleImages && 's'}
			</DropzoneButton>
		</div>
	);
};

const CustomDropzone = ({ modal, cover, acceptMultipleImages }) => (
	<LazyMotion features={domAnimation}>
		<Wrapper>
			<Dropzone modal={modal} cover={cover} acceptMultipleImages={acceptMultipleImages} />
		</Wrapper>
	</LazyMotion>
);

export default CustomDropzone;
