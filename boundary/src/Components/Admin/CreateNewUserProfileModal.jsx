import {
  Button,
  Modal,
  Card,
  Label,
  Textarea,
  Checkbox,
  TextInput,
} from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { useState, useRef } from "react";

function CreateNewUserProfileModal({ state, setState }) {


  const permissions = ["Buying", "Listing", "Selling"];

  return (
    <>
      <Modal
        className=""
        show={state}
        onClose={() => setState(false)}
        size="2xl"
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
            <div className="grid grid-cols-2 gap-x-14">
              <section className="grid gap-y-4">
                <div>
                  <Label>Profile Name</Label>
                  <TextInput
                    id="profileName"
                    className=""
         
                  />
                </div>
                <div className="flex flex-col w-52">
                  <Label htmlFor="permissions" value="Permissions" />
                  <Card className="">
                    {permissions.map((permission, index) => (
                      <div className="flex flex-row justify-between">
                        <Label htmlFor={permission} value={permission} />
                        <Checkbox
                          key={index}
                          className="text-custom_purple_1 mb-2"
                        />
                      </div>
                    ))}
                  </Card>
                </div>
              </section>
              <section className="w-54">
                <Label>Description </Label>
                <Textarea
                  id="description"
                  className="h-60 resize-none"
               
                />
              </section>
            </div>
          </div>
          <section className="flex justify-center">
            <Button
              className="bg-custom_purple1 w-64 mt-5"
              onClick={() => setState(false)}
            >
              Confirm
            </Button>
          </section>
        </Card>
      </Modal>
    </>
  );
}

export default CreateNewUserProfileModal;
