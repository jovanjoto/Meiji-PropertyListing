import { useState } from "react";
import NumShortlistModal from "../Components/Seller/NumShortlistModal";
import { Button } from "flowbite-react";
import MortgageCalculatorModal from "../Components/Buyer/MortgageCalculatorModal";

function TestPage({}) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => {setOpen(true)}}>Toggle modal</Button>
			<MortgageCalculatorModal state={open} setState={setOpen}/>
		</>
	);
}

export default TestPage;
