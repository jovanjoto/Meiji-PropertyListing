import StarRatings from "react-star-ratings";
import CustomerRatingCard from "../Components/Agent/CustomerRatingCard";

import { useState, useEffect, useContext } from 'react';
import { Spinner } from "flowbite-react";
import { AuthContext } from '../Components/Authentication/AuthContext';
import axios from 'axios';

 function ViewRatingsPage({}) {

  const { token } = useContext(AuthContext); 

  const [customerRatings, setCustomerRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayLoading = () => {
		return (
		  <div className="text-center text-8xl">
			<Spinner aria-label="Extra large spinner example" size="xl" />
		  </div>
		);
	  };

	const displayList = (REARatings) => {
		return REARatings.map((rating) => (
      <CustomerRatingCard
        firstName={rating.userFirstName}
        lastName={rating.userLastName}
        email={rating.userEmail}
        phone_num={rating.userPhone}
        rate={rating.rating}
      />
    ))
	}

	const displayEmptyRatings = () => {
		return <span>No Ratings available</span>;
	};

  useEffect(() => {
    setLoading(true);
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
			})
      .then(()=>{setLoading(false)});
	}, []);


  return (
    <>
      <div className="flex flex-col gap-5">
      {loading && displayLoading()}
      {!loading && customerRatings.length > 0 && displayList(customerRatings)}
      {!loading && customerRatings.length === 0 && displayEmptyRatings()}
      </div>
    </>
  );
}
export default ViewRatingsPage;
