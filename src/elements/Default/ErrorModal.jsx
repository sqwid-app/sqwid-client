import ErrorContext from "@contexts/Error/ErrorContext";
import CancelIcon from "@static/svg/CancelIcon";
// import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import { useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const CancelIconContainer = styled.div`
	padding: 0.5rem;
	/* padding-right: 0; */
	position: absolute;
	top: 0;
	right: 0;
	svg.cancel-icon {
		cursor: pointer;
		color: hsla(var(--status-rejected), 100%, 25%);
		height: 1.675rem;
		width: 1.675rem;
		&:hover {
			color: hsla(var(--status-rejected), 100%, 50%);
		}
	}
`;

const Container = styled.div`
	position: relative;
	padding: 1rem 1.5rem;
	padding-bottom: 1.25rem;
	border-radius: 0.5rem;
	max-width: 50rem;
	background: hsl(331, 73%, 10%);
	border: 1px solid hsla(var(--status-rejected), 50%, 100%);
	code {
		font-family: var(--font-family-mono);
		background: hsla(var(--status-rejected), 0%, 50%);
		padding: 0.25rem 0.5rem;
		box-decoration-break: clone;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.75rem;
	h1 {
		font-size: 1.5rem;
		margin-right: 2rem;
		font-weight: 800;
	}
`;

// export const useOpenErrorModal = message => {
// 	const [modalIsOpen, setModalIsOpen] = useState(false);
// 	return (
// 		message && (
// 			<>
// 				<ErrorModal
// 					modalIsOpen={modalIsOpen}
// 					setModalIsOpen={setModalIsOpen}
// 					message={message}
// 				/>
// 			</>
// 		)
// 	);
// };

export const useErrorModalHelper = () => {
	const { setErrorModalIsOpen, setErrorMessage } = useContext(ErrorContext);
	const showErrorModal = message => {
		setErrorMessage(message);
		setErrorModalIsOpen(true);
	};

	return { showErrorModal };
};

const ErrorModal = ({ modalIsOpen, setModalIsOpen, message }) => {
	const closeModal = e => {
		e.stopPropagation();
		setModalIsOpen(false);
	};
	// const isTabletOrMobile = useIsTabletOrMobile();

	return (
		<Modal
			className="ErrorModal"
			overlayClassName="ErrorModal__Overlay"
			isOpen={modalIsOpen}
			contentLabel="Error"
			closeTimeoutMS={200}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
			preventScroll={true}
		>
			<Container>
				<CancelIconContainer onClick={closeModal}>
					<CancelIcon />
				</CancelIconContainer>
				<Header>
					<h1>Something went wrong!</h1>
				</Header>
				<code>{message}</code>
			</Container>
		</Modal>
	);
};

export default ErrorModal;
