import Navbar from "./components/Navbar.jsx";
import BlogCards from "./components/BlogCards.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import About from "./components/pages/about/About.jsx";
import { useState } from "react";
import Login from "./components/pages/login/Login.jsx";
import ContactUs from "./components/pages/contactUs/ContactUs.jsx";
import { AuthContext } from "./context/context.js";
import NotFound from "./components/pages/404/404.jsx";

function App() {
  const [showFilter, setShowFiltered] = useState("");
  const [filteredData, getFilteredData] = useState("");
  const [fetchBlogsFromCards, setFetchBlogsFromCards] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [imageUrlCards, setImageUrlCards] = useState();
  const location = useLocation();
  const isValidPath =
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/contact" ||
    location.pathname === "/login";

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          setFetchBlogsFromCards,
          fetchBlogsFromCards,
          getFilteredData,
          filteredData,
          setShowFiltered,
          showFilter,
          setUserDetails,
          userDetails,
          setIsUserLoggedIn,
          isUserLoggedIn,
          setImageUrlCards,
          imageUrlCards,
        }}
      >
        {isValidPath && <Navbar />}
        <Routes>
          <Route path="/" element={<BlogCards />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isValidPath && <Footer />}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
