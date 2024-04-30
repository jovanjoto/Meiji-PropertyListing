import { useState } from "react";
import UpdatePropertyModal from "../Components/Agent/UpdatePropertyModal";

function TestPage({}) {
	const [show, setShow] = useState(false);
	return (
		<h1>
			<UpdatePropertyModal 
			state={show} 
			setState={setShow} 
			id="3438a820-d44e-4290-850c-0d515aff7c67" 
			name={"test"}
			address={"test"}
			price={1000.0}
			num_of_bedrooms={1}
			num_of_bathrooms={1}
			district={"D01 Boat Quay / Raffles Place / Marina"}
			property_type={"LANDED"}
			area={1.0}
			description={"123"}
			/>
			<button type="button" onClick={() => setShow(true)}>
				Test
			</button>
		</h1>
	);
}

export default TestPage;
