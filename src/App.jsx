import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Hompage/Homepage";
import Navbar from "./components/shared/Navbar/Navbar";
import { useState } from "react";
import { IsLoggedInContext, UserDetailsContext } from "./context/Allcontext";
import Footer from "./components/shared/Footer/Footer";
import AdvertisementPage from "./pages/AdvertisementPage/AdvertisementPage";
import AdvertisementDetailsPage from "./pages/AdvertisementDetailsPage/AdvertisementDetailsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/shared/PrivateRoute/PrivateRoute";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  return (
    <IsLoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <UserDetailsContext.Provider value={[userDetails, setUserDetails]}>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/advertisements" element={<AdvertisementPage />} />
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
        </Routes>
        <Footer />
      </UserDetailsContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
