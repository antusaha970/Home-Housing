import { useContext } from "react";
import logo from "../../../assets/logo.png";
import "./navbar.css";
import { IsLoggedInContext } from "../../../context/Allcontext";
import { Link, NavLink } from "react-router-dom";
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
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link text-18" : "nav-link text-18"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="advertisements"
                  className={({ isActive }) =>
                    isActive ? "active nav-link text-18" : "nav-link text-18"
                  }
                >
                  Advertisements
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-18" to="/">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-18" to="/">
                  Contact us
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {!loggedIn ? (
                <>
                  <button className="btn btn-success me-2">Login</button>
                  <Link to="/registration" className="btn btn-dark me-2">
                    Register
                  </Link>
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
