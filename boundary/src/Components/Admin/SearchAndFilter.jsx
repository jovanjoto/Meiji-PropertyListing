import { Button, TextInput, Dropdown } from "flowbite-react";
import { BiDownArrow } from "react-icons/bi";

export default function SearchAndFilter({type, setCreateAccountModelState}) {
    return (
        <>
            <div className='flex flex-col my-10 md:flex-row justify-between'>
                <div className='basis-7/12 my-2'>
                    <TextInput id="Search" placeholder="Search (Username)"/>
                </div>
                
                <div className='basis-1/6 my-2'>
                    
                    <Dropdown label="Dropdown" theme={{floating: {target: "w-full"}}} color="purple">
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown>
                </div>

                <div className='basis-1/6 my-2 items-center'>
                    <Button className='bg-custom_purple1 flex items-center w-full' onClick={() => setCreateAccountModelState(true)}>Create {type}</Button>
                </div>
                        
            </div>
        </>
    );
}