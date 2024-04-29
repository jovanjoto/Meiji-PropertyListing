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

import PropertyListingCard from "../Components/Agent/PropertyListingCard";
import CreateNewPropertyModal from "../Components/Agent/CreateNewPropertyModal";

export default function PropertyListingManagementPage({}) {
  // const [propertyListingsList, setPropertyListingsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewPropertyModal, setPropertyModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    district: {
      jurongwest: true,
      jurongeast: true,
      central: true,
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
  const [propertyList, setPropertyList] = useState([
    {
      name: "Property Name 1",
      id: "1",
      address: "31 Thomson Rd",
      num_bedrooms: 5,
      num_bathrooms: 5,
      district: "jurongwest",
      property_type: "HDB",
      area: 500.0,
      price: 500000,
      is_sold: false,
      transaction_date: "30/3/2016",
    },
    {
      name: "Property Name 2",
      id: "2",
      address: "32 Thomson Rd",
      num_bedrooms: 6,
      num_bathrooms: 6,
      district: "jurongeast",
      property_type: "landed",
      area: 1200.0,
      price: 100000,
      is_Sold: true,
      transaction_date: "30/2/2015",
    },
    {
      name: "Property Name 3",
      id: "3",
      address: "31 Thomson Rd",
      num_bedrooms: 3,
      num_bathrooms: 3,
      district: "central",
      property_type: "HDB",
      area: 500.0,
      price: 200000,
      is_sold: false,
      transaction_date: "30/3/2016",
    },
  ]);
  const propertyType = ["all", "HDB", "condominium", "landed"];
  const checkSearch = (propertyListing) => {};

  const displayLoading = () => {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  };

  const checkSearchFilter = (propertyJson) => {
    return filter.district[propertyJson.district] 
    && propertyJson.price < filter.maxPrice && propertyJson.price > filter.minPrice
    && (filter.propertyType === "all" || propertyJson.property_type === filter.propertyType)
    && (Object.values(filter.bedroom).every(value => value === false) || filter.bedroom[propertyJson.num_bedrooms] || (propertyJson.num_bedrooms > 5 && filter.bedroom[5]))
    && (Object.values(filter.bathroom).every(value => value === false) || filter.bathroom[propertyJson.num_bathrooms] || (propertyJson.num_bathrooms > 5 && filter.bathroom[5]))
    && propertyJson.area < filter.maxFloorSize && propertyJson.area > filter.minFloorSize
    && propertyJson.name.toLowerCase().includes(search.toLowerCase());

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
            num_bathrooms={propertyJson.num_bathrooms}
            num_bedrooms={propertyJson.num_bedrooms}
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
        {/* {searchFilter().length == 0 && displayEmptyList()} */}
      </div>
    </div>
  );
}
