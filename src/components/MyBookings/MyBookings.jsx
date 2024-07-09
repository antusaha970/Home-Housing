import { useEffect, useState } from "react";
import client from "../../api_client/api_client";
import "./mybookings.css";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getUseBookings = async () => {
      try {
        const response = await client.get("/api/bookings/");
        setBookings(response.data);
      } catch (error) {
        console.error({ error });
      }
    };
    getUseBookings();
  }, []);

  return (
    <section className="container my-5">
      <h3 className="text-center fw-bold my-2">Your booking details</h3>
      <p className="text-center">
        Here you can see you bookings that you have made and there status
      </p>
      <div className="overflow-scroll">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Booked on</th>
              <th scope="col">Advertisement</th>
              <th scope="col">Status</th>
              <th scope="col">Is confirmed</th>
              <th scope="col">View details</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, ind) => (
              <tr key={ind}>
                <th scope="row">
                  {new Date(booking.booked_on).toLocaleDateString()}
                </th>
                <td>{booking?.property_ad?.title}</td>
                <td>{booking?.is_accepted ? "booked" : "pending"}</td>
                <td>{booking?.is_accepted ? "yes" : "no"}</td>
                <td>
                  <Link
                    to={`/advertisements/${booking?.property_ad?.id}`}
                    className="btn btn-dark"
                  >
                    View property
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyBookings;
