import React from "react";
import Slider from "react-slick";
import { Product } from "./Store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FakePost from "./FakePost";
const settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 2000,
  autoplay: true,
  fade: true,
  cssEase: "linear",
  arrows: false,
};
const MySlider = ({ items }: { items: Product[] }) => {
  return (
    <Slider {...settings} className="flex">
      {items.length > 0
        ? items.map((item) => (
            <div key={item.id} className="h-96 w-72  bg-gray-50 ">
              <img
                src={item.image}
                alt=""
                className=" w-full h-full object-contain rounded mix-blend-multiply"
              />
            </div>
          ))
        : [1, 2, 3].map((item) => <FakePost key={item} />)}
    </Slider>
  );
};

export default MySlider;
