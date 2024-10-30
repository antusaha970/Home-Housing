import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginImage from "../../assets/stock/login.png";
import client from "../../api_client/api_client";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  IsLoggedInContext,
  UserDetailsContext,
} from "../../context/Allcontext";
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [, setLoggedIn] = useContext(IsLoggedInContext);
  const [, setUserDetails] = useContext(UserDetailsContext);

  const [errorInRegistration, setErrorInRegistration] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErrorInRegistration(false);
      setLoading(true);
      const response = await client.post("/api/accounts/login/", data);

      if (response.status === 200) {
        toast.success("Logged in successful", {
          position: "top-right",
        });
        sessionStorage.setItem(
          "user_token",
          JSON.stringify(response.data.token)
        );
        setLoggedIn(true);
        setUserDetails(response.data);
        navigate("/profile");
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
          <img src={LoginImage} alt="registration" className="img-fluid" />
        </div>
        <div className="col-12 col-sm-6 col-md-6">
          <h2 className="text-center fw-bold">Login ✅</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username *
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
              <label htmlFor="password" className="form-label">
                Password *
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

            {!loading && (
              <button className="btn btn-success" type="submit">
                Login
              </button>
            )}
            {loading && (
              <p className="text-center fw-bold text-success">
                Please wait....
              </p>
            )}
          </form>
          <p className="text-center my-2">
            Don&apos;t have an account? <Link to="/registration">Register</Link>
          </p>

          {errorInRegistration && (
            <p className="text-danger text-18 text-center">
              {JSON.stringify(errorInRegistration)}
            </p>
          )}
          <div className="mt-3">
            <p className="mb-0">Dummy username: antu</p>
            <p>Dummy password: Pa$$w0rd!</p>
            <p className="mb-0">Admin username: admin1</p>
            <p>Dummy password: admin1</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
