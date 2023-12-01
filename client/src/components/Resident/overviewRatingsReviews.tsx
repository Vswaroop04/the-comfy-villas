import { useState } from "react";
import RatingComponent from "../Home/RatingComponent";
import {
  Wifi,
  Martini,
  PawPrint,
  Waves,
  Utensils,
  Pencil,
  Plug,
  Bed,
  BathIcon,
} from "lucide-react";
import EditDialog from "./EditDialog";
import ReviewEditDialog from "./ReviewEditDialog";

// OverviewRatingReview.js
const OverviewRatingReview = ({ userData }: any) => {
  const amenities = [
    { name: "Pet-friendly", icon: PawPrint },
    { name: "Free WiFi", icon: Wifi },
    { name: "Bar", icon: Martini },
    { name: "Pool", icon: Waves },
    { name: "Restaurant", icon: Utensils },
    { name: "Electric vehicle charging point", icon: Plug },
    { name: `${userData?.listing?.beds} Beds`, icon: Bed },
    { name: `${userData?.listing?.bathrooms} Bathrooms`, icon: BathIcon },
  ];
  // State to hold the editable ratings and review
  const [ratings, setRatings] = useState({
    amenitiesRatings: userData.ratings[0]?.amenitiesRatings || "",
    managementRatings: userData.ratings[0]?.managementRatings || "",
    serviceRatings: userData.ratings[0]?.serviceRatings || "",
  });
  const [review, setReview] = useState(userData.reviews[0]?.review || "");
  const [openEditRatings, setOpenEditRatings] = useState(false);

  const [openEditReviews, setopenEditReviews] = useState(false);

  // Handle changes to the ratings inputs
  const handleRatingsChange = (e: any) => {
    setRatings({ ...ratings, [e.target.name]: e.target.value });
  };

  // Handle changes to the review textarea
  const handleReviewChange = (e: any) => {
    setReview(e.target.value);
  };

  return (
    <div className="p-10">
      {/* Overview */}
      <h1 className="text-4xl  font-bold">{userData.listing.name}</h1>
      <p className="my-2">
        Featuring everything you need for a simple, engaging place to rest,
        recharge, and get things done.
      </p>
      <div className="flex items-center space-x-2">
        <p>
          This is Ranked
          <span className="bg-violet-800 text-white rounded-none px-2 py-1 ml-2 mr-2 inline-block">
            #{userData.listing.rank}
          </span>
          in Our Community.
        </p>
      </div>
      <h1 className="text-2xl  py-2 font-bold">Amenities</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <amenity.icon className="w-6 h-6 text-gray-700" />
              <span className="text-gray-600">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="my-4">
        <div className="flex justify-between">
          <h1 className="text-2xl  py-2 font-bold">Ratings</h1>
          <button
            className="hover:scale-125"
            onClick={() => {
              setOpenEditRatings(true);
            }}
          >
            <Pencil />
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-2 flex gap-7 ">
            <label>Amenities Rating :</label>
            {ratings?.amenitiesRatings ? (
              <div className="flex">
                <RatingComponent rating={ratings.amenitiesRatings} />
                <p className="p-2"> ({ratings.amenitiesRatings})</p>
              </div>
            ) : (
              <p> Please Input Your Rating </p>
            )}
            {/* <input
              type="number"
              name="amenitiesRatings"
              value={ratings.amenitiesRatings}
              onChange={handleRatingsChange}
              className="ml-2 border-gray-300 rounded"
            /> */}
          </div>
          <div className="mb-2 flex gap-5">
            <label>Managment Rating:</label>
            {ratings?.managementRatings ? (
              <div className="flex">
                <RatingComponent rating={ratings.managementRatings} />
                <p className="p-2"> ({ratings.managementRatings})</p>
              </div>
            ) : (
              <p> Please Input Your Rating </p>
            )}
            {/* <input
              type="number"
              name="amenitiesRatings"
              value={ratings.amenitiesRatings}
              onChange={handleRatingsChange}
              className="ml-2 border-gray-300 rounded"
            /> */}
          </div>
          <div className="mb-2 flex gap-10">
            <label>Service Rating :</label>
            {ratings?.serviceRatings ? (
              <div className="pl-2 flex">
                <RatingComponent rating={ratings.serviceRatings} />
                <p className="p-2"> ({ratings.serviceRatings})</p>
              </div>
            ) : (
              <p> Please Input Your Rating </p>
            )}
            {/* <input
              type="number"
              name="amenitiesRatings"
              value={ratings.amenitiesRatings}
              onChange={handleRatingsChange}
              className="ml-2 border-gray-300 rounded"
            /> */}
          </div>
        </div>
      </div>

      {/* Review */}
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl  py-2 font-bold">Review</h1>
          <button className="hover:scale-125" onClick={() => {setopenEditReviews(true)}}>
            <Pencil />
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="w-full p-4 border rounded-lg">
            {review ? review : "Please Write Your Review"}
          </p>
        </div>
      </div>
      {openEditRatings && (
        <EditDialog
          isOpen={openEditRatings}
          setOpen={setOpenEditRatings}
          ratings={userData?.ratings}
          listingId={userData.listing.id || ""}
        />
      )}
      {openEditReviews && (
        <ReviewEditDialog
          isOpen={openEditReviews}
          setOpen={setopenEditReviews}
          reviews={userData?.reviews}
          listingId={userData.listing.id || ""}
        />
      )}
    </div>
  );
};

export default OverviewRatingReview;
