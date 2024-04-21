import { Button, Modal, Card, Label, Textarea, Checkbox, TextInput } from "flowbite-react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useState, useRef } from 'react';

function UserAccountModal({state, setState}){
  const passwordRef = useRef("");
  const [isEditable, setIsEditable] = useState(false);

  const [account, setAccount] = useState({
    role : "Buyer",
    firstName : "Klay",
    lastName : "Thompson",
    email : "youaremysunshine@email.com",
    password : "12345678",
    phone : '+65 88889999'
  });
  
  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.id]: event.target.value
    });
  };

  return(
    <>
      <Modal
        className=""
        show={state}
        onClose={() => setState(false)}
        size="sm"
      >
          <FaTimes className="absolute top-0 left-0 m-2 rounded-md w-5 h-5"  // Added absolute positioning
          onClick={() => setState(false)} />  
          <FaPencilAlt className="absolute top-0 right-0 m-2 rounded-md w-5 h-5" onClick={() => setIsEditable(!(isEditable))} />
        <Card className=" ">
          <div className="flex flex-col items-center">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white" contentEditable={isEditable}>
              {account.firstName + " " + account.lastName}
            </h5>
            <img className="rounded-full  w-20 my-2" src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'/>
            <h5>{account.role}</h5>
            <div className="mt-4 w-64 flex flex-col gap-y-2">
              <section className="flex flex-col">
                <Label htmlFor="email" value="Email"/>
                <TextInput id="email" value={account.email} onChange={handleChange} readOnly={!(isEditable)} />
              </section>
              <section className="flex flex-col">
                <Label htmlfor="password" value="Password"/>
                <TextInput id="password" type="password" value={account.password} onChange={handleChange} readOnly={!(isEditable)}/>
              </section>
              <section className="flex flex-col">
                <Label htmlfor="phone" value="Phone" />
                <TextInput id="phone" value={account.phone} onChange={handleChange} readOnly={!(isEditable)}/> 
              </section>
              <section className="flex justify-center pt-5">
                {isEditable && <Button className="bg-custom_purple1 w-64" onClick={() => setState(false)}>Confirm</Button>}
              </section>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}
export default UserAccountModal;