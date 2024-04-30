import { useParams } from "react-router-dom";

import { Card } from "flowbite-react";
import sampleImg from "../assets/sample_img.jpg";
import { CiLocationOn } from "react-icons/ci";

import ViewPropertyListingCard from "../Components/PropertyListing/ViewPropertyListingCard";

export default function ViewPropertyListingPage({}) {
  const sampleObject = {
    success: true,
    listing: {
      name: "Property Name 1",
      id: "1",
      img_url: "sample_img",
      address: "31 Thomson Rd",
      description:
        "This is a sample description which may take up a few paragraphs",
      price: 10000.0,
      num_bedrooms: 5,
      num_bathrooms: 5,
      district: "Springleaf",
      property_type: "HDB",
      furnish: "Fully Furnished",
      area: 500.0,
      is_sold: false,
      transaction_date: "30/3/2016",
    },
  };

  const sampleAgent = {
    success: true,
    agent: {
      name: "Lebron James",
      rating : 5,
      phone_number : "12345678",
      email : "lebronjames@mail.com"
    },
  }

  const params = useParams();
  const id = params.id;
  return (
    <>
        <ViewPropertyListingCard property={sampleObject} agent={sampleAgent} />
    </>
  );
}
