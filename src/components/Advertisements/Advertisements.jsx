import { useEffect, useState } from "react";
import "./advertisements.css";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";
import AdCard from "../AdCard/AdCard";
const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchAllAdvertisements = async () => {
      try {
        setIsLoading(true);
        const response = await client.get(`/api/advertise/?page=${page}`);
        setAdvertisements(response?.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllAdvertisements();
  }, [page]);

  const handlePagination = (type) => {
    if (type == "prev") {
      if (advertisements.previous) {
        setPage((curState) => curState - 1);
      }
    } else {
      if (advertisements.next) {
        setPage((curState) => curState + 1);
      }
    }
    // console.log(advertisements);
  };

  return (
    <section className="container-fluid ad-box">
      <div className="row  g-3">
        <div className="col-12 col-sm-4 col-md-2">
          Filter by category <i className="fa-solid fa-arrow-up-z-a"></i>
        </div>
        <div className="col-12 col-sm-8 col-md-10">
          <div className="d-flex justify-content-between">
            <p>All Advertisements</p>
            <div className="d-flex g-5">
              <p>Sort by</p>{" "}
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Price or rating</option>
                <option value="1">Minimum price</option>
                <option value="2">Maximum price</option>
                <option value="1">Minimum rating</option>
                <option value="2">Maximum rating</option>
              </select>
            </div>
          </div>
          <div>
            <small>Total Result: {advertisements?.count | 0}</small>
          </div>
          {isLoading && <Loader />}
          <div className="row my-4 g-3">
            {advertisements?.results?.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <small>5 result per page</small>
            </div>
            <div>
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handlePagination("prev")}
                  >
                    Previous
                  </a>
                </li>

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handlePagination("next")}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisements;
