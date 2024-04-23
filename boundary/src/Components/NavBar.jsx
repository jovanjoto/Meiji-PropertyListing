import { Navbar, Dropdown } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useLocation } from "react-router-dom";
import { BiDownArrow } from "react-icons/bi";

export default function NavBar({ }) {
    //get route
    const { pathname } = useLocation();

    //get role
    const permission = "admin";
    // an object of permissions
    const permissions = {
        "admin": {
            "User Account": "/viewAccounts",
            "User Profile": "/viewProfiles"
        },
        //add buyer and seller later
    };



    const displayNavBar = () => {
        return (
            <>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {Object.entries(permissions[permission]).map(([key, value]) => (
                        (value === pathname) ?
                            (<Navbar.Link href={value} active className="text-lg mx-4" key={key}>{key}</Navbar.Link>) :
                            (<Navbar.Link href={value} className="text-lg mx-4" key={key}>{key}</Navbar.Link>)

                    ))}
                </Navbar.Collapse>
            </>
        );
    }

    return (
        <Navbar fluid rounded className=" max-w-full bg-gray-100 py-4">

            
            {(permission in permissions) && (displayNavBar())}

            <Dropdown
                arrowIcon={false}
                inline
                label={
                    // <Avatar img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    <IconContext.Provider value={{ size: "2em" }}>
                        <BsFillPersonFill className="hover:text-gray-500 align-middle mr-5" />
                    </IconContext.Provider>
                }
            >
                <Dropdown.Item>Log Out</Dropdown.Item>
                <Dropdown.Item>View User Account</Dropdown.Item>
            </Dropdown>
        </Navbar>
        


    );
}