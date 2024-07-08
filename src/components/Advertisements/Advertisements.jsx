import { useEffect, useState } from "react";
import "./advertisements.css";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";
const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAllAdvertisements = async () => {
      try {
        setIsLoading(true);
        const response = await client.get("/api/advertise/");
        setAdvertisements(response.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllAdvertisements();
  }, []);
  console.log(advertisements?.results);
  console.log(isLoading);
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
          {isLoading && <Loader />}
        </div>
      </div>
    </section>
  );
};

export default Advertisements;
