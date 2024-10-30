/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import client from "../../api_client/api_client";

const PostAdvertisementReviewForm = ({
  id,
  loggedIn,
  navigate,
  setNewReviewPosted,
}) => {
  const { register, handleSubmit } = useForm();
  const handlePostReview = async (data) => {
    if (!loggedIn) {
      toast.error("Please login first", {
        position: "top-right",
      });
      navigate("/login");
    } else {
      data.rating = parseInt(data.rating);
      try {
        const response = await client.post(
          `/api/advertise/${id}/post_reviews/`,
          data
        );
        if (response.status == 200) {
          toast.success("Review posted");
          setNewReviewPosted((prevState) => !prevState);
        }
      } catch (error) {
        console.error({ error });
        if (error.response.status == 403) {
          toast.error("Can't post review. You haven't booked it");
        } else if (error.response.status == 302) {
          toast.warn(
            "Can't post review. Your booking request haven't accepted yet"
          );
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 col-md-6 my-5">
          <h5 className="fw-bold base-color fs-3 mt-3 text-center">
            Post a review{" "}
          </h5>
          <form onSubmit={handleSubmit(handlePostReview)}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <select
                className="form-select inputFiledBg"
                aria-label="Default select example"
                id="rating"
                {...register("rating")}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5" selected>
                  5 Star
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="subject for contact" className="form-label">
                Review
              </label>
              <textarea
                rows={5}
                className="form-control inputFiledBg"
                id="subject for contact"
                placeholder="write subject here"
                {...register("body", { required: true })}
                required
              />
            </div>
            <button className="btn btn-dark">Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostAdvertisementReviewForm;
