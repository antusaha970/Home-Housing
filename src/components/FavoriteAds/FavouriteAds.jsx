/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import client from "../../api_client/api_client";
import backendURL from "../../api_client/backend_domain";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FavouriteAds = ({ favoriteAds }) => {
  const [allFavoriteAd, setAllFavoriteAd] = useState([]);
  useEffect(() => {
    setAllFavoriteAd(favoriteAds);
  }, [favoriteAds]);
  const handleRemoveFromFavorite = async (id) => {
    try {
      const response = await client.delete(
        `/api/advertise/${id}/remove_from_favorite/`
      );
      if (response.status == 204) {
        toast.success("Removed this favorite ad");
        const updatedFavAds = allFavoriteAd.filter((ad) => ad.id != id);
        setAllFavoriteAd(updatedFavAds);
      }
    } catch (error) {
      console.error({ error });
      toast.error("Something went wrong! please try again later");
    }
  };
  return (
    <>
      {allFavoriteAd?.map((fav) => (
        <div
          className="fav_box d-flex align-items-center justify-content-between border-3 border p-2 my-3"
          key={fav.id}
        >
          <img
            src={
              fav.advertisement_image.length > 0
                ? `${backendURL}${fav.advertisement_image[0].image}`
                : null
            }
            alt="Ad image"
            className="fav_img rounded"
          />
          <Link to={`/advertisements/${fav.id}`}>
            {fav.title.slice(0, 20)}...
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleRemoveFromFavorite(fav.id)}
          >
            Remove <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
    </>
  );
};

export default FavouriteAds;
