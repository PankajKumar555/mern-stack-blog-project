import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "./Carousel.jsx";
import Blogs from "./Blogs.jsx";
import { useContext, useEffect, useState } from "react";
import AddNewBlog from "./AddNewBlog.jsx";
import axios from "axios";
import baseURL from "../apiUrls/ApiUrls.js";
import { toast } from "react-toastify";
import Spiner from "../spiner/Spiner.jsx";
import { AuthContext } from "../context/context.js";
import "./Blogcards.css";

function BasicExample() {
  const [click, setClick] = useState(false);
  const [values, setvalues] = useState();
  const [fetchBlogs, setFetchBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFetchBlogsFromCards, filteredData, showFilter, imageUrlCards } =
    useContext(AuthContext);
  const alternateUrl = imageUrlCards;

  const handleBlogPage = (data) => {
    setClick(true);
    setvalues(data);
  };

  const handleBackClick = () => {
    setClick(false);
  };

  const getBlogsData = async () => {
    try {
      const url = `${baseURL}/addNewBlog`;
      const fetchBlog = await axios.get(url);
      setFetchBlogs(fetchBlog.data);
      setLoading(false);
      setFetchBlogsFromCards(fetchBlog.data);
    } catch (error) {
      console.log("Error fetching data :", error.message);
      toast.error("Error in getting blogs");
    }
  };

  const handleSubmit = () => {
    getBlogsData();
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + " ...";
    } else {
      return text;
    }
  };
  // get image logic
  const allImageUrls = fetchBlogs && fetchBlogs.map((blog) => blog?.imageUrl);

  const isValidUrl =
    allImageUrls && allImageUrls.map((url) => /^https?:\/\/.*/.test(url));

  // filtered image logic
  const allFilteredImageUrls =
    filteredData && filteredData.map((blog) => blog?.imageUrl);

  const isValidUrlFilteredData =
    allFilteredImageUrls &&
    allFilteredImageUrls.map((url) => /^https?:\/\/.*/.test(url));

  return (
    <div>
      {loading ? <Spiner /> : ""}
      {!click === true ? (
        <div>
          <Carousel />
          <AddNewBlog handleSubmitUpdate={handleSubmit} />
          <div className="bolg-card-grid-media">
            {showFilter
              ? filteredData &&
                filteredData.map((data) => (
                  <Card
                    style={{ width: "18rem", marginTop: "2rem" }}
                    key={data._id}
                  >
                    {isValidUrlFilteredData[fetchBlogs.indexOf(data)] ? (
                      <Card.Img
                        variant="top"
                        src={data.imageUrl}
                        alt="You did'nt uploaded valid Url..."
                        style={{ height: "195px" }}
                        className="zoom-effect"
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        src={alternateUrl}
                        alt="Alternate Image..."
                        style={{ height: "195px" }}
                        className="zoom-effect"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{data.blogTitle}</Card.Title>
                      <Card.Text style={{ height: "120px" }}>
                        {truncateText(data.blogBody, 120)}
                      </Card.Text>
                      <Button
                        variant="btn btn-outline-secondary"
                        onClick={() => handleBlogPage(data)}
                      >
                        Read Full Blog...
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              : fetchBlogs.map((data) => (
                  <Card
                    style={{ width: "18rem", marginTop: "2rem" }}
                    key={data._id}
                  >
                    {isValidUrl[fetchBlogs.indexOf(data)] ? (
                      <Card.Img
                        variant="top"
                        src={data.imageUrl}
                        alt="You did'nt uploaded valid Url..."
                        style={{ height: "195px" }}
                        className="zoom-effect"
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        src={alternateUrl}
                        alt="Alternate Image..."
                        style={{ height: "195px" }}
                        className="zoom-effect"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{data.blogTitle}</Card.Title>
                      <Card.Text style={{ height: "120px" }}>
                        {truncateText(data.blogBody, 110)}
                      </Card.Text>
                      <Button
                        variant="btn btn-outline-secondary"
                        onClick={() => handleBlogPage(data)}
                      >
                        Read Full Blog...
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
          </div>
        </div>
      ) : (
        <Blogs
          handleBackClick={handleBackClick}
          getBlogsData={getBlogsData}
          values={values}
          imageUrlCards={imageUrlCards}
        />
      )}
    </div>
  );
}

export default BasicExample;
