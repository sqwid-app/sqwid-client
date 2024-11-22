import FilesContext from "@contexts/Files/FilesContext";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import UploadCover from "./UploadCover";
import { LazyMotion, domAnimation } from "framer-motion";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";

const border = css`
	border: 0.125rem solid var(--app-container-text-primary);
	border-radius: 1rem;
`;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const PreviewContainer = styled.div`
	min-height: 50%;
	max-height: 100%;
	margin-top: 0.5rem;
	user-select: none;
	display: flex;
	flex-wrap: wrap; /* Allow multiple items to wrap */
	gap: 1rem; /* Spacing between items */
`;

const FilePreview = styled.div`
	${props => !props.fileType && border};
	overflow: ${props => (props.fileType === 'cover' ? 'hidden' : 'overlay')};
	display: ${props => (props.fileType === 'cover' ? 'grid' : 'flex')};
	place-items: center;
	padding: 0;

	max-width: 100%;
	min-height: ${props => (!props.fileType ? `100%` : `auto`)};
	flex-wrap: ${props => (props.fileType === 'cover' ? 'nowrap' : 'wrap')};
	gap: ${props => (props.fileType === 'cover' ? '0' : '0.33%')};

	img {
		max-width: ${props => (props.fileType === 'cover' ? '100%' : '33%')};
		max-height: 20rem; /* Set a maximum height for images */
		display: block;
		${border};
		border-radius: 0.5rem;
		margin-bottom: 0.5rem;
	}
	video {
		max-width: 100%;
		max-height: 16rem; /* Set a maximum height for videos */
		display: block;
		object-fit: cover;
		${border}
		border-radius: 0.5rem;
	}
	audio {
		max-width: 100%;
		max-height: 100%;
		margin: 0 auto;
		display: block;
	}
	p {
		padding: 1.5rem;
		padding-top: 5rem;
		padding-bottom: 5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
`;

const Group = styled.div`
	width: 100%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
`;

const Btn = styled(BtnBaseAnimated)`
	--btn-base: 347, 76%;
	background: transparent;
	background: hsl(var(--btn-base), 50%);
	color: hsl(var(--btn-base), 97%);
	border-radius: 1000rem;
	font-size: 0.875rem;
	font-weight: 800;
	padding: 0.25rem 0.75rem;
	text-align: center;
	margin: 1rem 0;
	cursor: pointer;
`;

const ClearMediaButton = ({ children, onClick, disabled }) => (
	<Btn
		whileHover={{
			y: -5,
			x: 0,
			scale: 1.02,
		}}
		whileTap={{
			scale: 0.99,
		}}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Btn>
);

const ClearMedia = ({fileType}) => {
	const { filesData, setFilesData } = useContext(FilesContext); // Use filesData instead of fileData
	const handleClick = () => {
		if(fileType === 'images') {
		setFilesData({
			...filesData,
			files: [], // Clear all files
		});
	}
	else if (fileType === 'cover') {
		setFilesData({
			...filesData,
			coverFile: null, // Clear cover file
		});
	}
	};
	return (
		<LazyMotion features={domAnimation}>
			<ClearMediaButton onClick={handleClick}>Clear</ClearMediaButton>
		</LazyMotion>
	);
};

const CollectionPreviewSection = ({ fileType }) => {
	const { filesData } = useContext(FilesContext);
	const [fileURLs, setFileURLs] = useState([]);

	useEffect(() => {
		if (fileType === "images" && filesData.files.length > 0) {
			const urls = filesData.files.map(file => window.URL.createObjectURL(file));
			setFileURLs(urls);
		} else if (fileType === "cover" && filesData.coverFile) {
			const coverURL = window.URL.createObjectURL(filesData.coverFile);
			setFileURLs([coverURL]);
		} else {
			setFileURLs([]);
		}
	}, [filesData, fileType]);

	return (
		<>
			{fileURLs.length > 0 && (
				<Wrapper>
					<Group>
						<Title>
							Preview
							<ClearMedia fileType={fileType}/>
						</Title>
						<PreviewContainer>
							<FilePreview fileType={fileType}>
								{fileURLs.map((url, index) => (
									<img key={index} src={url} alt={`Preview ${index}`} />
								))}
							</FilePreview>
						</PreviewContainer>
						{/* {["audio"].includes(fileType) && <UploadCover />} */}
					</Group>
				</Wrapper>
			)}
		</>
	);
};

export default CollectionPreviewSection;