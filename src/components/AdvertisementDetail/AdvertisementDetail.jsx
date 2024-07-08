import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import client from "../../api_client/api_client";
import Loader from "../shared/Loader/Loader";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
};

const AdvertisementDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAdvertisementDetails = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/api/advertise/${id}/`);
        setDetails(response.data);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    };
    getAdvertisementDetails();
  }, [id]);
  console.log(details);
  return (
    <section className="container">
      {loading && <Loader />}
      {/* Image gallery area */}

      {/* image gallery area */}
    </section>
  );
};

export default AdvertisementDetail;
