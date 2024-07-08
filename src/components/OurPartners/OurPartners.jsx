import partnersData from "../../data/staticdata";
import Slider from "react-slick";
const OurPartners = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(partnersData);
  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold my-5">Our partners</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {partnersData?.map((partner) => {
            return (
              <div key={partner.name}>
                <img src={partner.image} alt={partner.name} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default OurPartners;
