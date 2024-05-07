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

function ViewReviewsPage({}) {
  const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@mail.com",
    phone_num: "12345678",
    review:
      "Mike was amazing! He found us the perfect home and made everything easy. Highly recommend him!",
  };

  const reviews = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe1@mail.com",
      phone_num: "123456789",
      review: "Great service! I'm very satisfied with my purchase."
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe2@mail.com",
      phone_num: "123456790",
      review: "The property was in excellent condition. Highly recommend!"
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      email: "bobsmith3@mail.com",
      phone_num: "123456791",
      review: "The agent was very helpful and responsive."
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicejohnson4@mail.com",
      phone_num: "123456792",
      review: "Smooth transaction and quick response time."
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charliebrown5@mail.com",
      phone_num: "123456793",
      review: "Very professional and easy to work with."
    }
  ];

  return (
    <>
      <div className="flex flex-col gap-7">
      {reviews.map((review) => (
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
