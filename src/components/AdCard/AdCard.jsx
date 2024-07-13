/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./adcard.css";
const AdCard = ({ ad }) => {
  const {
    advertisement_image,
    title,
    created_at,
    bedrooms,
    division,
    rating,
    category,
    owner: { first_name, last_name },
    price,
    id,
  } = ad;

  const cover_image =
    advertisement_image.length > 0
      ? advertisement_image[0].image
      : "http://127.0.0.1:8000/media/rent/advertisement/property_gvw_8vqbb.webp";
  const dateObject = new Date(created_at);
  const formattedDate = dateObject.toLocaleString();
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card card-margin shadow-sm">
        <div className="card-header no-border">
          <img
            src={cover_image}
            className="card-img-custom"
            alt="cover image"
          />
        </div>
        <div className="card-body pt-0">
          <div className="widget-49">
            <div className="widget-49-title-wrapper">
              <div className="widget-49-meeting-info">
                <span className="widget-49-pro-title fw-bold">{title}</span>
                <span className="widget-49-meeting-time">
                  Uploaded on : {formattedDate}
                </span>
              </div>
            </div>
            <ul className="widget-49-meeting-points">
              <li className="widget-49-meeting-item">
                <span>
                  Location: {division}{" "}
                  <i className="fa-solid fa-location-dot"></i>
                </span>
              </li>
              <li className="widget-49-meeting-item">
                <span>
                  Bedrooms: {bedrooms} <i className="fa-solid fa-bed"></i>{" "}
                </span>
              </li>
              <li className="widget-49-meeting-item">
                <span>
                  Rating: {rating} <i className="fa-solid fa-star"></i>
                </span>
              </li>
              <li className="widget-49-meeting-item">
                <span>
                  Owner: {first_name} {last_name}
                </span>
              </li>
            </ul>
            <p className="categoryBg">
              Category: <span className="fw-bold">{category}</span>
            </p>
            <p className="mt-2">
              Fare: <span className="fw-bold">{price} BDT</span>{" "}
            </p>
            <div className="widget-49-meeting-action mt-3">
              <Link
                to={`/advertisements/${id}`}
                className="btn btn-sm btn-flash-border-success"
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
