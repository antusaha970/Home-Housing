import ContactUs from "../../components/ContactUs/ContactUs";

const ContactUsPage = () => {
  return (
    <>
      <h2 className="text-center fw-bold mt-3">
        Feel free to contact us for any queries
      </h2>
      <p className="text-muted text-center">
        We will get back to you as soon as possible on you email address{" "}
      </p>
      <ContactUs />
    </>
  );
};

export default ContactUsPage;
