import React, { useContext, useState } from "react";
import "./login.css";
import baseURL from "../../../apiUrls/ApiUrls";
import axios from "axios";
import { toast } from "react-toastify";
import Spiner from "../../../spiner/Spiner";
import { AuthContext } from "../../../context/context";
import { useNavigate } from "react-router";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUserDetails, setIsUserLoggedIn } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setLoading(true);
      try {
        const url = `${baseURL}/blog/signup`;
        await axios.post(url, formData);
        setFormData({ username: "", email: "", password: "" });
        setIsLogin(true);
        setLoading(false);
        toast.success("Signup Created Successfully");
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
        toast.error("Email is already registered");
      }
    }
    if (isLogin) {
      setLoading(true);
      try {
        const url = `${baseURL}/blog/login`;
        const { email, password } = formData;
        const loginData = { email, password };
        const responce = await axios.post(url, loginData);
        console.log("---------->res", responce);
        if (responce.statusText === "OK") {
          sessionStorage.setItem(
            "accessToken",
            `Bearer ${responce.data.accessToken}`
          );
          sessionStorage.setItem(
            "refreshToken",
            `Bearer ${responce.data.refreshToken}`
          );
          setUserDetails({
            name: responce.data.username,
            email: responce.data.email,
          });
          setFormData({ username: "", password: "" });
          setIsUserLoggedIn(true);
          setLoading(false);
          navigate("/");
          toast.success("Logged In Successfully");
        }
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
        toast.error("User is not registered");
      }
    }
  };

  return (
    <div className="container-full">
      {loading ? <Spiner /> : ""}
      <div className="form-container">
        <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-container">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required={true}
              />
            </div>
          )}
          <div className="input-container">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <div className="input-container">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <button className="form-button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p onClick={toggleForm} className="toggle-link">
          {isLogin
            ? "Don't have an account? Sign up here."
            : "Already have an account? Log in here."}
        </p>
      </div>
    </div>
  );
};

export default Login;
