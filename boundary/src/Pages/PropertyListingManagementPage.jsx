import { useContext, useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Spinner,
  Dropdown,
  Label,
  Checkbox,
} from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { BsArrowDownShort } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../Components/Authentication/AuthContext";

import PropertyListingCard from "../Components/Agent/PropertyListingCard";
import CreateNewPropertyModal from "../Components/Agent/CreateNewPropertyModal";
import MarkAsSoldModal from "../Components/Agent/MarkAsSoldModal";

export default function PropertyListingManagementPage({}) {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewPropertyModal, setPropertyModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    district: {
      "D01 Boat Quay / Raffles Place / Marina": true,
      "D02 Chinatown / Tanjong Pagar": true,
      "D03 Alexandra / Commonwealth": true,
      "D04 Harbourfront / Telok Blangah": true,
      "D05 Buona Vista / West Coast / Clementi New Town": true,
      "D06 City Hall / Clarke Quay": true,
      "D07 Beach Road / Bugis / Rochor": true,
      "D08 Farrer Park / Serangoon Rd": true,
      "D09 Orchard / River Valley": true,
      "D10 Tanglin / Holland / Bukit Timah": true,
      "D11 Newton / Novena": true,
      "D21 Clementi Park / Upper Bukit Timah": true,
      "D12 Balestier / Toa Payoh": true,
      "D13 Macpherson / Potong Pasir": true,
      "D14 Eunos / Geylang / Paya Lebar": true,
      "D15 East Coast / Marine Parade": true,
      "D16 Bedok / Upper East Coast": true,
      "D17 Changi Airport / Changi Village": true,
      "D18 Pasir Ris / Tampines": true,
      "D19 Hougang / Punggol / Sengkang": true,
      "D20 Ang Mo Kio / Bishan / Thomson": true,
      "D22 Boon Lay / Jurong / Tuas": true,
      "D23 Dairy Farm / Bukit Panjang / Choa Chu Kang": true,
      "D24 Lim Chu Kang / Tengah": true,
      "D25 Admiralty / Woodlands": true,
      "D26 Mandai / Upper Thomson": true,
      "D27 Sembawang / Yishun": true,
      "D28 Seletar / Yio Chu Kang": true,
    },
    propertyType: "all",
    maxPrice: 1000000,
    minPrice: 0,
    bedroom: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    bathroom: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    maxFloorSize: 5000,
    minFloorSize: 0,
  });
  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      axios
        .get("/api/property_listing/search_managed_property_listings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setPropertyList(res.data.properties);
          } else {
            console.log(res.status);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => setIsLoading(false));
    }
  }, []);

  const propertyType = ["all", "HDB", "CONDO", "LANDED"];

  const displayLoading = () => {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  };

  const checkSearchFilter = (propertyJson) => {
    return (
      filter.district[propertyJson.district] &&
      propertyJson.price < filter.maxPrice &&
      propertyJson.price > filter.minPrice &&
      (filter.propertyType === "all" ||
        propertyJson.type === filter.propertyType) &&
      (Object.values(filter.bedroom).every((value) => value === false) ||
        filter.bedroom[propertyJson.num_of_bedrooms] ||
        (propertyJson.num_of_bedrooms > 5 && filter.bedroom[5])) &&
      (Object.values(filter.bathroom).every((value) => value === false) ||
        filter.bathroom[propertyJson.num_of_bathrooms] ||
        (propertyJson.num_of_bathrooms > 5 && filter.bathroom[5])) &&
      propertyJson.area < filter.maxFloorSize &&
      propertyJson.area > filter.minFloorSize &&
      propertyJson.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const searchFilter = () => {
    let filtered_list = [];
    propertyList.forEach((propertyJson) => {
      if (checkSearchFilter(propertyJson)) {
        filtered_list.push(
          <PropertyListingCard
            key={propertyJson.id}
            name={propertyJson.name}
            id={propertyJson.id}
            address={propertyJson.address}
            num_bathrooms={propertyJson.num_of_bathrooms}
            num_bedrooms={propertyJson.num_of_bedrooms}
            district={propertyJson.district}
            price={propertyJson.price}
            property_type={propertyJson.property_type}
            area={propertyJson.area}
            is_sold={propertyJson.is_sold}
            transaction_date={propertyJson.transaction_date}
          />
        );
      }
    });
    return filtered_list;
  };
  const displayList = () => {
    return searchFilter();
  };

  const displayEmptyList = () => {
    return <span>No Listings Available</span>;
  };

  if (isLoading) {
    displayLoading();
  }

  return (
    <div className="flex flex-col justify-center mx-10 my-4">
      <CreateNewPropertyModal
        state={createNewPropertyModal}
        setState={setPropertyModalOpen}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-5">
        <TextInput
          id="Search"
          placeholder="Search Property"
          className="mr w-96"
          icon={FaSearch}
          sizing="lg"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div
          className="flex flex-row items-center justify-center gap-5 my-2"
          id="selectBoxes"
        >
          <Dropdown
            label="Dropdown button"
            renderTrigger={() => (
              <Button
                size="lg"
                className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
                color="purple"
              >
                Filter
                <BsArrowDownShort className="ml-2" size={24} />
              </Button>
            )}
          >
            <div id="property-filter" className="flex flex-col p-4 gap-2">
              <div className="flex flex-col">
                <Label className="font-normal mb-2">District:</Label>
                <Dropdown
                  label="Dropdown button"
                  renderTrigger={() => (
                    <Button
                      className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
                      color="purple"
                    >
                      District
                      <BsArrowDownShort className="ml-2" size={24} />
                    </Button>
                  )}
                >
                  {Object.keys(filter.district).map((key) => (
                    <div key={key} className="flex gap-2 my-2 mx-2">
                      <Checkbox
                        id={key}
                        checked={filter.district[key]}
                        onChange={() => {
                          setFilter({
                            ...filter,
                            district: {
                              ...filter.district,
                              [key]: !filter.district[key],
                            },
                          });
                        }}
                      />
                      <Label htmlFor="buyer" className="flex">
                        {key}
                      </Label>
                    </div>
                  ))}
                </Dropdown>
              </div>
              <div className="flex flex-col">
                <Label className="font-normal mb-2">Property Type:</Label>
                <Button.Group id="property_type">
                  {propertyType.map((name) => (
                    <Button
                      value={name}
                      key={name}
                      className={
                        filter.propertyType === name
                          ? "bg-custom_purple1 outline"
                          : "bg-white text-black outline"
                      }
                      onClick={() =>
                        setFilter({
                          ...filter,
                          ["propertyType"]: name,
                        })
                      }
                    >
                      {name}
                    </Button>
                  ))}
                </Button.Group>
              </div>
              <div className="flex flex-col">
                <Label className="font-normal">Price:</Label>
                <div className="w-full bg-gray-200 rounded-full h-1.5 relative mt-6">
                  <div
                    className="bg-indigo-300 h-1.5 rounded-full absolute"
                    style={{
                      left: `${(filter.minPrice / 1000000) * 100}%`,
                      right: `${100 - (filter.maxPrice / 1000000) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="relative mb-6 top-[-7px]">
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < filter.maxPrice) {
                        setFilter({
                          ...filter,
                          minPrice: value,
                        });
                      }
                    }}
                    min={0}
                    max={1000000}
                    id="medium-range"
                    type="range"
                    value={filter.minPrice}
                    className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
                  ></input>
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > filter.minPrice) {
                        setFilter({
                          ...filter,
                          maxPrice: value,
                        });
                      }
                    }}
                    min={0}
                    max={1000000}
                    id="medium-range"
                    type="range"
                    value={filter.maxPrice}
                    className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
                  ></input>
                  <style>
                    {`
                        input::-webkit-slider-thumb {
                            pointer-events: auto;
                        }
                        `}
                  </style>
                </div>
                <div className="flex flex-row justify-between">
                  <Label className="font-normal">${filter.minPrice} </Label>
                  <Label className="font-normal">${filter.maxPrice} </Label>
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="font-normal mb-2">Bedrooms:</Label>
                <Button.Group id="bedroom">
                  {Object.keys(filter.bedroom).map((number) => (
                    <Button
                      value={number}
                      key={number}
                      className={
                        filter.bedroom[number]
                          ? "bg-custom_purple1 outline"
                          : "bg-white text-black outline"
                      }
                      onClick={() =>
                        setFilter({
                          ...filter,
                          bedroom: {
                            ...filter.bedroom,
                            [number]: !filter.bedroom[number],
                          },
                        })
                      }
                    >
                      {number}
                    </Button>
                  ))}
                </Button.Group>
              </div>
              <div className="flex flex-col">
                <Label className="font-normal mb-2">Bathrooms:</Label>
                <Button.Group id="bathroom">
                  {Object.keys(filter.bathroom).map((number) => (
                    <Button
                      value={number}
                      key={number}
                      className={
                        filter.bathroom[number]
                          ? "bg-custom_purple1 outline"
                          : "bg-white text-black outline"
                      }
                      onClick={() =>
                        setFilter({
                          ...filter,
                          bathroom: {
                            ...filter.bathroom,
                            [number]: !filter.bathroom[number],
                          },
                        })
                      }
                    >
                      {number}
                    </Button>
                  ))}
                </Button.Group>
              </div>
              <div className="flex flex-col">
                <Label className="font-normal">Floor size:</Label>
                <div className="w-full bg-gray-200 rounded-full h-1.5 relative mt-6">
                  <div
                    className="bg-indigo-300 h-1.5 rounded-full absolute"
                    style={{
                      left: `${(filter.minFloorSize / 5000) * 100}%`,
                      right: `${100 - (filter.maxFloorSize / 5000) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="relative mb-6 top-[-7px]">
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value < filter.maxFloorSize) {
                        setFilter({
                          ...filter,
                          minFloorSize: value,
                        });
                      }
                    }}
                    min={0}
                    max={5000}
                    id="medium-range"
                    type="range"
                    value={filter.minFloorSize}
                    className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
                  ></input>
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > filter.minFloorSize) {
                        setFilter({
                          ...filter,
                          maxFloorSize: value,
                        });
                      }
                    }}
                    min={0}
                    max={5000}
                    id="medium-range"
                    type="range"
                    value={filter.maxFloorSize}
                    className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
                  ></input>
                  <style>
                    {`
                        input::-webkit-slider-thumb {
                            pointer-events: auto;
                        }
                        `}
                  </style>
                </div>
                <div className="flex flex-row justify-between">
                  <Label className="font-normal">
                    {filter.minFloorSize} sqft
                  </Label>
                  <Label className="font-normal">
                    {filter.maxFloorSize} sqft
                  </Label>
                </div>
              </div>
            </div>
          </Dropdown>
          <Button
            size="lg"
            className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
            color="purple"
            onClick={() => setPropertyModalOpen(true)}
          >
            Create new Property
          </Button>
        </div>
      </div>

      <div>
        {displayList()}
        {searchFilter().length == 0 && displayEmptyList()}
      </div>
    </div>
  );
}
