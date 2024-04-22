import { useState } from "react";

import UserAccountCard from "../Components/Admin/UserAccountCard";
import SearchAndFilter from "../Components/Admin/SearchAndFilter";
import UserAccountModal from '../Components/Admin/UserAccountModal';
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
import NavBar from "../Components/NavBar";

export default function UserAccountManagementPage({}) {
  const [isLoading, setIsLoading] = useState(false);

  const [userAccountModalState, setUserAccountModalState] = useState(false);
  const [createNewUserAccountModalState, setCreateNewUserAccountModalState] = useState(false);
  const displayList = () => {
    return (
        <>
        <NavBar />
        
        <UserAccountModal state={userAccountModalState} setState={setUserAccountModalState}/>
        <CreateNewUserAccountModal state={createNewUserAccountModalState} setState={setCreateNewUserAccountModalState}/>
        <SearchAndFilter type="Account" setCreateAccountModelState={setCreateNewUserAccountModalState}/>

        <div>
          <UserAccountCard
            userType="Real Estate Agent"
            rating="4.2"
            name="LeBron"
            email="lebron@gmail.com"
            phone_num="1111111"
            isSuspended="false"
            setAccountModalState={setUserAccountModalState}
          />
        </div>
      </>
    );
  };

  const displayLoading = () => {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  };

  return <> {isLoading ? displayLoading() : displayList()}</>;
}
