import AboutOurService from "../AboutOurService/AboutOurService";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";
import GiveRent from "../GiveRent/GiveRent";
import Hero from "../Hero/Hero";
import OurPartners from "../OurPartners/OurPartners";

const Home = () => {
  return (
    <>
      <Hero />
      <OurPartners />
      <AboutOurService />
      <CallToAction />
      <GiveRent />
      <ContactUs />
    </>
  );
};

export default Home;
