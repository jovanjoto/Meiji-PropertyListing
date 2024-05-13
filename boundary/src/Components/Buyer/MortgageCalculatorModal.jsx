import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

function MortgageCalculatorModal({ state, setState }) {
  const permissions = ["Buying", "Listing", "Selling"];

  const [showResult, setShowResult] = useState(false);

  function onCloseModal() {
    setState(false);
  }

  function handleShowResult() {
    setShowResult(!showResult);
  }

  return (
    <>
      <Modal className="" show={state} onClose={onCloseModal} size="xl" popup>
        <FaTimes
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
          onClick={() => setState(false)}
        />
        <Modal.Body>
          <h1
            className="text-center text-2xl font-bold mt-10 mb-5"
            id="mortgage-calculator-modal"
          >
            Mortgage Calculator
          </h1>
          <section className="flex flex-col justify-center gap-5">
            <div className="flex flex-col">
              <Label>Mortgage Duration : </Label>
              <TextInput placeholder="Enter loan amount" type="number" />
            </div>
            <div className="flex flex-col">
              <Label>Down Payment (%) :</Label>
              <TextInput placeholder="Enter interest rate" type="number" />
            </div>
            <div className="flex flex-col">
              <Label>Interest Rate (%) : </Label>
              <TextInput placeholder="Enter loan tenure" type="number" />
            </div>
            <div className="flex flex-col">
              {showResult ? (
                <div className="bg-blue-500 text-white text-center py-2 px-4 rounded-full">
                  Your mortgage would be
                </div>
              ) : (
                <div style={{ height: "2.5rem" }} /> // Adjust the height as needed
              )}
            </div>
          </section>
          <section className="flex flex-col gap-5 mt-5 items-center">
            <Button
              onClick={handleShowResult}
              color="purple"
              className="bg-custom_purple1 w-1/2 flex justify-center mt-5"
            >
              Calculate
            </Button>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MortgageCalculatorModal;
