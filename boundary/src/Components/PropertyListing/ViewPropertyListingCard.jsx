import { useParams, useEffect } from "react-router-dom";
import { Card, Label } from "flowbite-react";
import sampleImg from "../../assets/sample_img.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaPencilAlt, FaLightbulb, FaUser, FaStar } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtubBold, PiHouseLine } from "react-icons/pi";
import { MdOutlineCropSquare } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";

function ViewPropertyListingCard({ property, agent }) {

  const propertyTypeTags = {
    HDB: (
      <p className="px-4 py-1 bg-custom_purple1 text-white text-xs rounded-full mb-4 mt">
        HDB
      </p>
    ),
    CONDO: (
      <p className="px-2 bg-custom_purple2 text-white text-xs rounded-full mb-2 mt">
        Condominium
      </p>
    ),
    LANDED: (
      <p className="px-2 bg-custom_purple3 text-white text-xs rounded-full mb-2 mt">
        Landed
      </p>
    ),
  };

  useEffect

  return (
    <Card className="w-5/6  h-full mt-40 mx-auto">
      <div className="flex flex-row justify-center gap-12">
        <div className="">
          <img
            src={sampleImg}
            className=""
            style={{ width: "750px", height: "450px" }}
          />
        </div>

        {/* HTML Card For Property's Information */}
        <a
          href="#"
          class="block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-3/4 cursor-default"
        >
          <header className="border-b border-black">
            <section className="flex justify-between flex-row">
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                {property.listing.name}
              </h1>
              <FaPencilAlt className="mr-2 mt-2 cursor-pointer" size={18} />
            </section>
            <section className="flex justify-between flex-row mb-2 gap-7">
              <div className="flex flex-row gap-4">
                <section className="flex flex-row">
                  <IoLocationOutline className="mr-2" size={18} />
                  <p className="text-xs text-gray-900">
                    {property.listing.address}
                  </p>
                </section>
                <section className="flex flex-row">
                  <GrLocationPin className="mr-2" size={18} />
                  <p className="text-xs text-gray-900">
                    {property.listing.district}
                  </p>
                </section>
              </div>

              <div className="flex flex-row mr-5">
                {propertyTypeTags[property.listing.property_type]}
              </div>
            </section>
          </header>

          <header className="flex border-b border-black">
            {/* Price */}
            <section className="w-full border-black py-5">
              <h1 className="text-4xl">S$17.000</h1>
            </section>
            {/* Logo - More Information */}

          </header>
          <section className="w-1/2 pt-5">
              <div className="flex flex-col justify-between gap-7 mt-4">
                <div className="flex flex-row items-center gap-5">
                  <MdOutlineKingBed className="" size={22} />
                  <span>{property.listing.num_bedrooms} bedrooms</span>
                </div>
                <div className="flex flex-row items-center gap-5">
                  <PiBathtubBold className="" size={22} />
                  <span>{property.listing.num_bathrooms} bathrooms</span>
                </div>
                <div className="flex flex-row items-center gap-5">
                  <MdOutlineCropSquare className="" size={22} />
                  <div className="flex flex-row items-center ">
                    <span className="text-sm leading-tight">
                      {property.listing.area} sqft
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-5">
                  <FaLightbulb className="" size={22} />
                  <span className="text-sm text-center mt-1"> {property.listing.furnish} </span>
                </div>
              </div>
            </section>
        </a>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            About This Property
          </h3>
          <span className="text-lg">{property.listing.description}</span>
        </div>

        {/* Agent Card */}
        <a class="block p-6 bg-white border border-gray-200 rounded-lg shadow w-3/5 justify-start">
          <div className="flex flex-row  items-center mb-4">
            <FaUser className="mr-2 rounded-full size-7 bg-white" size={18} />
            <section className="flex flex-col">
              <h1 className="">{agent.agent.name}</h1>
              <div className="flex flex-row items-center">
                <FaStar className="mr-1" size={12} />
                <p className="text-sm">{agent.agent.rating}</p>
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-4">
            <section className="flex flex-col">
              <Label
                className="text-gray-500 text-xs"
                color=""
                value="Phone :"
              />
              <Label
                className="text-black text-xs"
                color=""
                value={agent.agent.phone_number}
              />
            </section>
            <section className="flex flex-col">
              <Label
                className="text-gray-500 text-xs"
                color=""
                value="Email :"
              />
              <Label
                className="text-black text-xs"
                color=""
                value={agent.agent.email}
              />
            </section>
          </div>
        </a>
      </div>
    </Card>
  );
}

export default ViewPropertyListingCard;
