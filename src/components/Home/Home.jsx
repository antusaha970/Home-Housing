import AboutOurService from "../AboutOurService/AboutOurService";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";
import FaqSection from "../FaqSection/FaqSection";
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
      <FaqSection />
    </>
  );
};

export default Home;
