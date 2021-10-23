import FileContext from "@contexts/File/FileContext";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

const border = css`
	border: 2px solid var(--app-container-text-primary);
	border-radius: 1rem;
`;

const noBorder = css`
	border: none;
`;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const PreviewContainer = styled.div`
	max-width: 100%;
	max-height: 100%;
	margin-top: 0.5rem;
`

const FilePreview = styled.div`
	${props => props.fileType === 'audio' ? noBorder : border}
	display: inline-block;
	overflow: hidden;
	padding: 0;

	max-width: 100%;
	max-height: 100%;

	img{
		max-width:100%;
		max-height:100%;
		margin: 0 auto;
		display: block;
	}
	video{
		max-width:100%;
		max-height:100%;
		margin: 0 auto;
		display: block;
	}
	audio{
		max-width:100%;
		max-height:100%;
		margin: 0 auto;
		display: block;
	}
	p{
		padding: 1.5rem;
		padding-top: 5rem;
		padding-bottom: 5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
`;

const PreviewSection = () => {
	const { files } = useContext(FileContext)
	const [fileURL, setFileURL] = useState("")
	const [title, setTitle] = useState("")
	const [fileType, setFileType] = useState("")

	useEffect (() => {
		if (files.file){
			console.log (files.file);
			const { file } = files;
			if (file.type.startsWith ("image")) {
				setFileType ("image")
			} else if (file.type.startsWith ("video")) {
				setFileType ("video")
			} else if (file.type.startsWith ("audio")) {
				setFileType ("audio")
			}

			setFileURL (window.URL.createObjectURL (files.file))
		}
	}, [files.file, files])

	useEffect(() => {
		setTitle(files.name)
	}, [files.name])

	return (
		<div>
			<Title>Preview</Title>
			<PreviewContainer>
				{!fileURL.length?(
					<FilePreview>
						<p>
							Your preview will appear here once you upload a file
						</p>
					</FilePreview>
				):(
					<FilePreview fileType = { fileType }>
						{ fileType === "image" ? (
							<img src = { fileURL } alt = { title } />
						) : fileType === "video" ? (
							<video controls src = { fileURL } alt = { title } />
						) : fileType === "audio" ? (
							<audio controls src = { fileURL } alt = { title } />
						) : null}
					</FilePreview>
				)}
			</PreviewContainer>
		</div>
	)
}

export default PreviewSection
