import { useState } from 'react';
import { Button, TextInput } from "flowbite-react";
import { BiDownArrow } from "react-icons/bi";


import UserCard from "../Components/Admin/UserAccountCard"
import SearchAndFilter from '../Components/Admin/SearchAndFilter';

export default function UserAccountManagementPage({ }) {
    const [isLoading, setIsLoading] = useState(false);
    
    const displayList = () => {
        return (
            <>
                <SearchAndFilter
                type="Account"
                />
                    
                <div>
                    <UserCard
                        userType="Real Estate Agent"
                        rating="4.2"
                        name="LeBron"
                        email="lebron@gmail.com"
                        phone_num="1111111"
                        isSuspended="false"
                    />
                </div>
            </>
        )
    }

    const displayLoading = () => {
        return (
            <>
                <h1>Loading</h1>
            </>
        )
    }

    

    return (
        <>
            {isLoading ? (
                displayLoading()
            ) : (
                displayList()
            )}
        </>
    );
} 

