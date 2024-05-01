import { Card, Button } from "flowbite-react";
import { BsBuildingFill } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { LuBath } from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";


export default function BuyerPropertyListingCard({ name, id, address, num_bedrooms, num_bathrooms, district, price, property_type, area, is_sold, transaction_date }) {
    const { token } = useContext(AuthContext)
	const navigate = useNavigate();

	const redirectToPage = (id) => {
        navigate(`/buyer/viewPropertyListingPage/${id}`);
    };
	
    return (
        <>
            <Card
                id="account-card"
                variant="outline"
                direction={{ base: "column", sm: "row" }}
                className="w-full my-2"
                onClick={() => redirectToPage(id)}
            >
                <div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5">
                    <div className="flex flex-row items-center gap-6 align-middle">
                        <div className="flex flex-col justify-center items-center align-middle gap-1 w-32">
                            {(property_type === "HDB" || property_type === "CONDO") ?
                                <BsBuildingFill size={50} /> :
                                <BsFillHouseDoorFill size={50} />}

                            {<p className="text-center" id="profile-name">{property_type}</p>}

                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col justify-center gap-1">
                                <span className="text-3xl mb-1" id="name">
                                    {name}
                                </span>
                                <span className="text-sm">{address}</span>
                                <span className="text-sm">${price}</span>
                                <div className="flex flex-row">
                                    <div className="mr-20">
                                        <div className="flex flex-row">
                                            <span className="text-sm mr-2">{num_bedrooms} </span>
                                            <span><FaBed size={20} /></span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="text-sm mr-2">{num_bathrooms}</span>
                                            <span><LuBath size={20} /></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
        </>
    );
}
