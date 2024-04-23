import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import UserAccountModal from "./UserAccountModal";
import { useState } from "react";


export default function UserAccountCard({ userType, firstName, lastName, email, phone_num, isSuspended, suspensionDate}) {
    const [showViewModal, setShowViewModal] = useState(false);
    return (
        <>
            <UserAccountModal
                state={showViewModal}
                setState={setShowViewModal}
            />
            
            <Card variant="outline" direction={{base: "column", sm: "row"}} className="w-full" >
                <div className="flex">
                    <div className="flex basis-1/6 items-center justify-center">
                        <div className="flex flex-col basis-2/6 items-center justify-center ">
                            {/* Icon, text, rating, etc. */}
                            
                            {<BsFillPersonFill size={"3em"}/>}
                            {userType === "admin" ? <p className="text-center">System Administrator</p>
                                : userType === "buyer" ? <p className="text-center">Buyer</p>
                                : userType === "seller" ? <p className="text-center">Seller</p>
                                : <p className="text-center">Real Estate Agent</p>
                            }
                            
                        </div>
                    </div>
                
                    <div className="flex flex-col basis-8/12 items-start mx-2">
                        {/* Name email phone */}
                        <p className="text-3xl">{firstName} {lastName}</p>
                        <p className="text-sm"> {email}</p>
                        <p className="text-sm">{phone_num}</p>
                    </div>

                    <div className="flex flex-col basis-6/12 items-center justify-center md:flex-row">
                        {/* view acc, suspend acc */}
                        <Button className="mx-2 bg-custom_purple1 w-1/2 mr-2 h-14 items-center my-1" onClick={() => setShowViewModal(true)}>View</Button>
                        {isSuspended === true ?
                            <Button disabled className="mx-2 bg-custom_purple2 w-1/2 ml-2 h-14 items-center my-1 text-white">Suspended until {suspensionDate}</Button>
                            : <Button className="mx-2 bg-custom_purple1 w-1/2 ml-2 h-14 items-center my-1">Suspend</Button>}
                        
                    </div>
                </div>
            </Card>
        </>
    );
}
