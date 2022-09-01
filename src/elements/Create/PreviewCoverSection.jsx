import CollectionBulkContext from "@contexts/CollectionBulk/CollectionBulk";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
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
	overflow: hidden;
	display: grid;
	place-items: center;
	padding: 0;

	max-width: 100%;
	min-height: auto;
	overflow: hidden;

	img {
		max-width: 100%;
		max-height: 20rem;
		display: block;
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
	const { collectionBulkData, setCollectionBulkData } = useContext(
		CollectionBulkContext
	);
	const handleClick = () => {
		setCollectionBulkData({
			...collectionBulkData,
			coverFile: null,
		});
	};
	return (
		<LazyMotion features={domAnimation}>
			<ClearMediaButton onClick={handleClick}>Clear</ClearMediaButton>
		</LazyMotion>
	);
};

const PreviewCoverSection = () => {
	const { collectionBulkData } = useContext(CollectionBulkContext);
	const [fileURL, setFileURL] = useState("");

	useEffect(() => {
		collectionBulkData.coverFile
			? setFileURL(URL.createObjectURL(collectionBulkData.coverFile))
			: setFileURL("");
		//eslint-disable-next-line
	}, [collectionBulkData.coverFile]);

	return (
		<>
			{collectionBulkData.coverFile !== null && (
				<Wrapper>
					<Group>
						<Title>
							Collection Cover Image Preview
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
								<FilePreview>
									<img src={fileURL} alt="Cover preview" />
								</FilePreview>
							)}
						</PreviewContainer>
					</Group>
				</Wrapper>
			)}
		</>
	);
};

export default PreviewCoverSection;
