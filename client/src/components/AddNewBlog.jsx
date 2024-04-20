import { useContext, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import baseURL from "../apiUrls/ApiUrls";
import { toast } from "react-toastify";
import Spiner from "../spiner/Spiner";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router";

function Example({ handleSubmitUpdate }) {
  const [show, setShow] = useState(false);
  const [formdata, setFormData] = useState({
    blogTitle: "",
    imageUrl: "",
    blogBody: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isUserLoggedIn, userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (isUserLoggedIn) {
      setShow(true);
    } else {
      setShow(false);
      toast.error("You are not logged In");
      navigate("/login");
    }
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setLoading(true);

    try {
      const newFormData = {
        blogTitle: formdata.blogTitle,
        imageUrl: formdata.imageUrl,
        blogBody: formdata.blogBody,
        username: userDetails.name,
        email: userDetails.email,
      };
      const url = `${baseURL}/addNewBlog`;
      await axios.post(url, newFormData);
      setLoading(false);
      setShow(false);
      setFormData({
        blogTitle: "",
        imageUrl: "",
        blogBody: "",
      });
      toast.success("Blog Created Successfully");
    } catch (error) {
      console.log("Error :", error);
      toast.error("Error in creating a blog");
    } finally {
      setIsLoading(false);
      handleSubmitUpdate();
    }
  };

  const isValid = () => {
    if (formdata.blogTitle.length > 0 && formdata.blogBody.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isButtonDisabled = !isValid();

  return (
    <div>
      <>
        <Button
          variant="btn btn-outline-secondary"
          onClick={handleShow}
          style={{ margin: "1rem 2rem 0rem" }}
        >
          Add New Blog Here
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>BLOG</Modal.Title>
          </Modal.Header>
          {loading ? <Spiner /> : ""}
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NewBlog"
                  autoFocus
                  name="blogTitle"
                  value={formdata.blogTitle}
                  onChange={handleChangeData}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Paste here your image url"
                  name="imageUrl"
                  value={formdata.imageUrl}
                  onChange={handleChangeData}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Write your blog here</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  name="blogBody"
                  value={formdata.blogBody}
                  onChange={handleChangeData}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Example;
