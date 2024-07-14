/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";
import Modal from "react-modal";
import "./AdvertisementDetail.css";

import { IsLoggedInContext } from "../../context/Allcontext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import PostAdvertisementReviewForm from "../PostAdvertisementReviewForm/PostAdvertisementReviewForm";

const AdvertisementDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(IsLoggedInContext);
  const [newReviewPosted, setNewReviewPosted] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let photos = [];
  useEffect(() => {
    const getAdvertisementDetails = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/api/advertise/${id}/`);
        setDetails(response.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };
    const getAdvertisementReview = async () => {
      try {
        const response = await client.get(`/api/advertise/${id}/all_reviews/`);
        setReviews(response.data);
      } catch (error) {
        console.error({ error });
      }
    };
    getAdvertisementDetails();
    getAdvertisementReview();
  }, [id, newReviewPosted]);
  details?.advertisement_image?.forEach((img) => {
    const src = { src: img.image, width: 800, height: 600 };
    photos.push(src);
  });

  const handleAddToFavorite = async () => {
    if (!loggedIn) {
      toast.error("Please login first", {
        position: "top-right",
      });
      navigate("/login");
    } else {
      try {
        const response = await client.post(
          `/api/advertise/${id}/add_to_favorite/`
        );
        if (response.status == 201) {
          toast.success("Added to favorite", {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error({ error });
        toast.error("Something went wrong", {
          position: "top-right",
        });
      }
    }
  };

  const handleBooking = async () => {
    if (!loggedIn) {
      toast.error("Please login first", {
        position: "top-right",
      });
      navigate("/login");
    } else {
      const isBooked = details.is_booked;
      if (isBooked) {
        toast.warning("This property is booked by another user!", {
          position: "top-right",
        });
      } else {
        setIsOpen(true);
      }
    }
  };

  return (
    <section className="container my-5">
      <ModelForBooking
        modalIsOpen={modalIsOpen}
        id={id}
        setIsOpen={setIsOpen}
      />
      {loading && <Loader />}
      {/* Image gallery area */}
      <PhotoAlbum layout="rows" photos={photos} />
      {/* image gallery area */}

      {/* description area */}

      <div className="row align-items-start">
        <div className="col-12 col-sm-6 col-md-6">
          <div>
            <h1 className="fw-bold mt-5"> {details.title} </h1>
            <h5 className="fw-bold base-color fs-3 mt-3">Overview</h5>
            <ul>
              <li className="text-18">
                Bedrooms: {details?.bedrooms}{" "}
                <i className="fa-solid fa-bed"></i>
              </li>
              <li className="text-18">
                Bart rooms: {details?.bathrooms}{" "}
                <i className="fa-solid fa-bath"></i>
              </li>
              <li className="text-18">
                Division: {details?.division}
                <i className="fa-solid fa-location-dot"></i>
              </li>
              <li className="text-18">District: {details?.district}</li>
              <li className="text-18">
                Uploaded on:{" "}
                {details?.created_at
                  ? new Date(details?.created_at).toLocaleDateString()
                  : ""}
                <i className="fa-solid fa-globe"></i>
              </li>
              <li className="text-18">Price: {details?.price} BDT</li>
              <li className="text-18">
                Rating: {details?.rating} <i className="fa-regular fa-star"></i>
              </li>
              <li className="text-18">
                Available for booking : {details?.is_booked ? "No" : "Yes"}
                <i className="fa-solid fa-check"></i>
              </li>
              <li>
                Owner: {details?.owner?.first_name} {details?.owner?.last_name}{" "}
                <i className="fa-solid fa-user"></i>
              </li>
            </ul>
            <h5 className="fw-bold base-color fs-3 mt-3">
              About this property
            </h5>
            <p>{details?.about}</p>
            <h5 className="fw-bold base-color fs-3 mt-3">Summery</h5>
            <p>{details?.summary}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 text-center">
          <h5 className="fw-bold base-color fs-3 my-5">
            Have you liked this property?
          </h5>
          <button className="btn btn-success ms-2" onClick={handleBooking}>
            Book now <i className="fa-solid fa-square-check"></i>
          </button>
          <button className="btn btn-dark ms-2" onClick={handleAddToFavorite}>
            Add to favorite <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* description area */}

      {/* post review form */}

      <PostAdvertisementReviewForm
        id={id}
        setNewReviewPosted={setNewReviewPosted}
        navigate={navigate}
        loggedIn={loggedIn}
      />

      {/* post review form */}

      {/* review area */}
      <div>
        <h5 className="fw-bold base-color fs-3 mt-3 text-center">
          Our clients review
        </h5>
      </div>
      <div className="row">
        {reviews?.map((review) => (
          <div className="col-md-4" key={review.id}>
            <div className="card reviewBox">
              <div className="card-body">
                <h4 className="card-title">
                  <img src="https://img.icons8.com/ultraviolet/40/000000/quote-left.png" />
                </h4>
                <div className="template-demo">
                  <p>{review.review.body}</p>
                  <p>
                    Rating: {review.review.rating}{" "}
                    <i className="fa-regular fa-star"></i>
                  </p>
                </div>
                <hr />
                <div className="row text-center">
                  <div className="col">
                    <img
                      className="m-auto"
                      src="https://img.icons8.com/bubbles/100/000000/edit-user.png"
                    />
                  </div>

                  <div className="profile">
                    <div className="col">
                      <h6 className="cust-name">{review.review.name}</h6>
                      <small className="cust-profession">
                        {review.review.email}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* review area */}
    </section>
  );
};

export default AdvertisementDetail;

const ModelForBooking = ({ modalIsOpen, setIsOpen, id }) => {
  const { register, handleSubmit } = useForm();
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function closeModal() {
    setIsOpen(false);
  }
  const onSubmit = async (data) => {
    data = { ...data, property_ad: parseInt(id) };
    setIsOpen(false);
    try {
      const response = await client.post(`/api/bookings/`, data);
      console.log(response.data);
      if (response.status == 200) {
        toast.success("Booking request sent", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("This property is already booked", {
        position: "top-right",
      });
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="booking Modal"
    >
      <div className="p-5 modal-bg">
        <div className="text-end">
          <button onClick={closeModal} className="btn btn-warning">
            close
          </button>
        </div>

        <h5 className="text-center my-3">Any message for owner?</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("message")}
            className="form-control"
            rows={5}
            required
          ></textarea>
          <button className="btn btn-dark mt-5" type="submit">
            Send request
          </button>
        </form>
      </div>
    </Modal>
  );
};
