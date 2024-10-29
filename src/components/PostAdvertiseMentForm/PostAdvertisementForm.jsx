import { useForm } from "react-hook-form";
import post_ad_img from "../../assets/stock/post_advertisement.png";
import { useState } from "react";
import client from "../../api_client/api_client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PostAdvertisementForm = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const img1 = data.image1;
    const img2 = data.image2;
    const image_links = [img1, img2];
    delete data["image1"];
    delete data["image2"];
    toast.warning("Please wait some moment", {
      position: "top-right",
    });
    try {
      setLoading(true);
      const response = await client.post("/api/advertise/", data);
      if (response.status == 201) {
        toast.success("Advertisement added now adding images");
        const response2 = await client.post(
          `/api/advertise/${response.data.id}/upload_image/`,
          { images: image_links }
        );
        toast.success("Successfully posted your advertisement", {
          position: "top-right",
        });
        navigate("/view_posted_advertisement");
      }
    } catch (error) {
      console.error({ error });
      toast.error("something went wrong", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold my-2">
        Give a rent advertisement of your property
      </h2>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-12 col-md-6">
          <img src={post_ad_img} alt="post ad image" className="img-fluid" />
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="title"
                placeholder="Enter ad title"
                required
                {...register("title")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Division" className="form-label">
                Division
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="Division"
                placeholder="Enter division where property is located"
                required
                {...register("division")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                District
              </label>
              <input
                type="text"
                className="form-control inputFiledBg"
                id="district"
                placeholder="Enter district where property is located"
                required
                {...register("district")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bedrooms" className="form-label">
                Bedrooms
              </label>
              <input
                type="number"
                className="form-control inputFiledBg"
                id="bedrooms"
                placeholder="Enter number of bedrooms"
                required
                {...register("bedrooms")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bathrooms" className="form-label">
                Barth Rooms
              </label>
              <input
                type="number"
                className="form-control inputFiledBg"
                id="bathrooms"
                placeholder="Enter number of Barth rooms"
                required
                {...register("bathrooms")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Select category
              </label>
              <select
                className="form-select inputFiledBg"
                aria-label="Default select example"
                id="category"
                {...register("category")}
              >
                <option value="home">home</option>
                <option value="family" selected>
                  family
                </option>
                <option value="office">office</option>
                <option value="bachelor">bachelor</option>
                <option value="shop">shop</option>
                <option value="sublet">sublet</option>
                <option value="hostel">hostel</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Rent fee
              </label>
              <input
                type="number"
                className="form-control inputFiledBg"
                id="price"
                placeholder="Enter amount you want to charge"
                required
                {...register("price")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image1" className="form-label">
                Image URL of your image
              </label>
              <input
                type="text"
                multiple={true}
                className="form-control inputFiledBg"
                id="image1"
                placeholder="Upload profile picture"
                {...register("image1")}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image2" className="form-label">
                Image URL of your image
              </label>
              <input
                type="text"
                multiple={true}
                className="form-control inputFiledBg"
                id="image2"
                placeholder="Upload profile picture"
                {...register("image2")}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject for contact" className="form-label">
                Write something about your property
              </label>
              <textarea
                rows={5}
                className="form-control inputFiledBg"
                id="subject for contact"
                placeholder="write subject here"
                {...register("about")}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject for contact" className="form-label">
                Write summery about your property
              </label>
              <textarea
                rows={5}
                className="form-control inputFiledBg"
                id="subject for contact"
                placeholder="write subject here"
                {...register("summary")}
                required
              />
            </div>
            {!loading && (
              <button className="btn btn-dark">Post advertisement</button>
            )}
            {loading && <p className="text-success">Please wait...</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PostAdvertisementForm;
