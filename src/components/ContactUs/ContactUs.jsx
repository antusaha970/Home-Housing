import "./contactus.css";
import contact_us from "../../assets/stock/contactus.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    toast.success("Thanks for contacting us. We will get back to you soon!");
    reset();
  };

  return (
    <section className="container my-5" id="contact">
      <h3 className="text-center fw-bold">Contact Us</h3>
      <div className="row align-items-center">
        <div className="col-12 col-sm-12 col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="emailForContact" className="form-label">
                Email address
              </label>
              <input
                {...register("email")}
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
                {...register("subject")}
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
                {...register("message")}
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
          <img src={contact_us} alt="contact us" className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
