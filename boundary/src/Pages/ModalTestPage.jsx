import UserProfileModal from "../Components/Admin/UserProfileModal";
import UserAccountModal from '../Components/Admin/UserAccountModal';
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
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
    </>

  );
}

export default ModalTestPage;
