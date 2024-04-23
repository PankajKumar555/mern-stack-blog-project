import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components"; // Import styled-components
import baseURL from "../../../apiUrls/ApiUrls";
import { toast } from "react-toastify";

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

const ContactContent = styled.div`
  flex: 1;
`;

const ContactForm = styled.form`
  max-width: 400px;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ContactMap = styled.div`
  flex: 1;
  margin-left: 50px;
`;

const Button = styled.button`
    background-color: #4fa94d;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: "pointer"

    &:hover {
      background-color: #3f8a3f;
    }
  `;

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    setIsValid(isValidEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Invalid email format");
      return;
    }
    setLoading(true);
    try {
      const url = `${baseURL}/blog/contact`;
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.success("Email sent Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error while sending email");
    }
  };

  const url =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114841820148!2d77.20496574400136!3d28.628901609039893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1713190493947!5m2!1sen!2sin";

  return (
    <ContactContainer>
      <ContactContent>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Feel free to reach out to us with any
          questions, suggestions, or feedback you may have.
        </p>
        <p>
          You can contact us via email, phone, or through the contact form
          below.
        </p>
        <ContactForm onSubmit={handleSubmit} disabled={true}>
          <FormGroup>
            <label htmlFor="name">Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required={true}
            />
            {!isValid && <p style={{ color: "red" }}>Invalid email format</p>}
          </FormGroup>
          <FormGroup>
            <label htmlFor="message">Message:</label>
            <Textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required={true}
            ></Textarea>
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </ContactForm>
      </ContactContent>
      <ContactMap>
        <iframe
          title="contactOnMap"
          src={url}
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </ContactMap>
    </ContactContainer>
  );
}

export default ContactUs;
