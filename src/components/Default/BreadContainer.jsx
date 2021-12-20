import { ToastContainer, cssTransition } from "react-toastify";

const Transition = cssTransition({
	enter: "swipeUpwards",
	exit: "swipeDownwards"
});

const BreadContainer = () => (
	<ToastContainer
		theme="dark"
		position="bottom-center"
		autoClose={5000}
		transition={Transition}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
	/>
)

export default BreadContainer