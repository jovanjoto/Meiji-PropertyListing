import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Card, Spinner } from "flowbite-react";
import sampleImg from "../assets/sample_img.jpg";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

import ViewPropertyListingCard from "../Components/PropertyListing/ViewPropertyListingCard";
import { AuthContext } from "../Components/Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";
import UpdatePropertyModal from "../Components/Agent/UpdatePropertyModal";
import RateAgentModal from "../Components/PropertyListing/RateAgentModal";

export default function ViewPropertyListingPage() {
	const { token } = useContext(AuthContext);
	const params = useParams();
	const id = params.id;
	const [isLoading, setIsLoading] = useState(false);
	const [property, setProperty] = useState();
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showAgentReviewModal, setShowAgentReviewModal] = useState(false);
	const navigate = useNavigate();
	const user = jwtDecode(token);
	useEffect(() => {
		setIsLoading(true);
		if (user.has_buying_permission){
			axios
			.get(`/api/property_listing/view_buyer_property_listing?id=${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					setProperty(() => ({
						...res.data.data,
						editable: user.email === res.data.data.agent.email,
					}));
				} else {
					navigate("/");
				}
			})
			.catch((error) => {
				navigate("/");
			})
			.then(() => setIsLoading(false));
		} else {
			axios
			.get(`/api/property_listing/view_property_listing?id=${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					setProperty(() => ({
						...res.data.data,
						editable: user.email === res.data.data.agent.email,
					}));
				} else {
					navigate("/");
				}
			})
			.catch((error) => {
				navigate("/");
			})
			.then(() => setIsLoading(false));
		}
		
	}, [id]);
	const displayLoadingPage = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	const openUpdatePL = () => {
		setShowUpdateModal(true);
	}

	const displayUpdatePLPage = (showUpdateModalState, setShowUpdateModalState) => {
		return (
			<UpdatePropertyModal
				state={showUpdateModalState}
				setState={setShowUpdateModalState}
				id={property.id}
				name={property.name}
				address={property.address}
				price={property.price}
				num_of_bedrooms={property.num_of_bedrooms}
				num_of_bathrooms={property.num_of_bathrooms}
				district={property.district}
				property_type={property.type}
				area={property.area}
				description={property.description}
			/>
		);
	}
	

	const displayPL = (data) => {
		return (
			<ViewPropertyListingCard
				id={id}
				price={data.price}
				name={data.name}
				type={data.type}
				address={data.address}
				district={data.district}
				description={data.description}
				num_of_bedrooms={data.num_of_bedrooms}
				num_of_bathrooms={data.num_of_bathrooms}
				area={data.area}
				image_url={data.image_url}
				listing_date={data.listing_date}
				is_sold={data.is_sold}
				transaction_date={data.transaction_date}
				seller_email={data.seller_email}
				agent={data.agent}
				editable={data.editable}
				showUpdateModalState={showUpdateModal}
				setShowUpdateModalState={setShowUpdateModal}
				openUpdatePLFunc={openUpdatePL}
				displayUpdatePLPageFunc={displayUpdatePLPage}
				is_shortlisted={property.is_shortlisted}
			/>
		);
	};

  if (isLoading || !property) {
    return displayLoadingPage();
  }

  return (
    <div className="my-24 justify-center items-center align-middle">
      {displayPL(property)}
    </div>
  );
}
