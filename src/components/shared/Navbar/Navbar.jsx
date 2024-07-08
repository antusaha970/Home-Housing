import { useContext } from "react";
import logo from "../../../assets/logo.png";
import "./navbar.css";
import { IsLoggedInContext } from "../../../context/Allcontext";
const Navbar = () => {
  const [loggedIn] = useContext(IsLoggedInContext);

  console.log(loggedIn);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active text-18"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-18" href="#">
                  Advertisements
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-18" href="#">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-18" href="#">
                  Contact us
                </a>
              </li>
            </ul>
            <div className="d-flex">
              {!loggedIn ? (
                <>
                  <button className="btn btn-success me-2">Login</button>
                  <button className="btn btn-dark me-2">Register</button>
                </>
              ) : (
                <>
                  <button className="btn btn-success me-2">Profile</button>
                  <button className="btn btn-dark me-2">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
