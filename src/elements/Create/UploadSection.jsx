import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";
import CustomDropzone from "./CustomDropzone";
import CustomZipDropzone from "./CustomZipDropzone";
import CustomVerificationDropzone from "./CustomVerificationDropzone";
import FilesContext from "@contexts/Files/FilesContext";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const UploadSection = ({ title = "Upload File", fileType = "" }) => {
	const { fileData } = useContext(FileContext);
	const { filesData } = useContext(FilesContext);

	return (
		<>
		{(fileType === "zip" || fileType === "json" ||
		(fileType === "cover" && filesData.coverFile === null) ||
		(fileType === "" && fileData.file === null) ||
		(fileType === "images" && filesData.files.length === 0)) && ( 
			<Container>
				<Title>{title}</Title>
				{fileType === "zip" ? (
					<CustomZipDropzone />
				) : fileType === "json" ? (
					<CustomVerificationDropzone />
				) :  (
					<CustomDropzone
						cover={fileType === "cover"}
						acceptMultipleImages={fileType === "images"}
					/>
				)}
			</Container>
		)}
		</>
	);
};

export default UploadSection;