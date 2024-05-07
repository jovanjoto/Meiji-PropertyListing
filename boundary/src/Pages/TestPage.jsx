import { useState } from "react";
import UpdatePropertyModal from "../Components/Agent/UpdatePropertyModal";
import { Button } from "flowbite-react";
import ViewCountModal from "../Components/Seller/ViewCountModal";
import ShortlistCountModal from '../Components/Seller/ShortlistCountModal';

function TestPage({}) {
	const [showViewModal, setShowViewModal] = useState(false);

	const handleShowViewModal = () => {
		setShowViewModal(!showViewModal);
	}

	const [showShortlistModal, setShowShortlistModal] = useState(false);

	const handleShowShortlistModal = () => {
		setShowShortlistModal(!showShortlistModal);
	}


	return (
		<>
			<h1>Test Page</h1>
			<Button onClick={handleShowViewModal}>Show View Modal</Button>
			<ViewCountModal 
				state={showViewModal}
				setState={setShowViewModal}
			/>

			<Button onClick={handleShowShortlistModal}>Show Shortlist Modal</Button>
			<ShortlistCountModal 
				state={showShortlistModal}
				setState={setShowShortlistModal}
			/>
		</>
	);
}

export default TestPage;
