import { Button, Modal } from "flowbite-react";
import { FaTimes } from "react-icons/fa";

function ConfirmationModal({ state, setState, action, children }) {
	// !!! NEED CHILDREN FOR MESSAGE !!!
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
						<Button onClick={() => setState(false)} className="w-1/4 bg-custom_purple1">No</Button>
						<Button onClick={() => action()} className="w-1/4 bg-custom_purple1">Yes</Button>
					</section>
				</Modal.Body>
			</Modal>
		</>
	);
}
export default ConfirmationModal;
