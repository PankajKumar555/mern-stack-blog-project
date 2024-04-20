import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/context.js";

function Slider() {
  const carpusellSlider = {
    width: "100vw",
    height: "50vh",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    backGroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/random/1300x600"
  );

  const { setImageUrlCards } = useContext(AuthContext);

  const DynamicImage = () => {
    useEffect(() => {
      const generateImageUrls = () => {
        const urls = [];
        for (let i = 0; i < 3; i++) {
          const timestamp = Math.floor(Math.random() * 100);
          urls.push(`https://source.unsplash.com/random/1300x600?${timestamp}`);
        }
        setImageUrl(urls);
        setImageUrlCards(imageUrl);
      };
      generateImageUrls();

      const intervalId = setInterval(generateImageUrls, 10000);

      return () => clearInterval(intervalId);
    }, []);
  };

  DynamicImage();

  return (
    <Carousel>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imageUrl[0]} alt="First Slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imageUrl[1]} alt="Second Slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imageUrl[2]} alt="Third Slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
