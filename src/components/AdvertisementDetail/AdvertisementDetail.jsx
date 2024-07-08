import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";
import "./AdvertisementDetail.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
};

const AdvertisementDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
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
  }, [id]);
  details?.advertisement_image?.forEach((img) => {
    const src = { src: img.image, width: 800, height: 600 };
    photos.push(src);
  });

  console.log(reviews);

  return (
    <section className="container my-5">
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
          <button className="btn btn-success ms-2">
            Book now <i className="fa-solid fa-square-check"></i>
          </button>
          <button className="btn btn-dark ms-2">
            Add to favorite <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* description area */}

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