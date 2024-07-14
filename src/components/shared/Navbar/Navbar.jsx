import { useContext } from "react";
import logo from "../../../assets/logo.png";
import "./navbar.css";
import {
  IsLoggedInContext,
  UserDetailsContext,
} from "../../../context/Allcontext";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [loggedIn, setLoggedIn] = useContext(IsLoggedInContext);
  const [, setUserDetails] = useContext(UserDetailsContext);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserDetails({});
    localStorage.removeItem("user_token");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" className="logo" />
          </Link>
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
                <Link className="nav-link text-18" to="/contact-us">
                  Contact us
                </Link>
              </li>
              {loggedIn && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More options
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/my_bookings" className="dropdown-item">
                        My bookings
                      </Link>
                    </li>
                    <li>
                      <Link to="/received_requests" className="dropdown-item">
                        Received bookings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="/post_advertisement" className="dropdown-item">
                        Post advertisement
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/view_posted_advertisement"
                        className="dropdown-item"
                      >
                        View posted advertisements
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!loggedIn ? (
                <>
                  <Link to="/login" className="btn btn-success me-2">
                    Login
                  </Link>
                  <Link to="/registration" className="btn btn-dark me-2">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="btn btn-success me-2">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="btn btn-dark me-2">
                    Logout
                  </button>
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
