import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-12 col-md-6">
            <h3 className="fst-italic">
              CORPORATE HOUSING <i className="fa-solid fa-building-wheat"></i>
            </h3>
            <h1 className="fw-bold hero-text">
              Rent Apartments for Your Company/Family/Yourself
            </h1>
            <p>
              Manage easily all your corporate apartments needs with flexibility
              and exclusive support. Save time and money. Ideal for you and your
              team.
            </p>
            <Link to="/advertisements" className="btn btn-success ms-1">
              Book now <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link to="/advertisements" className="btn btn-dark ms-1">
              Host your property <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <img
              src={hero}
              alt="hero"
              data-aos="fade-left"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
