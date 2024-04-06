import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import baseURL from "../apiUrls/ApiUrls";

function Example({ handleSubmitUpdate }) {
  const [show, setShow] = useState(false);
  const [formdata, setFormData] = useState({
    blogTitle: "",
    imageUrl: "",
    blogBody: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const url = `${baseURL}/addNewBlog`;
      await axios.post(url, formdata);
      setShow(false);
      setFormData({
        blogTitle: "",
        imageUrl: "",
        blogBody: "",
      });
    } catch (error) {
      console.log("Error :", error);
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
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ margin: "1rem 2rem 0rem" }}
      >
        Add New Blog Here
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>BLOG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste here your image url"
                autoFocus
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
  );
}

export default Example;
