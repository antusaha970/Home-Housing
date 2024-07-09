import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Hompage/Homepage";
import Navbar from "./components/shared/Navbar/Navbar";
import { useState } from "react";
import { IsLoggedInContext } from "./context/Allcontext";
import Footer from "./components/shared/Footer/Footer";
import AdvertisementPage from "./pages/AdvertisementPage/AdvertisementPage";
import AdvertisementDetailsPage from "./pages/AdvertisementDetailsPage/AdvertisementDetailsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <IsLoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
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
      </Routes>
      <Footer />
    </IsLoggedInContext.Provider>
  );
}

export default App;
