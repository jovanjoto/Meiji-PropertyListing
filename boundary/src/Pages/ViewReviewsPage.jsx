import { useContext, useEffect, useState } from "react";
import {
	TextInput,
	Button,
	Spinner,
	Dropdown,
	Label,
	Checkbox,
} from "flowbite-react";

import { AuthContext } from "../Components/Authentication/AuthContext";
import CustomerRatingCard from "../Components/Agent/CustomerReviewCard";
import axios from "axios";

function ViewReviewsPage({ agentEmail }) {
	const { token } = useContext(AuthContext);
	const [customerReviews, setCustomerReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	const displayLoading = () => {
		return (
		  <div className="text-center text-8xl">
			<Spinner aria-label="Extra large spinner example" size="xl" />
		  </div>
		);
	  };

	const displayList = (reviews) => {
		return reviews.map((review) => (
			<CustomerRatingCard
			  firstName={review.userFirstName}
			  lastName={review.userLastName}
			  email={review.userEmail}
			  phone_num={review.userPhone}
			  review={review.review}
			/>
		  ))
	}

	const displayEmptyList = () => {
		return <span>No Reviews available</span>;
	};

	useEffect(() => {
		setLoading(true);
		axios
			.get("/api/review/view_reviews", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log("response : ", response.data.reviews);
        setCustomerReviews(response.data.reviews);
			})
			.catch((error) => {
				console.error("error : ", error);
			})
			.then(()=> {setLoading(false)});
	}, []);

  return (
    <>
      <div className="flex flex-col gap-7">
      {loading && displayLoading()}
		{!loading && customerReviews.length > 0 && displayList(customerReviews)}
		{!loading && customerReviews.length === 0 && displayEmptyList()}
      </div>
    </>
  );
}

export default ViewReviewsPage;
