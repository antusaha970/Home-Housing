import about_our_service_png from "../../assets/stock/about_our_service.png";
import "./aboutourservice.css";
const AboutOurService = () => {
  return (
    <section id="about" className="container  box-margin">
      <h2 className="text-center fw-bold">About our service</h2>
      <div className="row align-items-center">
        <div className="col-12 col-sm-12 col-md-6">
          <img
            src={about_our_service_png}
            alt="about service img"
            className="img-fluid"
            data-aos="fade-right"
          />
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <h4 className="text-center fw-bold base-color">What we do?</h4>
          <p>
            Home housing Corporation help businesses find the right way to work.
            We are facilitators connecting people with spaces. And most
            importantly, in the communities where we live and work, we are
            trusted insiders, advisors and friends.
          </p>
          <button className="btn btn-dark">
            Search for House <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutOurService;
