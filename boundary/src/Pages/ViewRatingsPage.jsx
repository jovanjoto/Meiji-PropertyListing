import StarRatings from "react-star-ratings";
import CustomerRatingCard from "../Components/Agent/CustomerRatingCard";

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Components/Authentication/AuthContext';
import axios from 'axios';

 function ViewRatingsPage({}) {

  const { token } = useContext(AuthContext); 

  const [customerRatings, setCustomerRatings] = useState([]);
  useEffect(() => {
		axios
			.get("/api/rating/view_ratings", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
        setCustomerRatings(response.data.ratings);
			})
			.catch((error) => {
				console.error("error : ", error);
			});
	}, []);


  return (
    <>
      <div className="flex flex-col gap-5">
        {customerRatings.map((rating) => (
          <CustomerRatingCard
            firstName={rating.firstName}
            lastName={rating.lastName}
            email={rating.email}
            phone_num={rating.phone_num}
            rate={rating.rate}
          />
        ))}
      </div>
    </>
  );
}
export default ViewRatingsPage;
