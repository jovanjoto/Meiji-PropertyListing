import { useState } from "react";
import NumShortlistModal from "../Components/Seller/NumShortlistModal";
import { Button } from "flowbite-react";

function TestPage({}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => {setOpen(true)}}>Toggle modal</Button>
			<NumShortlistModal setState={setOpen} state={open} propertyName="Alessandrea" propertyId="236bcc1b-2695-4bcd-bb42-0e5fffc93457" />
		</>
	);
}

export default TestPage;
