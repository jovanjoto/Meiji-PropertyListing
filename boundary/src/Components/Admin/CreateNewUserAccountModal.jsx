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
import { FaPencilAlt, FaTimes } from "react-icons/fa";
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
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5" // Added absolute positioning
          onClick={() => setState(false)}
        />

        <Card className=" ">
          <div className="flex flex-col items-center">
            <img
              className="rounded-full  w-20 my-2"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
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
              <section className="flex justify-center pt-5">
                <Button
                  className="bg-custom_purple1 w-64"
                  onClick={() => setState(false)}
                >
                  Confirm
                </Button>
              </section>
              <section className="flex flex-col overflow-auto h-20 w-auto gap-y-3 justify-center mt-5">
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
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}
export default CreateNewUserAccountModal;
