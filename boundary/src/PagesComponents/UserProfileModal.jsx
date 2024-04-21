import { Button, Modal, Card, Label, Textarea, Checkbox } from "flowbite-react";
import { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

function UserProfileModal({ state, setState }) {
  const [isEditable, setIsEditable] = useState(false);
  
  const [profile, setProfile] = useState({
    name : "Real Estate Agent",
    description : "",
    permissions : []
  })

  const permissions = ["Buying", "Selling", "Renting"]
  return (
    <>
      <Modal
        className=""
        show={state}
        onClose={() => setState(false)}
        size="md"
      >
          <FaTimes className="absolute top-0 left-0 m-2 rounded-md w-5 h-5"  // Added absolute positioning
          onClick={() => setState(false)} />  
          <FaPencilAlt className="absolute top-0 right-0 m-2 rounded-md w-5 h-5" onClick={() => setIsEditable(!(isEditable))} />
        <Card className=" ">
          <div className="flex flex-col items-center">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white" contentEditable={(isEditable)}>
              {profile.name}
            </h5>
            <img className="rounded-full  w-20 my-2"src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'/>
            <div className="mt-4 flex flex-col gap-y-5">
              <section className="flex flex-col">
                <Label htmlFor="description" value="Description"/>
                <textarea className="resize-none h-40 w-64" readOnly={!(isEditable)}/>
              </section>
              <section className="flex flex-col">
                <Label htmlfor="permissions" value="Permissions"/>
                <Card className="w-64">
                  {permissions.map((permission, index) => (
                    <div className="flex flex-row justify-between">
                      <Label htmlFor={permission} value={permission}/>
                      <Checkbox key={index} disabled={!isEditable} className="text-custom_purple_1"/>
                    </div>
                  ))}
                </Card>
              </section>
              <section>
              {isEditable && <Button className="bg-custom_purple1 w-64" onClick={() => setState(false)}>Confirm</Button>}
              </section>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
}
export default UserProfileModal;
