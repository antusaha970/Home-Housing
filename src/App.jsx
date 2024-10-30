import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Hompage/Homepage";
import Navbar from "./components/shared/Navbar/Navbar";
import { useEffect, useState } from "react";
import { IsLoggedInContext, UserDetailsContext } from "./context/Allcontext";
import Footer from "./components/shared/Footer/Footer";
import AdvertisementPage from "./pages/AdvertisementPage/AdvertisementPage";
import AdvertisementDetailsPage from "./pages/AdvertisementDetailsPage/AdvertisementDetailsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";
import PostAdvertisementPage from "./pages/PostAdvertisementPage/PostAdvertisementPage";
import ReceivedBookingPage from "./pages/ReceivedBookingPage/ReceivedBookingPage";
import ViewPostedAdvertisementPage from "./pages/ViewPostedAdvertisementPage/ViewPostedAdvertisementPage";
import AdminViewRentRequestPage from "./pages/AdminViewRentRequestPage/AdminViewRentRequestPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import PopUpAd from "./components/shared/PopUpAd/PopUpAd";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <IsLoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <UserDetailsContext.Provider value={[userDetails, setUserDetails]}>
        <Navbar />
        <ToastContainer />
        <PopUpAd modalIsOpen={modalIsOpen} closeModal={closeModal} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/advertisements" element={<AdvertisementPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route
            path="/advertisements/:id"
            element={<AdvertisementDetailsPage />}
          />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my_bookings"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <MyBookingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/post_advertisement"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <PostAdvertisementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/received_requests"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <ReceivedBookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/view_posted_advertisement"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <ViewPostedAdvertisementPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/view_request"
            element={
              <PrivateRoute isSignedIn={loggedIn}>
                <AdminViewRentRequestPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </UserDetailsContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
