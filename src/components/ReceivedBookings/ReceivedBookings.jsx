import { useEffect, useState } from "react";
import client from "../../api_client/api_client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ReceivedBookings = () => {
  const [receivedBookings, setReceivedBookings] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getReceivedBookings = async () => {
      try {
        const response = await client.get("/api/bookings/requested/");
        setReceivedBookings(response.data);
      } catch (error) {
        console.error({ error });
      }
    };
    getReceivedBookings();
  }, [updated]);

  const handleConfirmBooking = async (id) => {
    try {
      setLoading(true);
      const response = await client.patch(`/api/bookings/requested/${id}/`);
      if (response.status == 200) {
        toast.success("Confirmed booking for this property", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error({ error });
      toast.error("Something went wrong", {
        position: "top-right",
      });
    } finally {
      setUpdated((curState) => !curState);
      setLoading(false);
    }
  };

  return (
    <section className="container my-5">
      <h4 className="text-center fw-bold mb-3">
        Bookings you have received for your published advertisements
      </h4>

      {/* received bookings table */}
      <div className="overflow-scroll">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Advertisement</th>
              <th scope="col">Rent fees</th>
              <th scope="col">Booked on</th>
              <th scope="col">Booked by</th>
              <th scope="col">Payment method</th>
              <th scope="col">Is paid</th>
              <th scope="col">Message</th>
              <th scope="col">Accept booking</th>
            </tr>
          </thead>
          <tbody>
            {receivedBookings?.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <Link
                    className="fw-bold"
                    to={`/advertisements/${booking.property_ad.id}`}
                  >
                    {booking.property_ad.title}
                  </Link>
                </td>
                <td>{booking.property_ad.price}</td>
                <td>{new Date(booking.booked_on).toLocaleDateString()}</td>
                <td>
                  {booking.booked_by.first_name} {booking.booked_by.last_name}
                </td>
                <td>{booking?.payment_method}</td>
                <td>{booking?.is_paid ? "Yes" : "No"}</td>
                <td>{booking.message} </td>
                <td>
                  {!booking.is_accepted && (
                    <>
                      {!loading && (
                        <button
                          className="btn btn-success"
                          onClick={() => handleConfirmBooking(booking.id)}
                        >
                          confirm
                        </button>
                      )}
                      {loading && (
                        <button className="btn btn-success">
                          please wait...
                        </button>
                      )}
                    </>
                  )}
                  {booking.is_accepted && (
                    <button className="btn btn-success" disabled>
                      Already accepted
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* received bookings table */}
    </section>
  );
};

export default ReceivedBookings;
