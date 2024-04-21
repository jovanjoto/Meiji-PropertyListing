import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { BiDownArrow } from "react-icons/bi";
import SearchAndFilter from '../Components/Admin/SearchAndFilter';
import UserProfileCard from '../Components/Admin/UserProfileCard';

export default function ProfileManagementPage({ }) {
    const [isLoading, setIsLoading] = useState(false);

    const displayList = () => {
        return (
            <>
                <SearchAndFilter
                type="Profile"
                />

                <UserProfileCard
                userType="Real Estate Agent"
                />

            </>
        );
    }

    return (
        <>
            {displayList()}


        </>
    );
}