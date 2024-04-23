import { TextInput, Dropdown, Button, Label, Checkbox } from "flowbite-react";
import { BsArrowDownShort } from "react-icons/bs";
import { useState } from "react";

import UserAccountCard from "../Components/Admin/UserAccountCard";
import SearchAndFilter from "../Components/Admin/SearchAndFilter";
import UserAccountModal from '../Components/Admin/UserAccountModal';
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
import NavBar from "../Components/NavBar";
import { FaSearch } from "react-icons/fa";

export default function UserAccountManagementPage({ setCreateAccountModelState }) {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filteredUserType, setFilteredUserType] = useState(
        {
            "buyer": true,
            "seller": true,
            "realEstateAgent": true,
        }
    );
    const [userAccountModalState, setUserAccountModalState] = useState(false);
    const [createNewUserAccountModalState, setCreateNewUserAccountModalState] = useState(false);

    const users = [
        { "email": "lebron@gmail.com", "phone": "88888888", "first_name": "Lebron", "last_name": "James", "profile": "admin" },
        { "email": "lebron2@gmail.com", "phone": "88888888", "first_name": "Lebron", "last_name": "James", "profile": "buyer" },
        { "email": "lebron4@gmail.com", "phone": "88888888", "first_name": "Lebron", "last_name": "James", "profile": "seller" },
        { "email": "lebron3@gmail.com", "phone": "88888888", "first_name": "Lebron", "last_name": "James", "profile": "realEstateAgent", "isSuspended": true, "suspensionDate": "05/05/2024" }
    ]

    const checkSearchFilter = (profileJson) => {
        let search_bool = profileJson.first_name
            .toLowerCase()
            .startsWith(search.toLowerCase());
        let search_bool2 = profileJson.last_name
            .toLowerCase()
            .startsWith(search.toLowerCase());
        let search_bool3 = profileJson.first_name
            .concat(" ", profileJson.last_name)
            .toLowerCase()
            .startsWith(search.toLowerCase());
        let filter_bool = filteredUserType[profileJson.profile]
        
        
        return (
            (search_bool ||
            search_bool2 ||
            search_bool3) &&
            filter_bool 
        );
    };

    const handleFilter = (event) => {
        let copiedFilteredUserType = { ...filteredUserType }
        copiedFilteredUserType[event.target.id] = !copiedFilteredUserType[event.target.id]
        setFilteredUserType(
            { ...copiedFilteredUserType }
        )
    }

    const searchFilter = () => {
        let filtered_list = [];

        users.forEach((profileJson) => {
            if (checkSearchFilter(profileJson)) {
                filtered_list.push(
                    <UserAccountCard key={profileJson["email"]}
                        userType={profileJson["profile"]}
                        rating={profileJson["rating"]}
                        firstName={profileJson["first_name"]}
                        lastName={profileJson["last_name"]}
                        email={profileJson["email"]}
                        phone_num={profileJson["phone"]}
                        isSuspended={profileJson["isSuspended"]}
                        suspensionDate={profileJson["suspensionDate"]}
                        setAccountModalState={setUserAccountModalState}
                    />
                );
            }
        });
        return filtered_list;
    };

    const displayLoading = () => {
        return (
            <div className="text-center text-8xl">
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        );
    };

    const displayList = () => {
        return searchFilter();

    };

    const displayEmptyList = () => {
        return <span>No matching profiles found.</span>;
    };

    if (isLoading) {
        return displayLoading();
    }

    return (
        <div className="flex flex-col justify-center mx-10 my-4">
            <div className="flex w-full justify-between flex-wrap items-center gap-5">
                <TextInput
                    id="Search"
                    placeholder="Search User"
                    className="mr w-96"
                    icon={FaSearch}
                    sizing="lg"
                    onChange={(event) => setSearch(event.target.value)}
                />

                <div className="flex flex-row items-center justify-center gap-5 my-2" id="selectBoxes">
                    <Dropdown label="Dropdown button" renderTrigger={() =>
                        <Button className="bg-custom_purple1" color="purple">
                            Filter
                            <BsArrowDownShort className="h-5 w-5" />
                        </Button>}>
                        <div className="flex gap-2 my-2 mx-2">
                            <Checkbox id="buyer" checked={filteredUserType["buyer"]} onChange={handleFilter} />
                            <Label htmlFor="buyer" className="flex">Buyers</Label>
                        </div>
                        <div className="flex gap-2 my-2 mx-2">
                            <Checkbox id="seller" checked={filteredUserType["seller"]} onChange={handleFilter} />
                            <Label htmlFor="seller" className="flex">Sellers</Label>
                        </div>
                        <div className="flex gap-2 my-2 mx-2">
                            <Checkbox id="realEstateAgent" checked={filteredUserType["realEstateAgent"]} onChange={handleFilter} />
                            <Label htmlFor="realEstateAgent" className="flex">Real Estate Agents</Label>
                        </div>
                    </Dropdown>

                    <Button className='bg-custom_purple1' onClick={() => setCreateAccountModelState(true)}>Create Account</Button>
                </div>

            </div>

            <div className="flex flex-col justify-start items-center gap-5 my-6">
                {displayList()}
                {searchFilter().length == 0 && displayEmptyList()}
            </div>
        </div>
    );
}
