import FileContext from "@contexts/File/FileContext";
import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import React, { useContext } from "react";
import styled from "styled-components";
import CustomDropzone from "./CustomDropzone";
import CustomZipDropzone from "./CustomZipDropzone";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const UploadSection = ({ title = "Upload File", fileType = "" }) => {
	const { fileData } = useContext(FileContext);
	const { collectionBulkData } = useContext(CollectionBulkContext);

	return (
		<>
			{(fileType === "zip" ||
				(fileType === "cover" &&
					collectionBulkData.coverFile === null) ||
				(fileType === "" && fileData.file === null)) && (
				<Container>
					<Title>{title}</Title>
					{fileType === "zip" ? (
						<CustomZipDropzone />
					) : (
						<CustomDropzone cover={fileType === "cover"} />
					)}
				</Container>
			)}
		</>
	);
};

export default UploadSection;
