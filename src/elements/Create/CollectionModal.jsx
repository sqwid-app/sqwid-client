import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SimpleBarReact from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { LazyMotion, domAnimation, m } from "framer-motion";
import CustomDropzoneModal from "./CustomDropzoneModal";
import { createCollection } from "@utils/createCollection";
import Loading from "@elements/Default/Loading";
import axios from "axios";
import AuthContext from "@contexts/Auth/AuthContext";
import { getInfuraURL } from "@utils/getIPFSURL";
import FileContext from "@contexts/File/FileContext";
import { BtnBaseAnimated } from "@elements/Default/BtnBase";
import LoadingIcon from "@static/svg/LoadingIcon";
import { getBackend } from "@utils/network";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";

const swipeDownwards = keyframes`
	0% {
		transform: translate(0,-50%);
		opacity: 0;
	}
	100% {
		transform: translate(0,0);
		opacity: 1;
	}
`;

const swipeUpwards = keyframes`
	0% {
		transform: translate(0,0);
		opacity: 1;
	}
	100% {
		transform: translate(0,-50%);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
	animation: ${swipeDownwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const modalExitAnim = css`
	animation: ${swipeUpwards} 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const BackDrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	min-height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
	display: grid;
	place-items: center;
	z-index: 60;
`;

const Modal = styled.div`
	padding: 2rem 1.5rem;
	background: var(--app-container-bg-primary);
	border-radius: 0.5rem;
	z-index: 15;
	min-width: 33vw;
	max-width: 50vw;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	word-wrap: break-word;
	${props => (!props.remove ? modalEntryAnim : modalExitAnim)}
`;

const Title = styled.h1`
	font-size: 1rem;
	margin-bottom: 0.25rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline: none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	margin-bottom: 1rem;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`;

const Btn = styled(BtnBaseAnimated)`
	display: grid;
	place-items: center;
	font-size: 1rem;
	font-weight: 700;
	padding: 0 1.25rem;
	border-radius: 1000rem;
	height: 2.5rem;
	min-width: 10rem;
	z-index: 2;
	user-select: none;
	transition: background 0.2s ease;
	&[disabled] {
		background: var(--app-theme-primary-disabled);
		pointer-events: none;
	}
`;

const AnimBtn = ({ children, onClick, disabled }) => (
	<Btn
		// whileHover={{
		// 	y: -5,
		// 	x: 0,
		// 	scale: 1.02,
		// }}
		whileTap={{
			scale: 0.99,
		}}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</Btn>
);

const NewContainer = styled.div`
	padding: 0 1rem;
`;

const BtnContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-top: 1.5rem;
`;

const Header = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const border = css`
	border: 0.125rem solid var(--app-container-text-primary);
	border-radius: 0.5rem;
`;

const containsPreview = css`
	display: inline-block;
`;

const PreviewContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 0.5rem 0;
`;

const PreviewText = styled.p`
	font-weight: 800;
	font-size: 0.85rem;
	text-align: right;
	color: var(--app-container-text-primary);
`;

const PreviewTextContainer = styled.div`
	max-width: 50%;
`;

const FilePreview = styled.div`
	${containsPreview}
	overflow: hidden;
	padding: 0;

	max-width: 100%;
	min-height: auto;
	overflow: hidden;

	img {
		max-width: 16rem;
		max-height: 10rem;
		margin: 0 auto;
		display: block;
		${border}
	}
	p {
		padding: 1.5rem;
		padding-top: 5rem;
		padding-bottom: 5rem;
		text-align: center;
		color: var(--app-container-text-primary);
	}
`;

const ExistingContainer = styled(SimpleBarReact)`
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
	max-height: 24rem;
	overflow-y: auto;
