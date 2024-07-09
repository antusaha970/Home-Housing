import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import registrationImage from "../../assets/stock/registration.png";
import client from "../../api_client/api_client";
import { useState } from "react";
import { toast } from "react-toastify";
const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [errorInRegistration, setErrorInRegistration] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setErrorInRegistration(false);
      setLoading(true);
      const response = await client.post("/api/accounts/register/", data);
      if (response.status === 200) {
        toast.success("Account activation link has been sent to your email", {
          position: "top-right",
        });
      }
    } catch (error) {
      setErrorInRegistration(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-6 col-md-6">
          <img
            src={registrationImage}
            alt="registration"
            className="img-fluid"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6">
          <h2 className="text-center fw-bold">Register yourself✅</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="username"
                placeholder="Choose a unique username"
                {...register("username", { required: true })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailForContact" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control inputFiledBg"
                id="emailForContact"
                placeholder="name@example.com"
                {...register("email", { required: true })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="frist_name" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="frist_name"
                placeholder="Enter your first name"
                {...register("first_name", { required: true })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="last_name"
                placeholder="Enter your last name"
                {...register("last_name", { required: true })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control inputFiledBg"
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm password
              </label>
              <input
                type="password"
                className="form-control inputFiledBg"
                id="confirm_password"
                placeholder="Enter password again"
                {...register("confirm_password", { required: true })}
                required
              />
            </div>

            {!loading && (
              <button className="btn btn-success" type="submit">
                Register
              </button>
            )}
            {loading && (
              <p className="text-center fw-bold text-success">
                Please wait....
              </p>
            )}
          </form>
          <p className="text-center my-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {errorInRegistration && (
            <p className="text-danger text-18 text-center">
              {JSON.stringify(errorInRegistration)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
