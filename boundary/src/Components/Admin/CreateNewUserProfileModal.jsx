import {
  Button,
  Modal,
  Card,
  Label,
  Textarea,
  Checkbox,
  TextInput,
} from "flowbite-react";
import { FaTimes, FaUser } from "react-icons/fa";
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
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
          onClick={() => setState(false)}
        />
        <Card className=" ">
          <div className="flex flex-col items-center">
            <FaUser className="rounded-full h-20 w-20 mb-5" />
            <div className="grid grid-cols-2 gap-x-14">
              <section className="grid gap-y-4">
                <div>
                  <Label>Profile Name</Label>
                  <TextInput id="profileName" className="" />
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
                <Textarea id="description" className="h-60 resize-none" />
              </section>
            </div>
          </div>
          <section className="flex justify-center gap-5">
            <Button
              color="failure"
              className="w-1/4 mt-5"
              onClick={() => setState(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-custom_purple1 w-1/4 mt-5"
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
