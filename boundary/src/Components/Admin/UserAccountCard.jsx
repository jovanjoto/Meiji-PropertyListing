import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";


export default function UserAccountCard({userType, name, email, phone_num, setAccountModalState}) {
    return (
        <div className='flex my-10'>
            <Card variant="outline" direction={{base: "column", sm: "row"}} className="w-full" >
                <div className="flex">
                    <div>
                        <div className="flex flex-col basis-1/6 items-center justify-center ">
                            {/* Icon, text, rating, etc. */}
                            <IconContext.Provider value={{ size: "3em" }}>
                                {<BsFillPersonFill />}
                            </IconContext.Provider>
                            <p className="text-center">{userType}</p>
                        </div>
                    </div> 
                
                    <div className="flex flex-col basis-8/12 items-start mx-2">
                        {/* Name email phone */}
                        <p className="text-3xl">{name}</p>
                        <p className="text-sm"> {email}</p>
                        <p className="text-sm">{phone_num}</p>
                    </div>

                    <div className="flex flex-col basis-6/12 items-center justify-center md:flex-row">
                        {/* view acc, suspend acc */}
                        <Button className="mx-2 bg-custom_purple1 w-1/2 mr-2 h-14 items-center my-1" onClick={() => setAccountModalState(true)}>View</Button>
                        <Button className="mx-2 bg-custom_purple1 w-1/2 ml-2 h-14 items-center my-1">Suspend</Button>
                    </div>
                </div>
            </Card>
            
        </div>
        
    );
}
