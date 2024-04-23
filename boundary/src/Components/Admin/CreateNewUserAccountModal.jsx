import {
  Button,
  Modal,
  Card,
  Label,
  Textarea,
  Checkbox,
  TextInput,
  Radio,
} from "flowbite-react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { useState, useRef } from "react";

function CreateNewUserAccountModal({ state, setState }) {
  const passwordRef = useRef("");
  const [isEditable, setIsEditable] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState("");

  const [account, setAccount] = useState({
    role: "Buyer",
    firstName: "Klay",
    lastName: "Thompson",
    email: "youaremysunshine@email.com",
    password: "12345678",
    phone: "+65 88889999",
  });

  const profiles = [
    "Buyer",
    "Seller",
    "Real Estate Agent",
    "Profile1",
    "Profile2",
    "Profile3",
    "Profile4",
  ];

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Modal
        className=""
        show={state}
        onClose={() => setState(false)}
        size="sm"
      >
        <FaTimes
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
          onClick={() => setState(false)}
        />

        <Card className=" ">
          <div className="flex flex-col items-center">
          <FaUser className="w-20 h-20 rounded-full mt-5"/>
            <div className="mt-4 w-64 flex flex-col gap-y-2">
              <section className="flex flex-col">
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="email"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </section>
              <section className="flex flex-col">
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </section>
              <section className="flex flex-col">
                <Label htmlfor="password" value="Password" />
                <TextInput
                  id="password"
                  type="password"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </section>
              <section className="flex flex-col">
                <Label htmlfor="phone" value="Phone" />
                <TextInput
                  id="phone"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </section>
              <Label htmlFor="role" value="Role"/>
              <section className="flex flex-col overflow-auto h-20 gap-y-1 justify-center border ">
        
                {profiles.map((profile, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Label htmlFor={profile} value={profile} /> {/* Bugs here */}
                    <Radio
                      id={profile}
                      name="role"
                      checked={selectedProfile === profile}
                      onChange={() => setSelectedProfile(profile)}
                    />
                    
                  </div>
                ))}
              </section>
              <section className="flex justify-center pt-5 gap-5">
              <Button color="failure" className=" w-1/2" onClick={() =>  setState(false)}>Cancel</Button>
                <Button
                  className="bg-custom_purple1 w-1/2"
                  onClick={() => setState(false)}
                >
                  Confirm
                </Button>
              </section>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}
export default CreateNewUserAccountModal;
