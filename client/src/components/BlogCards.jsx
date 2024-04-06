import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "./Carousel.jsx";
import Blogs from "./Blogs.jsx";
import "./Blogcards.css";
import { useEffect, useState } from "react";
import AddNewBlog from "./AddNewBlog.jsx";
import axios from "axios";
import baseURL from "../apiUrls/ApiUrls.jsx";

function BasicExample() {
  const [click, setClick] = useState(false);
  const [values, setvalues] = useState();
  const [fetchBlogs, setFetchBlogs] = useState([]);

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
      const fetchBlogs = await axios.get(url);
      setFetchBlogs(fetchBlogs.data);
    } catch (error) {
      console.log("Error fetching data :", error.message);
    }
  };

  const handleSubmit = () => {
    getBlogsData();
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + " ...";
    } else {
      return text;
    }
  };

  return (
    <div>
      {!click === true ? (
        <div>
          <Carousel />
          <AddNewBlog handleSubmitUpdate={handleSubmit} />
          <div className="bolg-card-grid-media">
            {fetchBlogs.map((data) => (
              <Card
                style={{ width: "18rem", marginTop: "2rem" }}
                key={data._id}
              >
                <Card.Img
                  variant="top"
                  src={data.imageUrl}
                  alt="You did'nt uploaded valid Url..."
                  style={{ height: "195px" }}
                />
                <Card.Body>
                  <Card.Title>{data.blogTitle}</Card.Title>
                  <Card.Text style={{ height: "120px" }}>
                    {truncateText(data.blogBody)}
                  </Card.Text>
                  <Button
                    variant="secondary"
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
        <Blogs handleBackClick={handleBackClick} values={values} />
      )}
    </div>
  );
}

export default BasicExample;
