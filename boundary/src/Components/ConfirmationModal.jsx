import { Button, Modal } from "flowbite-react";
import { FaTimes } from "react-icons/fa";

function ConfirmationModal({ state, setState, action, children }) {
	// !!! NEED CHILDREN FOR MESSAGE !!!

	const clickYes = () => {
		action()
	}
	const clickNo = () => {
		setState(false)
	}

	function onCloseModal() {
		setState(false);
	}

	return (
		<>
			<Modal
				className=""
				show={state}
				onClose={onCloseModal}
				size="sm"
				popup
			>
				<Modal.Body>
					<h1 className="text-center text-2xl font-bold my-10">
						{children}
					</h1>
					<section className="flex justify-center gap-5 w-full mt-5">
						<Button onClick={clickNo} className="w-1/4" color="failure">Cancel</Button>
						<Button onClick={clickYes} className="w-1/4 bg-custom_purple1">Confirm</Button>
					</section>
				</Modal.Body>
			</Modal>
		</>
	);
}
export default ConfirmationModal;
