import UserProfileModal from "../Components/Admin/UserProfileModal";
import UserAccountModal from '../Components/Admin/UserAccountModal';
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

  return (
    <>
      <Button className="bg-custom_purple1" onClick={handleUserProfileClick}>
        Toggle User Profile modal
      </Button>
      <UserProfileModal state={openModal} setState={setOpenModal}/>

      <Button className="bg-custom_purple1" onClick={handleUserAccountClick}>
        Toggle User Profile modal
      </Button>
      <UserAccountModal state={openModal2} setState={setOpenModal2}/>
    </>
  );
}

export default ModalTestPage;
