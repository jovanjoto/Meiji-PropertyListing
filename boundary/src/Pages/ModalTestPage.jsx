import UserProfileModal from "../Components/Admin/UserProfileModal";
import UserAccountModal from '../Components/Admin/UserAccountModal';
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
import CreateNewUserProfileModal from "../Components/Admin/CreateNewUserProfileModal";
import MessageModal from '../Components/Admin/MessageModal';
import SuspendAccountModal from "../Components/Admin/SuspendAccountModal";
import SuspendProfileModal from "../Components/Admin/SuspendProfileModal";
import ConfirmationModal from "../Components/ConfirmationModal";
import { Button } from 'flowbite-react'
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function ModalTestPage({}) {
  const [openModal, setOpenModal] = useState(false);
  const handleUserProfileClick= () => {
    setOpenModal(!(openModal));
  }


  const [openModal2, setOpenModal2] = useState(false);
  const handleUserAccountClick = () => { 
    setOpenModal2(!(openModal2))
  }

  const [openModal3, setOpenModal3] = useState(false);
  const handleCreateNewUserAccountClick = () => { 
    setOpenModal3(!(openModal3))
  }

  const [openModal4, setOpenModal4] = useState(false);
  const handleCreateNewUserProfileClick = () => { 
    setOpenModal4(!(openModal4))
  }

  const [openModal5, setOpenModal5] = useState(false);
  const handleMessageModalClick = () => {
    setOpenModal5(!(openModal5))
  }

  const [openModal6, setOpenModal6] = useState(false); 
  const handleSuspendAccountClick = () => {
    setOpenModal6(!(openModal6))
  }

  const [openModal7, setOpenModal7] = useState(false);
  const handleSuspendProfileClick = () => {
    setOpenModal7(!(openModal7))
  }

  const [openModal8, setOpenModal8] = useState(false);
  const handleConfirmationClick = () => { 
    setOpenModal8(!(openModal8))
  }

  const dummy_words = "hello world"

  return (
    <>
      <Button className="bg-custom_purple1" onClick={handleUserProfileClick}>
        Toggle User Profile modal
      </Button>
      <UserProfileModal state={openModal} setState={setOpenModal}/>

      <Button className="bg-custom_purple1" onClick={handleUserAccountClick}>
        Toggle User Account modal
      </Button>
      <UserAccountModal state={openModal2} setState={setOpenModal2}/>

      <Button className="bg-custom_purple1" onClick={handleCreateNewUserAccountClick}>
        Toggle Create New User Account modal
      </Button>
      <CreateNewUserAccountModal state={openModal3} setState={setOpenModal3}/>

      <Button className="bg-custom_purple1" onClick={handleCreateNewUserProfileClick}>
        Toggle Create New User Profile Modal
      </Button>
      <CreateNewUserProfileModal state={openModal4} setState={setOpenModal4}/>
      <Button className="bg-custom_purple1" onClick={handleMessageModalClick}>
        Toggle Message Modal
      </Button>
      <MessageModal state={openModal5} setState={setOpenModal5}>
        Successfuly Created
      </MessageModal>
      
      <Button className="bg-custom_purple1" onClick={handleSuspendAccountClick}>
        Toggle Suspend Account Modal
      </Button>
      <SuspendAccountModal state={openModal6} setState={setOpenModal6}/>

      <Button className="bg-custom_purple1" onClick={handleSuspendProfileClick}>
        Toggle Suspend Profile Modal
      </Button>
      <SuspendProfileModal state={openModal7} setState={setOpenModal7}/>

      <Button className="bg-custom_purple1" onClick={handleConfirmationClick}>
        Toggle Confirmation Modal
      </Button>
      <ConfirmationModal state={openModal8} setState={setOpenModal8}>
        Are you Sure ?
      </ConfirmationModal>
    </>


  );
}

export default ModalTestPage;
