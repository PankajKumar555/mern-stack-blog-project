import Carousel from "react-bootstrap/Carousel";
import {
  imgSlider1,
  imgSlider2,
  imgSlider3,
} from "../urls/CarouselImageUrls.jsx";

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

  return (
    <Carousel>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imgSlider1} alt="First Slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imgSlider2} alt="Second Slide" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={carpusellSlider}>
          <img src={imgSlider3} alt="Third Slide" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
