import { Card, Button } from "flowbite-react";
import { BsBuildingFill } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { LuBath } from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MarkAsSoldModal from "./MarkAsSoldModal";
import ConfirmationModal from "../ConfirmationModal";
import axios from "axios";
import MessageModal from "../Admin/MessageModal";
import { AuthContext } from "../Authentication/AuthContext";


export default function PropertyListingCard({ name, id, address, num_bedrooms, num_bathrooms, district, price, property_type, area, is_sold, transaction_date }) {
    const { token } = useContext(AuthContext)
    const [showMarkAsSoldModal, setShowMarkAsSold] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
	const navigate = useNavigate();

    const onCloseModal = (x) => {
		setMessageModal(x);
		window.location.reload();
	};

    const markAsSold = () => {
        //enter function here when merging
    };

	const redirectToPage = (id) => {
        navigate(`/agent/viewPropertyListingPage/${id}`);
    };
	
    const removeListing = () => {
        //enter function here when merging
        axios
            .delete("/api/property_listing/remove_property_listing", {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                data: {
                  listing_id: id
                }
              })
            .then((res)=>{
                if (res.data.success) {
                    setMessageModal(true);
                    setConfirmationModal(false);
                } else {
                    alert("Failed to remove property");
                }
            })
            .catch((err) => {console.log(err)});
    };

    return (
        <>
            <MarkAsSoldModal
                state={showMarkAsSoldModal}
                setState={setShowMarkAsSold}
                id={id}
                name={name}
                property_type={property_type}
            >
            </MarkAsSoldModal>
            <MessageModal
				id="suspend-status"
				state={messageModal}
				setState={onCloseModal}
			>{`${name} successfully removed.`}</MessageModal>
            <ConfirmationModal
				state={confirmationModal}
				setState={setConfirmationModal}
				action={removeListing}
			>Remove {name} </ConfirmationModal>
            <Card
                id="account-card"
                variant="outline"
                direction={{ base: "column", sm: "row" }}
                className="w-full my-2"

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
                                <span className="text-3xl" id="name">
                                    {name}
                                </span>
                                <span className="text-sm">{address}</span>
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

                                    <div className="flex flex-col">
                                        <span className="text-md font-medium mr-2">${price}</span>
                                        <span className="text-sm mr-2">{area} sqft</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex md:w-5/12 w-full items-center justify-center gap-x-5">
                        {/* view acc, suspend acc */}
                        <Button
                            color="purple"
                            className="bg-custom_purple1 w-1/3 py-2"
                            onClick={() => redirectToPage(id)}
                        >
                            View
                        </Button>
                        <Button
                            color="purple"
                            onClick={()=> {setConfirmationModal(true)}}
                            className="bg-custom_purple1 w-1/3 py-2"
                        >
                            Remove
                        </Button>
                        {is_sold === true ? (
                            <Button
                                disabled
                                color="purple"
                                onClick={markAsSold}
                                className="mx-2 bg-custom_purple1 w-1/3 ml-2 h-14 items-center my-1 text-white"
                            >
                                Sold on {transaction_date}
                            </Button>
                        ) : (
                            <Button
                                color="purple"
                                className="mx-2 bg-custom_purple1 w-1/3 ml-2 h-14 items-center my-1"
                                onClick={() => setShowMarkAsSold(true)}
                            >
                                Mark As Sold
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
}
