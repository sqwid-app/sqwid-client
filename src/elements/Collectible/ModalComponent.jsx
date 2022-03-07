import ImageMagnifier from "@elements/Default/ImageMagnifier";
import CancelIcon from "@static/svg/CancelIcon";
import useIsTabletOrMobile from "@utils/useIsTabletOMobile";
import Modal from "react-modal";
import styled from "styled-components";

const CancelIconContainer = styled.div`
	padding: 0.5rem;
	padding-right: 0;
	position: absolute;
	right: 0;
	svg.cancel-icon {
		height: 2rem;
		width: 2rem;
	}
`;

const ModalComponent = ({ modalIsOpen, setModalIsOpen, details }) => {
	const closeModal = e => {
		e.stopPropagation();
		setModalIsOpen(false);
	};
	const isTabletOrMobile = useIsTabletOrMobile();

	return (
		<Modal
			className="ReactModal"
			overlayClassName="ReactModal__Overlay"
			isOpen={modalIsOpen}
			contentLabel="FullScreen NFT"
			closeTimeoutMS={200}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			ariaHideApp={false}
		>
			{isTabletOrMobile ? (
				<>
					<CancelIconContainer onClick={closeModal}>
						<CancelIcon />
					</CancelIconContainer>
					<img src={details.image} alt={details.name} />
				</>
			) : (
				<ImageMagnifier src={details.image} alt={details.name} />
			)}
		</Modal>
	);
};

export default ModalComponent;
