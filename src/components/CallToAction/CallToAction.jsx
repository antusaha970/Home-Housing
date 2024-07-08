import { Link } from "react-router-dom";
import "./CallToAction.css";
const CallToAction = () => {
  return (
    <section className="container">
      <div className="box-bg text-center">
        <h3 className="text-white">Are you looking for a home?</h3>
        <p className="text-white">
          Please visit our verified home advertisement for a secure and
          afortable home
        </p>
        <Link to="/advertisements" className="btn btn-success">
          Visit advertisements <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
