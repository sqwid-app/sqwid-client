import FileContext from "@contexts/File/FileContext";
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
`;

const FilePreview = styled.div`
	${props => !props.fileType && border};
	overflow: hidden;
	display: grid;
	place-items: center;
	padding: 0;

	max-width: 100%;
	min-height: ${props => (!props.fileType ? `100%` : `auto`)};
	overflow: hidden;

	img {
		max-width: 100%;
		max-height: 20rem;
		display: block;
		${border}
		border-radius: 0.5rem;
	}
	video {
		max-width: 100%;
		max-height: 16rem;
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
	/* height: 100%; */
	width: 100%;
	min-height: 10rem;
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

const ClearMedia = () => {
	const { fileData, setFileData } = useContext(FileContext);
	const handleClick = () => {
		setFileData({
			...fileData,
			file: null,
		});
	};
	return (
		<LazyMotion features={domAnimation}>
			<ClearMediaButton onClick={handleClick}>Clear</ClearMediaButton>
		</LazyMotion>
	);
};

const PreviewSection = () => {
	const { files, fileData } = useContext(FileContext);
	const [fileURL, setFileURL] = useState("");
	const [title, setTitle] = useState("");
	const [fileType, setFileType] = useState("");

	useEffect(() => {
		if (fileData.file) {
			const { file } = fileData;
			if (file.type.startsWith("image")) {
				setFileType("image");
			} else if (file.type.startsWith("video")) {
				setFileType("video");
			} else if (file.type.startsWith("audio")) {
				setFileType("audio");
			}

			setFileURL(window.URL.createObjectURL(fileData.file));
		} else {
			setFileType("");
			setFileURL("");
		}
		//eslint-disable-next-line
	}, [fileData.file]);

	useEffect(() => {
		setTitle(files.name);
	}, [files.name]);

	return (
		<>
			{fileData.file !== null && (
				<Wrapper>
					<Group>
						<Title>
							Preview
							<ClearMedia />
						</Title>
						<PreviewContainer>
							{!fileURL.length ? (
								<FilePreview>
									<p>
										Your preview will appear here once you
										upload a file
									</p>
								</FilePreview>
							) : (
								<FilePreview
									fileType={fileType}
									gradient={["video", "image"].includes(
										fileType
									)}
								>
									{fileType === "image" ? (
										<img src={fileURL} alt={title} />
									) : fileType === "video" ? (
										<video
											controls
											src={fileURL}
											alt={title}
										/>
									) : fileType === "audio" ? (
										<audio
											controls
											src={fileURL}
											alt={title}
										/>
									) : null}
								</FilePreview>
							)}
						</PreviewContainer>
						{["audio"].includes(fileType) && <UploadCover />}
					</Group>
				</Wrapper>
			)}
		</>
	);
};

export default PreviewSection;
