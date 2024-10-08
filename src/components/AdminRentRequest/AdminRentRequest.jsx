import { useEffect, useState } from "react";
import client from "../../api_client/api_client";
import { toast } from "react-toastify";

const AdminRentRequest = () => {
  const [requests, setRequests] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const getAllRentRequest = async () => {
      try {
        const response = await client.get("/api/all-advertisements/admin/");
        setRequests(response.data);
      } catch (error) {
        console.error({ error });
      }
    };
    getAllRentRequest();
  }, [change]);

  const handleAdminApproval = async (id) => {
    try {
      const response = await client.get(
        `/api/approve-advertisement-request/${id}/admin/`
      );
      if (response.status == 200) {
        toast.success("Request Approved");
      }
    } catch (error) {
      console.error({ error });
      toast.error("Something went wrong");
    } finally {
      setChange((currState) => !currState);
    }
  };

  return (
    <section className="container my-5">
      <h3 className="fw-bold text-center mb-3">
        All request that is submitted by users
      </h3>
      <div className="overflow-scroll">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Division</th>
              <th scope="col">District</th>
              <th scope="col">owner</th>
              <th scope="col">Is Approved?</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request) => (
              <tr key={request.id}>
                <td scope="col"> {request.id} </td>
                <td scope="col"> {request.title} </td>
                <td scope="col"> {request.price} BDT </td>
                <td scope="col"> {request.category} </td>
                <td scope="col"> {request.division} </td>
                <td scope="col"> {request.district} </td>
                <td scope="col">
                  {" "}
                  {request.owner.first_name} {request.owner.last_name}
                </td>
                <td scope="col">
                  <span
                    className={
                      request.is_admin_approved ? "text-success" : "text-danger"
                    }
                  >
                    {request.is_admin_approved ? "Yes" : "No"}
                  </span>
                </td>
                <td scope="col">
                  {!request.is_admin_approved ? (
                    <button
                      onClick={() => handleAdminApproval(request.id)}
                      className="btn btn-success"
                    >
                      Approve
                    </button>
                  ) : (
                    <button className="btn btn-success" disabled>
                      Approved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminRentRequest;
