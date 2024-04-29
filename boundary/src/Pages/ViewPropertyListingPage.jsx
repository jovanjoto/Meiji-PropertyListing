import { useParams } from "react-router-dom"

import { Card } from "flowbite-react";
import sampleImg from "../assets/sample_img.jpg";
import { CiLocationOn } from "react-icons/ci";

export default function ViewPropertyListingPage({ }) {
    const sampleObject = {
        "success": true,
        "listing":
        {
            "name": "Property Name 1",
            "id": "1",
            "img_url": "sample_img",
            "address": "31 Thomson Rd",
            "description": "This is a sample description which may take up a few paragraphs",
            "price": 10000.00,
            "num_bedrooms": 5,
            "num_bathrooms": 5,
            "district": "1",
            "property_type": "HDB",
            "area": 500.0,
            "is_sold": false,
            "transaction_date": "30/3/2016"
        }
    }

    const params = useParams();
    const id = params.id;
    return (
        <div className="flex h-screen justify-center align-middle items-center md:justify-between align-middle mx-8">
            <Card
                className="w-full"
            >
                <div className="flex flex-row gap-5">
                    <div>
                        <img
                            src={sampleImg}
                            style={{ width: "400px", height: "450px" }}
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{sampleObject.listing.name}</h1>
                        <div
                            className="flex flex-row mb-2"

                        >
                            <CiLocationOn
                                className="mr-2"
                                size={18} />
                            <p className="text-xs text-gray-600 ">{sampleObject.listing.address}</p>
                        </div>

                        <div className="flex flex-row justify-items-between">
                            
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">{sampleObject.listing.price}</h1>
                            

                        </div>


                        <h3 className="text-xl font-bold tracking-tight text-gray-900">About This Property</h3>
                        <p className="text-gray-900">{sampleObject.listing.description}</p>
                    </div>
                </div>

            </Card>
        </div>
    )
}