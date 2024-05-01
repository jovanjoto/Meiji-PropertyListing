import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import sampleImg from "../assets/sample_img.jpg";
import { CiLocationOn } from "react-icons/ci";
import axios from 'axios';

import ViewPropertyListingCard from "../Components/PropertyListing/ViewPropertyListingCard";

export default function ViewPropertyListingPage({property_id}) {
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

  const [propertyState, setPropertyState] = useState({});

  // get property 
  useEffect(() => {
    axios.get(`/agent/view_property_lisintg/${property_id}`)
      .then(response => {
        // Handle the response data
        console.log(response.data);
        setPropertyState(response.data)
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }, []);

  // get agent 
  useEffect(() => {
    axios.get(`/agent/view_property_lisintg/${property_id}`)
      .then(response => {
        // Handle the response data
        console.log(response.data);
        setPropertyState(response.data)
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }, []);
  



  const params = useParams();
  const id = params.id;
  return (
    <>
    {/* change property to propertyState, change agent to agentState */}
        <ViewPropertyListingCard property={sampleObject} agent={sampleAgent} />
    </>
  );
}
