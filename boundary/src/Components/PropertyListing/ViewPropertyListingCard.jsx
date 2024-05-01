import { useParams } from "react-router-dom";
import { Card, Label } from "flowbite-react";
import sampleImg from "../../assets/sample_img.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaPencilAlt, FaLightbulb, FaUser, FaStar } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtubBold, PiHouseLine } from "react-icons/pi";
import { MdOutlineCropSquare } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";

function ViewPropertyListingCard({ property, agent, editable }) {

  const propertyTypeTags = {
    "HDB" :  <p className="px-4 py-1 bg-custom_purple1 text-white text-xs rounded-full mb-4 mt">HDB</p>,
    "CONDO" : <p className="px-2 bg-custom_purple2 text-white text-xs rounded-full mb-2 mt">Condominium</p>,
    "LANDED" : <p className="px-2 bg-custom_purple3 text-white text-xs rounded-full mb-2 mt">Landed</p>,
  };

  const bgColor = "bg-red-500" ? property.listing.is_sold : "";
  

  return (
    <Card className={`w-5/6 h-full mt-40 mx-auto ${bgColor}`}>
    {/* // <Card className="w-5/6 h-full mt-40 mx-auto bg-red-500"> */}
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
          class={property.listing.is_sold ? "bg-red-200 block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-3/4 cursor-default" : "block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-3/4 cursor-default"}
        >
          <header className="border-b border-black">
            <section className="flex justify-between flex-row">
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                {property.listing.name}
              </h1>
              {editable ? (
                <FaPencilAlt className="mr-2 mt-2 cursor-pointer" size={18} />
              ) : (
                <></>
              )}
              
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
            <section className="w-1/2 border-r border-black py-5">
              <h1 className="text-4xl">${property.listing.price}</h1>
            </section>
            {/* Logo - More Information */}
            <section className="w-1/2">
              <div className="flex flex-row justify-between px-8 mt-4">
                <div className="flex flex-col items-center">
                  <MdOutlineKingBed className="" size={22} />
                  <span>{property.listing.num_bedrooms}</span>
                </div>
                <div className="flex flex-col items-center">
                  <PiBathtubBold className="" size={22} />
                  <span>{property.listing.num_bathrooms}</span>
                </div>
                <div className="flex flex-col items-center">
                  <MdOutlineCropSquare className="" size={22} />
                  <div className="flex flex-col items-center ">
                    <span className="text-sm leading-tight">
                      {property.listing.area} <br /> sqft
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <FaLightbulb className="" size={22} />
                  <span
                    className="text-xs text-center mt-1"
                    dangerouslySetInnerHTML={{
                      __html: property.listing.furnish.replace(" ", "<br />"),
                    }}
                  />
                </div>
              </div>
            </section>
          </header>
          <body className="flex flex-row mt-6 justify-between mx-auto">
            <div className="w-1/2">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                About This Property
              </h3>
              <span className="text-lg">{property.listing.description}</span>
            </div>
            <div className="w-1/2 mt-5 ml-8 flex justify-end mr-5">
              <a class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-3/4 justify-end ">
                <div className="flex flex-row  items-center mb-4">
                  <FaUser
                    className="mr-2 rounded-full size-7 bg-white"
                    size={18}
                  />
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
          </body>
          <br />
          {property.listing.is_sold ? (
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              Property has been sold!
            </h3>) : (
              <></>
            )
          }
          
        </a>
      </div>
    </Card>
  );
}

export default ViewPropertyListingCard;

{
  /* <div className="">
<section className="">
  <h1 className="text-2xl font-bold text-gray-900">
    {sampleObject.listing.name}

  </h1>
</section>
<section className="">
  <CiLocationOn className="mr-2" size={18} />
  <p className="text-xs text-gray-600 ">
    {sampleObject.listing.address}
  </p>
</section>
<section className="">
  <h1 className="text-xl font-bold tracking-tight text-gray-900">
    {sampleObject.listing.price}
  </h1>
</section>
<section>
  <h3 className="text-xl font-bold tracking-tight text-gray-900">
    About This Property
  </h3>
  <p className="text-gray-900">{sampleObject.listing.description}</p>
</section>
</div>
<div>

</div> */
}
