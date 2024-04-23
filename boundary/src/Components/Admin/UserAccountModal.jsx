import { Button, Modal, Card, Label, Textarea, Checkbox, TextInput } from "flowbite-react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { useState, useRef } from 'react';

function UserAccountModal({state, setState, primaryKey}){
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

  const [editedAccount, setEditedAccount] = useState(account);
  
  const handleChange = (event) => {
    setEditedAccount({
      ...editedAccount,
      [event.target.id]: event.target.value
    });
  };

  const handleConfirmButton = () => {
    setAccount(editedAccount);
    setIsEditable(false);
  }

  const handleCancelButton = () => {
    setEditedAccount(account);
    setIsEditable(false);
  }

  return(
    <>
      <Modal
        className=""
        show={state}
        onClose={() => setState(false)}
        size="sm"
      >
          {!isEditable && <FaTimes className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer"  // Added absolute positioning
          onClick={() => setState(false)} />  }

          {!isEditable && <FaPencilAlt className="absolute top-0 right-0 m-2 rounded-md w-5 h-5 cursor-pointer" onClick={() => setIsEditable(!(isEditable))} />}
        <Card className=" ">
          <div className="flex flex-col items-center">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white" contentEditable={isEditable}>
              {account.firstName + " " + account.lastName}
            </h5>
            <FaUser className="w-20 h-20 rounded-full my-5" />
            <h5>{account.role}</h5>
            <div className="mt-4 w-64 flex flex-col gap-y-2">
              <section className="flex flex-col">
                <Label htmlFor="email" value="Email"/>
                <TextInput id="email" value={account.email} onChange={handleChange} disabled={true} />
              </section>
              <section className="flex flex-col">
                <Label htmlfor="password" value="Password"/>
                <TextInput id="password" type="password" value={editedAccount.password} onChange={handleChange} disabled={!isEditable} readOnly={!isEditable}/>
              </section>
              <section className="flex flex-col">
                <Label htmlfor="phone" value="Phone" />
                <TextInput id="phone" value={editedAccount.phone} onChange={handleChange} disabled={!isEditable} readOnly={!(isEditable)}/> 
              </section>
              <section className="flex justify-center pt-5 gap-5">
                {isEditable && <> <Button color="failure" className=" w-1/2" onClick={handleCancelButton}>Cancel</Button> <Button className="bg-custom_purple1 w-1/2 text-white"  onClick={handleConfirmButton}>Confirm</Button> </>}
              </section>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}
export default UserAccountModal;