import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Hompage/Homepage";
import Navbar from "./components/shared/Navbar/Navbar";
import { useState } from "react";
import { IsLoggedInContext } from "./context/Allcontext";
import Footer from "./components/shared/Footer/Footer";
import AdvertisementPage from "./pages/AdvertisementPage/AdvertisementPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <IsLoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/advertisements" element={<AdvertisementPage />} />
      </Routes>
      <Footer />
    </IsLoggedInContext.Provider>
  );
}

export default App;
