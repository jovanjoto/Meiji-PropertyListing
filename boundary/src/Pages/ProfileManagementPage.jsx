import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { BiDownArrow } from "react-icons/bi";
import SearchAndFilter from '../Components/Admin/SearchAndFilter';
import UserProfileCard from '../Components/Admin/UserProfileCard';
import UserProfileModal from '../Components/Admin/UserProfileModal';

export default function ProfileManagementPage({ }) {
    const [isLoading, setIsLoading] = useState(false);
    const [userProfileState, setUserProfileState] = useState(false);   
    const displayList = () => {
        return (
            <>  
                <UserProfileModal state={userProfileState} setState={setUserProfileState}/>
                <SearchAndFilter
                type="Profile"
                />

                <UserProfileCard
                userType="Real Estate Agent"
                setUserProfileState={setUserProfileState}
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