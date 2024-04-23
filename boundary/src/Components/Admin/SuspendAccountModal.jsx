import {
  Button,
  Modal,
  Card,
  Label,
  TextInput,
  Dropdown,
} from "flowbite-react";
import { FaTimes, FaUser } from "react-icons/fa";
import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

function SuspendAccountModal({ state, setState, primaryKey }) {
  const permissions = ["Buying", "Listing", "Selling"];
  const [selectedDuration, setSelectedDuration] = useState("Dropdown");
  const selectedDurationRef = useRef();

  function onCloseModal() {
    setState(false);
  }

  function handleDurationRefChange(e) {
    setSelectedDuration(e);
  }

  const durations = ["1h", "1d", "1w", "4w"];
  return (
    <>
      <Modal className="" show={state} onClose={onCloseModal} size="md" popup>
        <FaTimes
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
          onClick={() => setState(false)}
        />
        {/* <img className="rounded-full h-20 w-2" src="https://i.pinimg.com/564x/0b/0c/3a/0b0c3a9fa3c7998613b0eaacf4a51e06.jpg"/> */}
        <Card className=" ">
          <div className="flex flex-col items-center">
            <h5
              className="text-2xl font-medium text-gray-900 dark:text-white"
              contentEditable={false}
            >
              Suspend Account :
            </h5>
            <h5 className="text-2xl font-medium text-gray-900 ">
              Lebron James
            </h5>
            <FaUser className="w-20 h-20 rounded-full mt-5" />
            <div className="mt-4 flex flex-col gap-y-5">
              <section className="flex flex-col w-full ">
                <Label htmlfor="reason" value="Reason" />
                <textarea
                  className="resize-none h-28 w-full rounded-lg"
                  disabled={false}
                  readOnly={false}
                />
              </section>
              <section className="flex flex-col">
                <Label htmlFor="duration" value="Duration" />
                <div className="flex flex-row h-10">
                  <input
                    type="number"
                    className="border rounded-lg rounded-r-none border-black w-20"
                  />
                  <Dropdown
                    size=""
                    className=""
                    label={selectedDuration}
                    renderTrigger={() => (
                      <Button
                        color="gray"
                        className="w-60 border-black text-black bg-white rounded-lg rounded-l-none "
                      >
                        {" "}
                        {selectedDuration}{" "}
                        <FaChevronDown className="absolute right-2  h-5 w-5" />{" "}
                      </Button>
                    )}
                  >
                    <Dropdown.Item
                      onClick={() => handleDurationRefChange("Hours")}
                    >
                      Hours
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDurationRefChange("Days")}
                    >
                      Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDurationRefChange("Weeks")}
                    >
                      Weeks
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDurationRefChange("Months")}
                    >
                      Months
                    </Dropdown.Item>
                  </Dropdown>
                  {/* renderTrigger={() => <input className="border rounded-lg rounded-r-none w-9/12" />} */}

                  {/* <input className="border rounded-lg rounded-l-none w-9/12" /> */}

                  {/* <TextInput className="w-1/3 rounded-r-none" id="password" type="password"/>
                <TextInput className="w-2/3 rounded-l-none" id="password" type="password"/> */}
                </div>
              </section>
              <section className="flex justify-center gap-5 mt-5">
                <Button
                  color="failure"
                  className="w-1/2 "
                  onClick={() => setState(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2 bg-custom_purple1 text-white"
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
export default SuspendAccountModal;
