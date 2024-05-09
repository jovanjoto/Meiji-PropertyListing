import { Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";

function NumShortlistModal({ state, setState, propertyName, propertyId }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (state) {
      setLoading(true);
      axios
        .get(
          `/api/shortlist/count_shortlist?propertyId=${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setCount(res.data.shortlistCount);
          }
        })
        .catch((err) => {})
        .then(() => {
          setLoading(false);
        });
    }
  }, [state]);
  return (
    <Modal show={state} onClose={() => setState(false)}>
      <Modal.Header>{propertyName}</Modal.Header>
      <Modal.Body>
        <div className="flex justify-between">
          <span>Number of shortlist : </span>
          {loading ? (
            <Spinner />
          ) : (
            <span className="flex gap-3">
              <FaHeart className="w-6 h-6" color="red" />
              <span className="font-semibold">{count}</span>
            </span>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NumShortlistModal;
