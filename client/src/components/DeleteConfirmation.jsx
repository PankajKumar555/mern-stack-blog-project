import { useContext, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/context";
import { toast } from "react-toastify";

function DeleteConfirmation({ deletePost, iconStyle, userDetails, values }) {
  const [show, setShow] = useState(false);
  const { isUserLoggedIn } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (userDetails && userDetails.email === values.email) {
      setShow(true);
    } else if (isUserLoggedIn) {
      toast.error("You don't have access to delete this blog.");
    } else {
      toast.error("You are not logged in");
    }
  };
  const handlesubmit = () => {
    deletePost();
  };

  return (
    <>
      <Button variant="secondary" title="Delete" onClick={handleShow}>
        <Trash size={25} style={iconStyle} />
      </Button>{" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are YouSure, You want to delete the post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
