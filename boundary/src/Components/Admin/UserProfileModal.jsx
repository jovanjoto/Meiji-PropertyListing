import { Button, Modal, Card, Label, Textarea, Checkbox } from "flowbite-react";
import { useState, useEffect, useContext } from "react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";

function UserProfileModal({ state, setState, primaryKey }) {
  const [isEditable, setIsEditable] = useState(false);

  const [profile, setProfile] = useState({});

  const { token } = useContext(AuthContext);
  // primaryKey = 'admin@admin.com'
  // primaryKey = 'admin'
  useEffect(() => {
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
      });
  }, []);

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleConfirmButton = () => {
    setProfile(editedProfile);
    setIsEditable(false);

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
      .then((response) => {
        console.log("response : ", response.data);
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const handleCancelButton = () => {
    setEditedProfile(profile);
    setIsEditable(false);
  };

  const permissions = ["Buying", "Selling", "Renting"];
  return (
    <>
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
            className="absolute top-0 right-0 m-2 rounded-md w-5 h-5 cursor-pointer"
            onClick={() => setIsEditable(!isEditable)}
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
                  {/* {permissions.map((permission, index) => (
                    <div key={index} className="flex flex-row justify-between">
                      <Label
                        htmlFor={permission}
                        value={permission}
                        style={{ color: isEditable ? "initial" : "gray" }}
                      />
                      <Checkbox
                        key={index}
                        disabled={!isEditable}
                        className="text-custom_purple_1"

                      />
                    </div>
                  ))} */}

                  <div className="flex flex-row justify-between">
                    <Label
                      htmlFor="Buying"
                      value="Buying"
                      style={{ color: isEditable ? "initial" : "gray" }}
                    />
                    <Checkbox
                      disabled={!isEditable}
                      className="text-custom_purple_1"
                      checked={editedProfile.has_buying_permission}
                      onChange={e => setEditedProfile({ ...editedProfile, has_buying_permission: e.target.checked })}
                    />
                  </div>

                  <div className="flex flex-row justify-between">
                    <Label
                      htmlFor="selling"
                      value="Selling"
                      style={{ color: isEditable ? "initial" : "gray" }}
                    />
                    <Checkbox
                      disabled={!isEditable}
                      className="text-custom_purple_1"
                      checked={editedProfile.has_selling_permission}
                      onChange={e => setEditedProfile({ ...editedProfile, has_selling_permission: e.target.checked })}

                    />
                  </div>

                  <div className="flex flex-row justify-between">
                    <Label
                      htmlFor="listing"
                      value="Listing"
                      style={{ color: isEditable ? "initial" : "gray" }}
                    />
                    <Checkbox
                      disabled={!isEditable}
                      className="text-custom_purple_1"
                      checked={editedProfile.has_listing_permission}
                      onChange={e => setEditedProfile({ ...editedProfile, has_listing_permission: e.target.checked })}
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
                      onClick={handleConfirmButton}
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
}
export default UserProfileModal;
