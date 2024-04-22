import UserProfileModal from "../Components/Admin/UserProfileModal";
import UserAccountModal from '../Components/Admin/UserAccountModal';
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
import CreateNewUserProfileModal from "../Components/Admin/CreateNewUserProfileModal";
import MessageModal from '../Components/Admin/MessageModal';
import { Button } from 'flowbite-react'
import { useState } from 'react';

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
    </>


  );
}

export default ModalTestPage;
