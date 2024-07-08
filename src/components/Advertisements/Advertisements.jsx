import { useEffect, useState } from "react";
import "./advertisements.css";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";
import AdCard from "../AdCard/AdCard";
const Advertisements = () => {
  const [advertisements, setAdvertisements] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [orderBy, setOrderBy] = useState("price");
  useEffect(() => {
    const fetchAllAdvertisements = async () => {
      try {
        setIsLoading(true);
        const response = await client.get(
          `/api/advertise/?page=${page}&category=${category}&order_by=${orderBy}`
        );
        setAdvertisements(response?.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllAdvertisements();
  }, [page, category, orderBy]);

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
  };

  const handleOrderBy = (event) => {
    setPage(1);
    setOrderBy(event.target.value);
  };

  return (
    <section className="container-fluid ad-box">
      <div className="row  g-3">
        <div className="col-12 col-sm-4 col-md-2">
          Filter by category <i className="fa-solid fa-arrow-up-z-a"></i>
          <ul className="categoriesList mt-3">
            <li
              onClick={() => {
                setPage(1);
                setCategory("");
              }}
            >
              All categories
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("home");
              }}
            >
              home
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("family");
              }}
            >
              family
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("office");
              }}
            >
              office
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("bachelor");
              }}
            >
              bachelor
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("shop");
              }}
            >
              shop
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("sublet");
              }}
            >
              sublet
            </li>
            <li
              onClick={() => {
                setPage(1);
                setCategory("hostel");
              }}
            >
              hostel
            </li>
          </ul>
        </div>
        <div className="col-12 col-sm-8 col-md-10">
          <div className="d-flex justify-content-between">
            <p>All Advertisements</p>
            <div className="d-flex g-5">
              <p>Sort by</p>{" "}
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleOrderBy}
              >
                <option selected>Price or rating</option>
                <option value="price">Minimum price</option>
                <option value="-price">Maximum price</option>
                <option value="rating">Minimum rating</option>
                <option value="-rating">Maximum rating</option>
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
                  <button
                    className="page-link"
                    onClick={() => handlePagination("prev")}
                  >
                    Previous
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePagination("next")}
                  >
                    Next
                  </button>
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
