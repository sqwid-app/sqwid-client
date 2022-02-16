
import ImageMagnifier from "@elements/Default/ImageMagnifier";
import Modal from "react-modal";

const ModalComponent = ({ modalIsOpen, setModalIsOpen, details }) => {
	const closeModal = () => {
		setModalIsOpen(false);
	}

	return (
		<Modal
			className
			overlayClassName
			isOpen={modalIsOpen}
			contentLabel="FullScreen NFT"
			closeTimeoutMS={200}
			onRequestClose={closeModal}
			shouldCloseOnOverlayClick={true}
			ariaHideApp
		>
			<ImageMagnifier src={details.image} alt={details.name} />			{/* <img src={details.image} alt={details.name} /> */}
		</Modal>
	)
}

export default ModalComponent;
