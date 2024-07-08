import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-12 col-md-6">
            <h3 className="fst-italic">CORPORATE HOUSING</h3>
            <h1 className="fw-bold">
              Rent Apartments for Your Company/Family/Yourself
            </h1>
            <p>
              Manage easily all your corporate apartments needs with flexibility
              and exclusive support. Save time and money. Ideal for you and your
              team.
            </p>
            <button className="btn btn-success">Book now</button>
          </div>
          <div className="col-12 col-sm-12 col-md-6" data-aos="fade-left">
            <img src={hero} alt="hero" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
