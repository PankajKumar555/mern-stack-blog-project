import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { ArrowLeft, PencilSquare } from "react-bootstrap-icons";
import baseURL from "../apiUrls/ApiUrls";
import axios from "axios";
import DeleteConfirmation from "./DeleteConfirmation";
import { toast } from "react-toastify";
import Spiner from "../spiner/Spiner";
import { AuthContext } from "../context/context";
import DateConverter from "./pages/helperFunction/DateConverter";

function Blogs({ handleBackClick, values, getBlogsData, imageUrlCards }) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(values.blogBody);
  const [loading, setLoading] = useState(false);
  const { isUserLoggedIn, userDetails } = useContext(AuthContext);
  const isValidUrl = /^https?:\/\/.*/.test(values.imageUrl);
  const alternateUrl = imageUrlCards;

  const toggleEditable = () => {
    if (userDetails && userDetails.email === values.email) {
      setIsEditable(true);
    } else if (isUserLoggedIn) {
      setIsEditable(false);
      toast.error("You don't have access to update this blog.");
    } else {
      toast.error("You are not logged in");
    }
  };

  const handletextArea = (e) => {
    setText(e.target.value);
  };

  const deletePost = async () => {
    const id = values._id;
    setLoading(true);
    try {
      const url = `${baseURL}/blog/${id}`;
      const deletedData = await axios.delete(url);
      setLoading(false);
      toast.success("Blog deleted Successfully");
      if (deletedData) {
        handleBackClick();
        getBlogsData();
      }
    } catch (error) {
      console.log("Error deleting the data :", error.message);
      toast.error("Blog is not deleted");
    }
  };

  const handleUpdateSubmit = async () => {
    const id = values._id;
    setLoading(true);
    try {
      const url = `${baseURL}/blog/${id}`;
      await axios.put(url, { blogBody: text });
      setLoading(false);
      toast.success("Blog updated Successfully");
      setIsEditable(false);
      getBlogsData();
    } catch (error) {
      console.log("Error deleting the data :", error.message);
      toast.error("Blog is not updated");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={pageStyle}>
      {loading ? <Spiner /> : ""}
      <div style={contentStyle}>
        {isValidUrl ? (
          <img
            src={values.imageUrl}
            alt="Opps..., You did'nt uploaded any file"
            style={imageStyle}
          />
        ) : (
          <>
            <img
              src={alternateUrl}
              alt="Alternative Url.."
              style={imageStyle}
            />
            <p style={{ color: "green" }}>
              This is auto generated Image because you did not uploaded valid
              url.{" "}
            </p>
          </>
        )}
        <span style={iconContainer}>
          <Button
            variant="secondary"
            onClick={handleBackClick}
            style={iconStyle}
          >
            <ArrowLeft style={{ marginRight: "10px" }} />
            Back
          </Button>
          <span>
            <DeleteConfirmation
              deletePost={deletePost}
              iconStyle={iconStyle}
              userDetails={userDetails}
              values={values}
            />
            <Button variant="secondary" title="Edit" onClick={toggleEditable}>
              <PencilSquare size={25} style={iconStyle} />
            </Button>
          </span>
        </span>
        <div style={userData}>
          <h3>{values.blogTitle}</h3>
          <div>
            <p style={{ fontSize: "14px", color: "gray", marginBottom: "0px" }}>
              <strong>Author: </strong> {values.username}
            </p>
            <DateConverter values={values} />
          </div>
        </div>
        <textarea
          rows="15"
          cols="100"
          readOnly={!isEditable}
          style={textStyle}
          value={text}
          onChange={handletextArea}
        />
        {isEditable ? (
          <Button
            variant="secondary"
            style={updateButton}
            onClick={handleUpdateSubmit}
          >
            Update
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const iconContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
};

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //   height: "100vh",
};

const contentStyle = {
  textAlign: "center",
  marginTop: "10px",
};

const imageStyle = {
  width: "100%",
  height: "50vh",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
  backGroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  maxWidth: "700px",
  margin: "20px auto",
  fontSize: "18px",
  lineHeight: "1.6",
  width: "100%",
  border: "none",
};

const updateButton = {
  display: "flex",
  margin: "1rem auto",
};

const userData = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
};

export default Blogs;
