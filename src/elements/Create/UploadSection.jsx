import FileContext from "@contexts/File/FileContext";
import React, { useContext } from "react";
import styled from "styled-components";
import CustomDropzone from "./CustomDropzone";
import CustomZipDropzone from "./CustomZipDropzone";

const Container = styled.div``;

const Title = styled.h1`
	font-size: 1.125rem;
	font-weight: 900;
`;

const UploadSection = ({ zipFile = false }) => {
	const { fileData } = useContext(FileContext);
	return (
		<>
			{fileData.file === null && (
				<Container>
					<Title>Upload File</Title>
					{zipFile ? <CustomZipDropzone /> : <CustomDropzone />}
				</Container>
			)}
		</>
	);
};

export default UploadSection;
