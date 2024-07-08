import "./contactus.css";
import contact_us from "../../assets/stock/contactus.png";
const ContactUs = () => {
  return (
    <section className="container my-5" id="contact">
      <h3 className="text-center fw-bold">Contact Us</h3>
      <div className="row align-items-center">
        <div className="col-12 col-sm-12 col-md-6">
          <form action="">
            <div className="mb-3">
              <label htmlFor="emailForContact" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control inputFiledBg"
                id="emailForContact"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subjectforcontact" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="subjectforcontact"
                placeholder="write subject here"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject for contact" className="form-label">
                Message
              </label>
              <textarea
                rows={5}
                className="form-control inputFiledBg"
                id="subject for contact"
                placeholder="write subject here"
                required
              />
            </div>
            <button className="btn btn-dark">Send</button>
          </form>
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <img
            data-aos="fade-left"
            src={contact_us}
            alt="contact us"
            className="img-fluid"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
