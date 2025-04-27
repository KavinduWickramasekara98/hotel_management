import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContexts";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

const MyBookings = () => {
  const { showToast } = useAppContext();

  // Fetch booked hotels
  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useQuery<HotelType[]>("fetchMyBookings", apiClient.fetchMyBookings, {
    onError: () => {
      showToast({
        message: "Failed to fetch bookings",
        type: "ERROR",
      });
    },
  });

  if (isLoading) {
    return <div className="text-center text-gray-700">Loading bookings...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {(error as Error)?.message || "Failed to load bookings"}
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return <div className="text-center text-gray-700">No bookings found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <p className="text-gray-700 mb-8">
        View the hotels you have booked for your upcoming trips.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Link
            to={`/hotels/${hotel._id}`}
            key={hotel._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              {hotel.imageUrls && hotel.imageUrls.length > 0 ? (
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200?text=No+Image"
                  alt="No image available"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 truncate">
                {hotel.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {hotel.city}, {hotel.country}
              </p>
              <p className="text-gray-600 text-sm">
                {hotel.starRating} ★ | ${hotel.pricePerNight}/night
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
