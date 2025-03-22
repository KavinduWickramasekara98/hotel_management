import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const {
    data: hotelData,
    isLoading,
    error,
  } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: (err) => {
      console.log("Failed to fetch:", err);
    },
    retry: 1,
  });

  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  const handleNextImage = (hotelId: string, totalImages: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [hotelId]: Math.min((prev[hotelId] ?? 0) + 1, totalImages - 1),
    }));
  };

  const handlePrevImage = (hotelId: string) => {
    setImageIndices((prev) => ({
      ...prev,
      [hotelId]: Math.max((prev[hotelId] ?? 0) - 1, 0),
    }));
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <div>Loading hotels........</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-5">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <div className="text-red-500">
          Failed to load hotels. Please try again later.
        </div>
      </div>
    );
  }

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="space-y-5">
        <span className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">My Hotels</h1>
          <Link
            to="/add-hotel"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300"
          >
            Add Hotel
          </Link>
        </span>
        <div>No hotels found. Click "Add Hotel" to create one.</div>
      </div>
    );
  }

  return (
    <div className="space-y-5 mb-4">
      <span className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelData.map((hotel) => {
          const currentIndex = imageIndices[hotel._id] ?? 0;
          const totalImages = hotel.imageUrls.length;

          return (
            <div
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 p-4 rounded-md relative"
            >
              <div className="relative">
                <img
                  src={hotel.imageUrls[currentIndex]}
                  alt={`${hotel.name} - Image ${currentIndex + 1}`}
                  className="h-48 w-full object-cover rounded-md"
                />
                {totalImages > 1 && currentIndex > 0 && (
                  <button
                    onClick={() => handlePrevImage(hotel._id)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    ◀
                  </button>
                )}
                {totalImages > 1 && currentIndex < totalImages - 1 && (
                  <button
                    onClick={() => handleNextImage(hotel._id, totalImages)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    ▶
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold mt-2">{hotel.name}</h2>
              {/* Scrollable description */}
              <div className="mt-2 h-20 overflow-y-auto whitespace-pre-line">
                {hotel.description}
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <BiMoney className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                {Array.from({ length: hotel.starRating }, (_, index) => (
                  <BiStar key={index} className="mr-1 text-yellow-400" />
                ))}
                {hotel.starRating} star{hotel.starRating !== 1 ? "s" : ""}
              </div>
              <span className="flex justify-end mt-4 gap-2">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300"
                >
                  View
                </Link>
                <Link
                  to={`/delete-hotel/${hotel._id}`}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300"
                >
                  Delete
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
