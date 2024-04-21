import { Button, TextInput } from "flowbite-react";
import { BiDownArrow } from "react-icons/bi";

export default function SearchAndFilter({type, setCreateAccountModelState}) {
    return (
        <>
            <div className='flex justify-between my-10'>
                    <div className='basis-9/12'>
                        <TextInput id="Search" placeholder="Search (Username)" className='mr-5'/>
                    </div>
                    <div className='flex basis-3/12'>
                        <Button className='bg-custom_purple1 flex items-center mr-5'>Filter
                            <BiDownArrow className='ml-5'/>
                        </Button>

                    <Button className='bg-custom_purple1 flex items-center' onClick={() => setCreateAccountModelState(true)}>Create New {type}</Button>
                    </div>
                        
            </div>
        </>
    );
}