`;

const CollectionContainer = styled(m.div)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	gap: 0.5rem;
	user-select: none;
	padding: 0.75rem 1.25rem;
	margin-bottom: 0.5rem;
	background: var(--app-container-bg-secondary);
	border-radius: 0.25rem;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	border: 0.125rem solid rgba(0, 0, 0, 0);
	transition: border 0.1s ease;
	&:hover {
		border: 0.125rem solid var(--app-container-text-primary);
	}
	img {
		aspect-ratio: 1;
		height: 4rem;
		display: block;
		border-radius: 0.5rem;
		object-fit: cover;
	}
	p {
		font-size: 1.25rem;
		font-weight: 800;
		max-width: 30ch;
		overflow: hidden;
		white-space: nowrap;
		display: block;
		text-overflow: ellipsis;
	}
`;

const LoadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 6rem;
`;

const BtnClear = styled(BtnBaseAnimated)`
	--btn-base: 347, 76%;
	background: transparent;
	background: hsl(var(--btn-base), 50%);
	color: hsl(var(--btn-base), 97%);
	border-radius: 1000rem;
	font-size: 0.875rem;
	font-weight: 800;
	padding: 0.25rem 0.75rem;
	text-align: center;
	cursor: pointer;
`;

const elemContains = (rect, x, y) => {
	return (
		rect.x <= x &&
		x <= rect.x + rect.width &&
		rect.y <= y &&
		y <= rect.y + rect.height
	);
};

const ClearMediaButton = ({ children, onClick, disabled }) => (
	<BtnClear
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
	</BtnClear>
);

const ClearMedia = ({ clear }) => {
	const handleClick = () => {
		clear();
	};
	return (
		<LazyMotion features={domAnimation}>
			<ClearMediaButton onClick={handleClick}>Clear</ClearMediaButton>
		</LazyMotion>
	);
};

const New = ({ isActive, setIsActive }) => {
	const [buttonText, setButtonText] = useState("Create Collection");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const initialInfo = {
		name: "",
		description: "",
		file: null,
	};
	const [info, setInfo] = useState(initialInfo);
	const [fileURL, setFileURL] = useState("");
	useEffect(() => {
		if (info.file) {
			const { file } = info;
			setFileURL(window.URL.createObjectURL(file));
		} else {
			setFileURL("");
		}
		//eslint-disable-next-line
	}, [info.file]);
	const { showErrorModal } = useErrorModalHelper();

	const handleClick = () => {
		setButtonText(<Loading size="24" />);
		setIsSubmitting(true);
		if (info.file && info.name.length) {
			createCollection(info.file, info.name, info.description)
				.then(res => {
					setButtonText("Created Collection!");
					setTimeout(() => {
						setIsActive({ ...isActive, status: false });
					}, 500);
					setIsSubmitting(false);
				})
				.catch(err => {
					showErrorModal(err.response.data.error);
				})
				.finally(() => {
					setTimeout(() => {
						setButtonText("Create Collection");
					}, 2000);
				});
		} else {
			setButtonText("Created Collection!");
		}
		setInfo(initialInfo);
	};
	return (
		<>
			<Header>Create new collection</Header>
			<NewContainer>
				<Title>Name</Title>
				<InputContainer
					value={info.name}
					onChange={e => setInfo({ ...info, name: e.target.value })}
					placeholder={`e.g "Doggo collection"`}
				/>
				<Title>Description</Title>
				<InputContainer
					value={info.description}
					onChange={e =>
						setInfo({ ...info, description: e.target.value })
					}
					placeholder={`e.g "Pics of my heckin doggo"`}
				/>
				<Title>
					Cover Image
					{fileURL.length ? (
						<ClearMedia
							clear={() => {
								setFileURL("");
								setInfo({
									...info,
									file: null,
								});
							}}
						/>
					) : null}
				</Title>
				{!fileURL.length ? (
					<CustomDropzoneModal modal info={info} setInfo={setInfo} />
				) : (
					<PreviewContainer>
						<FilePreview>
							<img src={fileURL} alt={info.name} />
						</FilePreview>
						<PreviewTextContainer>
							<PreviewText>
								(This image will show up as your collection
								thumbnail)
							</PreviewText>
						</PreviewTextContainer>
					</PreviewContainer>
				)}
				<BtnContainer>
					<AnimBtn
						disabled={isSubmitting ? true : false}
						onClick={handleClick}
					>
						{buttonText}
					</AnimBtn>
				</BtnContainer>
			</NewContainer>
		</>
	);
};

const Existing = ({ isActive, setIsActive }) => {
	const [collections, setCollections] = useState(
		JSON.parse(localStorage.getItem("collections")) || []
	);
	const [isLoading, setIsLoading] = useState(true);
	const { auth } = useContext(AuthContext);
	const { files, setFiles } = useContext(FileContext);
	const { showErrorModal } = useErrorModalHelper();
	useEffect(() => {
		axios
			.get(`${getBackend()}/get/collections/owner/${auth.evmAddress}`)
			.then(res => {
				localStorage.setItem(
					"collections",
					JSON.stringify(res.data.collections)
				);
				setCollections(res.data.collections);
			})
			.catch(err => {
				showErrorModal(err.response.data.error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		return () => {
			setCollections([]);
		};
		//eslint-disable-next-line
	}, []);

	const handleNewClick = () => {
		setIsActive({ status: true, type: "new" });
	};
	return (
		<LazyMotion features={domAnimation}>
			<Header>Choose Collection</Header>
			<ExistingContainer>
				{isLoading ? (
					<LoadingContainer>
						<LoadingIcon size="40" />
					</LoadingContainer>
				) : (
					<>
						{collections.length ? (
							collections.map(item => (
								<CollectionContainer
									key={item.id}
									whileTap={{
										scale: 0.99,
									}}
									onClick={() => {
										setFiles({
											...files,
											collection: item.id,
											collectionName: item.data.name,
										});
										setIsActive({
											...isActive,
											status: false,
										});
									}}
								>
									<img
										src={getInfuraURL(item.data.image)}
										alt={item.data.description}
									/>
									<p>{item.data.name}</p>
								</CollectionContainer>
							))
						) : (
							<AnimBtn disabled={false} onClick={handleNewClick}>
								Create new
							</AnimBtn>
						)}
					</>
				)}
			</ExistingContainer>
		</LazyMotion>
	);
};

const CollectionModal = ({ isActive, setIsActive, accounts }) => {
	const [elemIsVisible, setElemIsVisible] = useState(isActive.status);
	const { auth } = useContext(AuthContext);
	const isLoggedIn = !(auth === null);
	const modalRef = useRef();
	//eslint-disable-next-line
	useEffect(() => {
		if (isActive.status === false) {
			setTimeout(() => {
				setElemIsVisible(isActive.status);
			}, 200);
		} else {
			setElemIsVisible(isActive.status);
		}
	}, [isActive.status]);

	const handleClickOutside = e => {
		let rect = modalRef.current.getBoundingClientRect();
		if (!elemContains(rect, e.clientX, e.clientY)) {
			setIsActive({ ...isActive, status: false });
		}
	};
	return (
		<LazyMotion features={domAnimation}>
			{elemIsVisible && (
				<BackDrop
					remove={!isActive.status}
					onClick={handleClickOutside}
				>
					<Modal remove={!isActive.status} ref={modalRef}>
						{isLoggedIn ? (
							(() => {
								switch (isActive.type) {
									case "new":
										return (
											<New
												isActive={isActive}
												setIsActive={setIsActive}
											/>
										);
									case "choose":
										return (
											<Existing
												isActive={isActive}
												setIsActive={setIsActive}
											/>
										);
									default:
										return "u wot m8";
								}
							})()
						) : (
							<Title>You need to connect your wallet first</Title>
						)}
					</Modal>
				</BackDrop>
			)}
		</LazyMotion>
	);
};

export default CollectionModal;
