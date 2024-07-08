import AboutOurService from "../AboutOurService/AboutOurService";
import CallToAction from "../CallToAction/CallToAction";
import ContactUs from "../ContactUs/ContactUs";
import Hero from "../Hero/Hero";
import OurPartners from "../OurPartners/OurPartners";

const Home = () => {
  return (
    <>
      <Hero />
      <OurPartners />
      <AboutOurService />
      <CallToAction />
      <ContactUs />
    </>
  );
};

export default Home;
