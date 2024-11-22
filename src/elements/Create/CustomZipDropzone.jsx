import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { uploadChunk } from "@utils/createBulkCollectibles";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import ProgressBar from "@elements/Sac/ProgressBar";
import bread from "@utils/bread";

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
		height: 9rem;
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
	background: var(--app-container-bg-primary);
	color: var(--app-container-text-primary);
	outline: none;
	border: none;
	cursor: pointer;
	z-index: 2;
	user-select: none;
`;

const CHUNK_SIZE = 20000000; // 20MB

const Dropzone = props => {
	const { collectionBulkData, setCollectionBulkData } = useContext(
		CollectionBulkContext
	);
	const initialDragText = "Max 1gb.";
	const [file, setFile] = useState();
	const [totalChunks, setTotalChunks] = useState(0);
	const [currentChunkIndex, setCurrentChunkIndex] = useState(-1);
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
		accept: "application/zip",
		maxSize: props.maxSize,
	});
console.log("fileRejections", fileRejections);
console.log("dragText", dragText);
	useEffect(() => {
		if (acceptedFiles.length) {
			setFile(acceptedFiles[0]);
		}
		//eslint-disable-next-line
	}, [acceptedFiles]);

	useEffect(() => {
		isDragActive
			? setDragText(`Drop your file here`)
			: setDragText(initialDragText);
		//eslint-disable-next-line
	}, [isDragActive]);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections[0].errors[0].code === "file-too-large"
				? setDragText("File cannot be lager than 1gb")
				: setDragText(fileRejections[0].errors[0].message);
			setTimeout(() => {
				setDragText(initialDragText);
			}, 3000);
		}
		//eslint-disable-next-line
	}, [fileRejections]);

	useEffect(() => {
		if (file) {
			setTotalChunks(Math.ceil(file.size / CHUNK_SIZE));
			setCurrentChunkIndex(0);
		}
	}, [file]);

	useEffect(() => {
		if (currentChunkIndex > -1) {
			const reader = new FileReader();
			const from = currentChunkIndex * CHUNK_SIZE;
			const to = from + CHUNK_SIZE;
			const blob = file.slice(from, to);
			reader.onload = readerEvent =>
				uploadChunk(
					readerEvent.target.result,
					file.name,
					currentChunkIndex,
					totalChunks
				)
					.then(response => {
						if (response.error) {
							setFile(null);
							setCurrentChunkIndex(-1);
							setTotalChunks(0);
							bread("An error occured uploading zip file");
							return;
						}
						if (currentChunkIndex === totalChunks - 1) {
							setCurrentChunkIndex(-1);
							setCollectionBulkData({
								...collectionBulkData,
								zipFile: file.name,
							});
						} else {
							setCurrentChunkIndex(currentChunkIndex + 1);
						}
					})
					.catch(err => {
						setFile(null);
						setCurrentChunkIndex(-1);
						setTotalChunks(0);
						bread("An error occured uploading zip file");
					});
			reader.readAsDataURL(blob);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChunkIndex]);

	return (
		<div {...getRootProps({ className: "dropzone" })}>
			<input {...getInputProps()} />
			{!file && (
				<>
					<DropzoneText>{dragText}</DropzoneText>
					<DropzoneButton
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
				</>
			)}
			{file && currentChunkIndex > -1 && (
				<>
					<DropzoneText>Uploading file</DropzoneText>
					<ProgressBar
						percent={Math.round(
							(currentChunkIndex / totalChunks) * 100
						)}
					/>
				</>
			)}
			{file && currentChunkIndex === -1 && (
				<DropzoneText>File {file.name} uploaded</DropzoneText>
			)}
		</div>
	);
};

const CustomZipDropzone = () => {
	return (
		<LazyMotion features={domAnimation}>
			<Wrapper>
				<Dropzone maxSize={1000000000} />
			</Wrapper>
		</LazyMotion>
	);
};

export default CustomZipDropzone;
