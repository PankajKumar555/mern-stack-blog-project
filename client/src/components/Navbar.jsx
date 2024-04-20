import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import Logo from "../images/Logo.jpg";

function NavScrollExample() {
  const {
    fetchBlogsFromCards,
    getFilteredData,
    setShowFiltered,
    userDetails,
    isUserLoggedIn,
    setUserDetails,
    setIsUserLoggedIn,
  } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(fetchBlogsFromCards);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (query) => {
    const filtered = fetchBlogsFromCards.filter((item) => {
      const title = item.blogTitle?.toString().toLowerCase();
      const body = item.blogBody?.toString().toLowerCase();
      return (
        (title && title.includes(query.toLowerCase())) ||
        (body && body.includes(query.toLowerCase()))
      );
    });
    setFilteredData(filtered);
    getFilteredData(filteredData);
    setShowFiltered(true);
  };

  const handleLogOut = () => {
    if (isUserLoggedIn) {
      setIsUserLoggedIn(false);
      setUserDetails({ name: "", username: "" });
      navigate("/login");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refershToken");
    }
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setShowFiltered(false);
    }
  }, [searchQuery]);

  return (
    <Navbar
      expand="md"
      style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.2)" }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img alt="Logo" src={Logo} style={{ height: "30px" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav>
          <Form className="d-flex">
            <div className="position-relative">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
                value={searchQuery}
                style={{ paddingLeft: "30px" }}
              />
              <IoSearch
                className="search-icon"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </Form>
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={userDetails ? userDetails.name : ""}
              menuVariant="dark"
              style={{ marginLeft: "20px" }}
              align="end"
            >
              <NavDropdown.Item onClick={handleLogOut}>
                {isUserLoggedIn ? "LogOut" : "Login"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
