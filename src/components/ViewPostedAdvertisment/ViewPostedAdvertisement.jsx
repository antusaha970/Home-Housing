import { useEffect, useState } from "react";
import client from "../../api_client/api_client";
import { Link } from "react-router-dom";

const ViewPostedAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  useEffect(() => {
    const getAllPostedAdvertisement = async () => {
      try {
        const response = await client.get(`/api/accounts/published_ads/`);
        setAdvertisements(response.data);
      } catch (error) {
        console.error({ error });
      }
    };
    getAllPostedAdvertisement();
  }, []);

  return (
    <section className="container">
      <h3 className="text-center fw-bold">
        View all your posted advertisements
      </h3>
      <p className="text-center">
        Here is the list of advertisement you have posted
      </p>

      <div className="row my-3 g-3">
        {advertisements?.map((ad) => (
          <div key={ad.id} className="col-md-4">
            <div className="card  shadow">
              <div className="card-body">
                <h5 className="card-title">{ad.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Uploaded at: {new Date(ad.created_at).toLocaleDateString()}
                </h6>
                <p className="card-text">
                  <li>
                    Is admin Approved :{" "}
                    <span
                      className={
                        ad.is_admin_approved ? "text-success" : "text-danger"
                      }
                    >
                      {ad.is_admin_approved ? "Yes" : "No"}
                    </span>
                  </li>
                  <li>
                    Is booked :{" "}
                    <span
                      className={ad.is_booked ? "text-success" : "text-danger"}
                    >
                      {ad.is_booked ? "Yes" : "No"}
                    </span>
                  </li>
                </p>
                {ad.is_admin_approved && (
                  <Link
                    to={`/advertisements/${ad.id}`}
                    className="card-link fw-bold"
                  >
                    View ad details
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewPostedAdvertisement;
