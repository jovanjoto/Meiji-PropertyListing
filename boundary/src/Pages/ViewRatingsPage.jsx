import StarRatings from "react-star-ratings";
import CustomerRatingCard from "../Components/Agent/CustomerRatingCard";

function ViewRatingsPage({}) {
  const ratings = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe1@mail.com",
      phone_num: "123456789",
      rate: 4.5,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe2@mail.com",
      phone_num: "123456790",
      rate: 5.0,
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      email: "bobsmith3@mail.com",
      phone_num: "123456791",
      rate: 4.0,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alicejohnson4@mail.com",
      phone_num: "123456792",
      rate: 4.7,
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charliebrown5@mail.com",
      phone_num: "123456793",
      rate: 3.8,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5">
        {ratings.map((rating) => (
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
