import { Card, Button } from "flowbite-react";

import { GoDotFill } from "react-icons/go";
import { LuBath } from "react-icons/lu";
import { FaBed, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

function SellerPropertyListingCard({
  name,
  id,
  address,
  num_bedrooms,
  num_bathrooms,
  district,
  price,
  property_type,
  area,
  is_sold,
  image_url,
  handleViewCountModal,
  handleShortlistCountModal
}) {
  const is_shortlisted = true;

  const navigate = useNavigate();
  const redirectToPage = (id) => {
    navigate(`/seller/viewPropertyListingPage/${id}`);
  };

  const SGDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={image_url}
        // onClick={() => redirectToPage(id)}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{name}</h1>
          <span className="font-medium">S{SGDollar.format(price)}</span>
          <div className="flex flex-row gap-3">
            <div className="flex flex-row">
              <span className="text-sm mr-2">{num_bedrooms} </span>
              <span>
                <FaBed size={20} />
              </span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm mr-2">{num_bathrooms}</span>
              <span>
                <LuBath size={20} />
              </span>
            </div>
            <div className="flex justify-center items-center align-middle">
              <GoDotFill size={6} />
            </div>
            <span className="text-sm mr-2">{area} sqft</span>
          </div>
          <span className="text-gray-500">{address}</span>
          <span className="text-gray-500">{district}</span>
          <section className="flex flex-row justify-between gap-7">
            <div className="mt-1 flex flex-row gap-1 justify-between w-1/2">
              <div className="flex flex-row gap-1">
                <span
                  className={`px-4 py-1 w-fit ${
                    is_sold ? "bg-gray-400" : "bg-custom_purple2"
                  } text-white text-xs rounded-full`}
                >
                  {property_type}
                </span>
                {is_sold && (
                  <span
                    className={
                      "px-4 py-1 w-fit bg-gray-400 text-white text-xs rounded-full"
                    }
                  >
                    SOLD
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-6 mt-1 w-1/2">
              <span 
                className="px-4 py-1 w-fit bg-custom_purple1 text-white text-xs rounded-full cursor-pointer hover:bg-custom_purple3"
                onClick = {() => handleShortlistCountModal(id)}
              >
                Likes
              </span>
              <span 
                className="px-4 py-1 w-fit bg-custom_purple1 text-white text-xs rounded-full cursor-pointer hover:bg-custom_purple3"
                onClick = {() => handleViewCountModal(id)}
              >
                Views
              </span>
            </div>
          </section>
        </div>
      </Card>
    </>
  );
}

export default SellerPropertyListingCard;
