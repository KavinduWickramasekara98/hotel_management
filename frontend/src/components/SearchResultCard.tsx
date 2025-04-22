import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { HotelType } from "../../../backend/src/shared/types";
import { FaStar } from "react-icons/fa";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    hotel.imageUrls && hotel.imageUrls.length > 0
      ? hotel.imageUrls
      : ["https://via.placeholder.com/150"];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < rating ? "text-yellow-400" : "text-gray-300"
            } w-4 h-4`}
          />
        ))}
        <span className="ml-2 text-sm">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="border border-slate-300 rounded-lg p-4 sm:p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Slider */}
        <div className="w-full lg:w-1/3 relative">
          <img
            src={images[currentImageIndex]}
            alt={`${hotel.name} image ${currentImageIndex + 1}`}
            className="w-full h-48 sm:h-64 lg:h-52 object-cover rounded-lg"
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/150")
            }
            loading="lazy"
          />
          {/* Slider Buttons */}
          {images.length > 1 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-3">
              <button
                onClick={handlePrevious}
                disabled={currentImageIndex === 0}
                className={`bg-gray-800 text-white p-2 rounded-full transition-all duration-200 ${
                  currentImageIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-600"
                }`}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                disabled={currentImageIndex === images.length - 1}
                className={`bg-gray-800 text-white p-2 rounded-full transition-all duration-200 ${
                  currentImageIndex === images.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-600"
                }`}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          )}
          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        {/* Hotel Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              {hotel.name}
            </h4>
            <p className="text-gray-600 mb-2">
              {hotel.city}, {hotel.country}
            </p>
            <p className="text-gray-700 font-medium mb-2">
              ${hotel.pricePerNight} / night
            </p>
            <StarRating rating={hotel.starRating} />
            <p className="text-gray-600 mt-2">
              Max guests: {hotel.adultCount} adults, {hotel.childCount} children
            </p>
            <p className="text-gray-600 mt-2 line-clamp-2">
              {hotel.description}
            </p>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {hotel.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {facility}
                </span>
              ))}
              {hotel.facilities.length > 3 && (
                <span className="text-gray-600 text-xs">
                  +{hotel.facilities.length - 3} more
                </span>
              )}
            </div>
            <Link
              to={`/hotels/${hotel.userId}`}
              className="rounded-lg p-2 bg-yellow-200 text-black hover:text-yellow-900  font-medium text-sm sm:text-base transition-colors duration-200"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
