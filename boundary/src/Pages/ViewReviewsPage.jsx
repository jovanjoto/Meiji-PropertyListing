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
import axios from 'axios';

function ViewReviewsPage({ agentEmail }) {

  const { token } = useContext(AuthContext);
  const [customerReviews, setCustomerReviews] = useState([]);

  useEffect(() => {

		axios
			.get("/api/review/view_reviews", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log("response : ", response.data);
        setCustomerReviews(response.data.reviews);
			})
			.catch((error) => {
				console.error("error : ", error);
			});
	}, []);


  return (
    <>
      <div className="flex flex-col gap-7">
      {customerReviews.map((review) => (
        <CustomerRatingCard
          firstName={review.firstName}
          lastName={review.lastName}
          email={review.email}
          phone_num={review.phone_num}
          review={review.review}
        />
      ))}
      </div>
    </>
  );
}

export default ViewReviewsPage;
