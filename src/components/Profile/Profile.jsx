import { useContext, useEffect, useState } from "react";
import "./profile.css";
import { UserDetailsContext } from "../../context/Allcontext";
import { useForm } from "react-hook-form";
import client from "../../api_client/api_client";
import { Link } from "react-router-dom";
import backendURL from "../../api_client/backend_domain";
const Profile = () => {
  const [userDetails] = useContext(UserDetailsContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [district, setDistrict] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  );
  const [isAvailableProfile, setIsAvailableProfile] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [errorInDb, setErrorInDb] = useState(null);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        setLoading(true);
        const response = await client.get("/api/accounts/profile/");
        if (response.status == 200) {
          setPhoneNumber(response.data.phone_number);
          setGender(response.data.gender);
          setDistrict(response.data.district);
          setIsAvailableProfile(true);
          setProfileId(response.data.id);
          setProfilePicture(`${backendURL}${response.data.profile_picture}`);
        }
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };
    const getFavoritesAdd = async () => {
      try {
        const response = await client.get("/api/accounts/favorite_ads/");
        setFavoriteAds(response.data);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileDetails();
    getFavoritesAdd();
  }, [profileId]);

  console.log(favoriteAds);

  const onSubmit = async (data) => {
    data.profile_picture = data.profile_picture[0];
    try {
      setErrorInDb(null);
      setLoading(true);
      let response;
      if (!isAvailableProfile) {
        response = await client.post("/api/accounts/profile/", data, {
          headers: {
            "content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await client.patch(
          `/api/accounts/profile/${profileId}/`,
          data,
          {
            headers: {
              "content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status == 201) {
        setPhoneNumber(response.data.phone_number);
        setGender(response.data.gender);
        setDistrict(response.data.district);
        setProfilePicture(`${backendURL}${response.data.profile_picture}`);
      }
    } catch (error) {
      console.error({ error });
      setErrorInDb(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  console.log(profilePicture);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={profilePicture}
            />
            <span className="font-weight-bold py-2">
              Username :{" "}
              <span className="fw-bold">{userDetails?.account?.username}</span>
            </span>
            <span className="font-weight-bold">
              {userDetails?.account?.first_name}{" "}
              {userDetails?.account?.last_name}
            </span>
            <span className="text-black-50">
              {" "}
              {userDetails?.account?.email}{" "}
            </span>
            <span className="font-weight-bold">
              Phone number : {phoneNumber ? phoneNumber : "not updated"}
            </span>
            <span className="font-weight-bold">
              Gender : {gender ? gender : "not updated"}
            </span>
            <span className="font-weight-bold">
              District : {district ? district : "not updated"}
            </span>

            {/* profile navigation */}
            <p className="fw-bold mt-3 mb-0">Navigation</p>
            <ul className="text-start">
              <li>
                <Link to="/my_bookings" className="fw-bold">
                  View my bookings
                </Link>
              </li>
              <li>
                <Link className="fw-bold">View received booking request</Link>
              </li>
              <li>
                <Link className="fw-bold">Publish advertisement</Link>
              </li>
            </ul>
            {/* profile navigation */}
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control inputFiledBg"
                  id="username"
                  placeholder="Update phone number"
                  {...register("phone_number", { required: true })}
                  required
                />
                <small className="text-muted">Must be equal to 11 digits</small>
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control inputFiledBg"
                  id="gender"
                  placeholder="Male or Female"
                  {...register("gender", { required: true })}
                  required
                />
                <small className="text-muted">
                  Must use capital at first latter
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input
                  type="text"
                  className="form-control inputFiledBg"
                  id="district"
                  placeholder="Update district"
                  {...register("district", { required: true })}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profile_pic" className="form-label">
                  Profile picture
                </label>
                <input
                  type="file"
                  className="form-control inputFiledBg"
                  id="profile_pic"
                  placeholder="Upload profile picture"
                  {...register("profile_picture", { required: true })}
                  required
                />
              </div>

              {!loading && (
                <div className="mt-5 text-center">
                  <button className="btn btn-primary btn-success" type="submit">
                    Update profile
                  </button>
                </div>
              )}
              {loading && (
                <p className="text-center fw-bold text-success">
                  Please wait....
                </p>
              )}
            </form>
            {errorInDb && (
              <p className="text-danger text-center">
                {JSON.stringify(errorInDb)}
              </p>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Your favorites Advertisements</span>
              <Link to="/advertisements" className="border px-3 p-1 ">
                <i className="fa fa-plus" />
                &nbsp;Add more
              </Link>
            </div>
          </div>
          {favoriteAds.map((fav) => (
            <div
              className="fav_box d-flex align-items-center justify-content-between border-3 border p-2 my-3"
              key={fav.id}
            >
              <img
                src={
                  fav.advertisement_image.length > 0
                    ? `${backendURL}${fav.advertisement_image[0].image}`
                    : null
                }
                alt="Ad image"
                className="fav_img"
              />
              <Link to={`/advertisements/${fav.id}`}>{fav.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
