import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Card, Spinner } from "flowbite-react";
import sampleImg from "../assets/sample_img.jpg";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

import ViewPropertyListingCard from "../Components/PropertyListing/ViewPropertyListingCard";
import { AuthContext } from "../Components/Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function ViewPropertyListingPage() {
  const { token } = useContext(AuthContext);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState();
  const navigate = useNavigate();
  const user = jwtDecode(token);
  console.log(user.email);
  useEffect(() => {
    setIsLoading(true);
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
  }, [id]);
  console.log(property);
  const displayLoading = () => {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  };

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
      />
    );
  };

  if (isLoading || !property) {
    return displayLoading();
  }

  return (
    <div className="my-24 justify-center items-center align-middle">
      {displayPL(property)}
    </div>
  );
}
