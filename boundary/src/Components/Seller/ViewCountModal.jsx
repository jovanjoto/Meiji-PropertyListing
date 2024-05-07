import { React } from 'react';
import { Modal } from 'flowbite-react';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import ViewCountChart from './ViewCountChart';

function ViewCountModal({state, setState}){

  function onCloseModal(){
    setState(false);
  }
  const views = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  return (
    <>
      <Modal
        className=""
        show={state}
        onClose={onCloseModal}
        size="xl"
        popup
      >
        <FaTimes
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer mb-5" // Added absolute positioning
          onClick={onCloseModal}
        />
        {/* <img className="rounded-full h-20 w-2" src="https://i.pinimg.com/564x/0b/0c/3a/0b0c3a9fa3c7998613b0eaacf4a51e06.jpg"/> */}
        <Modal.Body>
          <h1 className="text-center text-2xl font-bold my-20" id="view-count-modal">
            View Count: 5
          </h1>
          <ViewCountChart views={views}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCountModal;