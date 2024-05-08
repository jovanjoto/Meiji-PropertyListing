import { useState, useEffect, useContext } from "react";
import UpdatePropertyModal from "../Components/Agent/UpdatePropertyModal";
import { Button } from "flowbite-react";
import ViewCountModal from "../Components/Seller/ViewCountModal";
import ShortlistCountModal from '../Components/Seller/ShortlistCountModal';
import { AuthContext } from "../Components/Authentication/AuthContext";

import BuyerPropertyListingCard from "../Components/Buyer/BuyerPropertyListingCard";
import SellerPropertyListingCard from '../Components/Seller/SellerPropertyListingCard';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
;

function TestPage({}) {

	const [showViewCountModal, setViewCountModal] = useState(false);
	const [showShortlistCountModal, setShortlistCountModal] = useState(false);

	const { token } = useContext(AuthContext);

	const [viewCountDataset, setViewCountDataset] = useState({});
	const [shortlistCountDataset, setShortlistCountDataset] = useState({});

	const handleViewCountModal = (property_id) => {
		console.log('View Count Modal Triggered')
		console.log('Property ID:', property_id)
		setViewCountModal(true);

		//axios call to get view count
		// setViewCountDataset(response.data)
		axios.get("/api/views/find_property_views",
			{
				params : {
					'propertyID' : `${property_id}`
				},
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}

		).then((response) => {
			console.log(response.data)
			setViewCountDataset(response.data)
		}
		).catch((error) => {
			console.log(error)
		})
	}

	const handleShortlistCountModal = (property_id) => {	
		console.log('Shortlist Count Modal Triggered')
		console.log('Property ID:', property_id)
		setShortlistCountModal(true);

		//axios call to get shortlist count
		// setShortlistCountDataset(response.data)
	}
	const dummy_data = {
		name: "Test Property",
		id: 1,
		address: "Test Address",
		num_bedrooms: 3,
		num_bathrooms: 2,
		district: "Test District",
		price: 1000000,
		property_type: "Test Property Type",
		area: 1000,
		is_sold: false,
		image_url: "https://via.placeholder.com/150",
		is_shortlisted: false,
	};
	
	const dummy_dataset = { // Example dataset
    labels: [
      "Mar 2021",
      "Apr 2021",
      "May 2021",
      "Jun 2021",
      "Jul 2021",
      "Aug 2021",
    ],
    data: [100, 200, 300, 400, 500, 600],
  };
	return (
		<>
			<h1>Test Page</h1>
			<ViewCountModal 
				state={showViewCountModal}
				setState={setViewCountModal}
				// dataset={viewCountDataset}
				dataset={dummy_dataset}
			/>

			<ShortlistCountModal
				state={showShortlistCountModal}
				setState={setShortlistCountModal}
				// dataset={shortlistCountDataset}
				dataset={dummy_dataset}
			/>

			<SellerPropertyListingCard 
				{...dummy_data}
				handleViewCountModal={handleViewCountModal}
				handleShortlistCountModal={handleShortlistCountModal}
			/>
		</>
	);
}

export default TestPage;
