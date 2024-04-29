import { useContext, useEffect, useState } from "react";
import { TextInput, Button, Spinner } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { BsArrowDownShort } from "react-icons/bs";

import PropertyListingCard from "../Components/Agent/PropertyListingCard";
import CreateNewPropertyModal from "../Components/Agent/CreateNewPropertyModal";

export default function PropertyListingManagementPage({ }) {
    // const [propertyListingsList, setPropertyListingsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createNewPropertyModal, setPropertyModalOpen] = useState(false);
    const [newProperty, setNewProperty] = useState(false);
    const [search, setSearch] = useState("");
    const [filterModal, setFilterModalOpen] = useState(false);
    const sampleObject = {
        "success": true,
        "listings": [
            {
                "name": "Property Name 1",
                "id": "1",
                "address": "31 Thomson Rd",
                "num_bedrooms": 5,
                "num_bathrooms": 5,
                "district": "1",
                "property_type": "HDB",
                "area": 500.0,
                "is_sold": false,
                "transaction_date": "30/3/2016"
            },
            {
                "name": "Property Name 2",
                "id": "2",
                "address": "32 Thomson Rd",
                "num_bedrooms": 6,
                "num_bathrooms": 6,
                "district": "5",
                "property_type": "landed",
                "area": 1200.0,
                "is_Sold": true,
                "transaction_date": "30/2/2015"
            },
            {
                "name": "Property Name 3",
                "id": "3",
                "address": "31 Thomson Rd",
                "num_bedrooms": 5,
                "num_bathrooms": 5,
                "district": "1",
                "property_type": "HDB",
                "area": 500.0,
                "is_sold": false,
                "transaction_date": "30/3/2016"
            }]
    }

    const checkSearch = (propertyListing) => {
        
    }

    const displayModal = () => {

    }

    const displayLoading = () => {
        return (
            <div className="text-center text-8xl">
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        );
    }

    const displayList = () => {
        return (
            sampleObject.listings.map(listing => {
                return (
                     <PropertyListingCard
                        key={listing.id}
                        name={listing.name}
                        id={listing.id}
                        address={listing.address}
                        num_bathrooms={listing.num_bathrooms}
                        num_bedrooms={listing.num_bedrooms}
                        district={listing.district}
                        property_type={listing.property_type}
                        area={listing.area}
                        is_sold={listing.is_sold}
                        transaction_date={listing.transaction_date}
                    />
                )
            })
        );
    }

   

    const displayEmptyList = () => {
        return (
            <span>No Listings Available</span>
        )
    }

    if (isLoading) {
        displayLoading();
    }

    return (
        <div className="flex flex-col justify-center items-center align-middle mx-10 my-4">
            <CreateNewPropertyModal state={createNewPropertyModal} setState={setPropertyModalOpen} />
            <div className="flex w-full justify-between flex-wrap items-center gap-5">
                <TextInput
                    id="Search"
                    placeholder="Search profile"
                    className="mr w-96"
                    icon={FaSearch}
                    sizing="lg"
                    onChange={(event) => setSearch(event.target.value)}
                />
                <div
                    className="flex flex-row items-center justify-center gap-5 my-2"
                    id="selectBoxes">
                    <Button
                        size="lg"
                        className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
                        color="purple"
                        onClick={() => setFilterModalOpen(true)}
                    >
                        Filter
                        <BsArrowDownShort className="ml-2" size={24} />
                    </Button>

                    <Button
                        size="lg"
                        className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
                        color="purple"
                        onClick={() => setPropertyModalOpen(true)}>
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