import {
  Button,
  Modal,
  Card,
  Label,
  Textarea,
  Checkbox,
  Spinner,
} from "flowbite-react";
import { useState, useEffect, useContext } from "react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import MessageModal from "./MessageModal";

function UserProfileModal({ state, setState, primaryKey }) {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({});
  const [messageModal, setMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const displayLoadingPage = () => {
    return (
      <div className="text-center text-8xl">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/profile/view_user_profile", {
        params: {
          profileName: `${primaryKey}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response : ", response.data);
        setProfile(response.data.success);
        setEditedProfile(response.data.success);
      })
      .catch((error) => {
        console.error("error : ", error);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [primaryKey]);

  const [editedProfile, setEditedProfile] = useState(profile);

  const confirm = () => {
    setProfile(editedProfile);
    setIsEditable(false);
    if (
      [
        editedProfile.has_buying_permission,
        editedProfile.has_selling_permission,
        editedProfile.has_listing_permission,
      ].reduce((partialSum, a) => partialSum + a, 0) == 0
    ) {
      setMessage("Error... Please give them at least one permission");
      setMessageModal(true);
      return;
    }
    axios
      .patch(
        "/api/profile/update_user_profile",
        {
          name: `${primaryKey}`,
          description: `${editedProfile.description}`,
          has_buying_permission: editedProfile.has_buying_permission,
          has_selling_permission: editedProfile.has_selling_permission,
          has_listing_permission: editedProfile.has_listing_permission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          displaySuccessMsg();
        } else {
          displayErrorMsg();
        }
      })
      .catch((error) => {
        console.error("error : ", error);
        displayErrorMsg();
      })
      .then(() => {
        setMessageModal(true);
      });
  };

  const promptConfirmation = () => {
    setIsEditable(true);
  };

  const handleCancelButton = () => {
    setEditedProfile(profile);
    setIsEditable(false);
  };
  const onCloseModal = (x) => {
    setMessageModal(x);
    window.location.reload();
  };

  const displaySuccessMsg = () => {
    setMessage(`${primaryKey} successfully updated.`);
  };

  const displayErrorMsg = () => {
    setMessage(`Failed to update, please try again.`);
  };

  const displayProfilePage = () => {
    return (
      <>
        <MessageModal state={messageModal} setState={onCloseModal}>
          {message}
        </MessageModal>
        <Modal
          className=""
          show={state}
          onClose={() => setState(false)}
          size="md"
        >
          {!isEditable && (
            <FaTimes
              className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
              onClick={() => setState(false)}
            />
          )}
          {!isEditable && (
            <FaPencilAlt
              id="edit-profile"
              className="absolute top-0 right-0 m-2 rounded-md w-5 h-5 cursor-pointer"
              onClick={promptConfirmation}
            />
          )}
          <Card className=" ">
            <div className="flex flex-col items-center">
              <h5
                className="text-xl font-medium text-gray-900 dark:text-white"
                contentEditable={false}
              >
                {primaryKey}
              </h5>
              <FaUser className="w-20 h-20 rounded-full mt-5" />
              <div className="mt-4 flex flex-col gap-y-5">
                <section className="flex flex-col">
                  <Label htmlFor="description" value="Description" />
                  <textarea
                    className="resize-none h-40 w-64 rounded-lg"
                    disabled={!isEditable}
                    readOnly={!isEditable}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        description: e.target.value,
                      })
                    }
                    value={editedProfile.description}
                    style={{ color: isEditable ? "initial" : "gray " }}
                  />
                </section>
                <section className="flex flex-col">
                  <Label htmlFor="permissions" value="Permissions" />
                  <Card className="w-64">
                    <div className="flex flex-row justify-between">
                      <Label
                        htmlFor="Buying"
                        value="Buying"
                        style={{
                          color: isEditable ? "initial" : "gray",
                        }}
                      />
                      <Checkbox
                        disabled={!isEditable}
                        className="text-custom_purple_1"
                        checked={editedProfile.has_buying_permission}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            has_buying_permission: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row justify-between">
                      <Label
                        htmlFor="selling"
                        value="Selling"
                        style={{
                          color: isEditable ? "initial" : "gray",
                        }}
                      />
                      <Checkbox
                        disabled={!isEditable}
                        className="text-custom_purple_1"
                        checked={editedProfile.has_selling_permission}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            has_selling_permission: e.target.checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-row justify-between">
                      <Label
                        htmlFor="listing"
                        value="Listing"
                        style={{
                          color: isEditable ? "initial" : "gray",
                        }}
                      />
                      <Checkbox
                        disabled={!isEditable}
                        className="text-custom_purple_1"
                        checked={editedProfile.has_listing_permission}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            has_listing_permission: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </Card>
                </section>
                <section className="flex justify-center gap-5">
                  {isEditable && (
                    <>
                      <Button
                        color="failure"
                        className=" w-1/2"
                        onClick={handleCancelButton}
                      >
                        Cancel
                      </Button>{" "}
                      <Button
                        className="bg-custom_purple1 w-1/2 text-white"
                        onClick={confirm}
                      >
                        Confirm
                      </Button>
                    </>
                  )}
                </section>
              </div>
            </div>
          </Card>
        </Modal>
      </>
    );
  };
  const permissions = ["Buying", "Selling", "Renting"];
  if (isLoading) {
    return displayLoadingPage();
  }
  return displayProfilePage();
}
export default UserProfileModal;
