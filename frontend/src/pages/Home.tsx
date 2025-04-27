import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContexts";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

const Home = () => {
  const { showToast } = useAppContext();

  // Fetch hotels (sorted by starRating, first page)
  const { data, isLoading, isError, error } = useQuery(
    ["searchHotels", "starRating"],
    () =>
      apiClient.searchHotels({
        sortOption: "starRating", // Sort by highest star rating
        page: "1",
        destination: "", // No filters to get all hotels
        checkIn: "",
        checkOut: "",
        adultCount: "",
        childCount: "",
      }),
    {
      onError: () => {
        showToast({
          message: "Failed to fetch hotels",
          type: "ERROR",
        });
      },
    }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Our Hotel Booking App
      </h1>
      <p className="text-gray-700 mb-8">
        Explore our top-rated hotels for your next adventure.
      </p>

      {isLoading && (
        <div className="text-center text-gray-700">Loading hotels...</div>
      )}

      {isError && (
        <div className="text-center text-red-500">
          Error: {(error as Error)?.message || "Failed to load hotels"}
        </div>
      )}

      {data && data.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((hotel: HotelType) => (
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
      ) : (
        !isLoading && (
          <div className="text-center text-gray-700">No hotels found.</div>
        )
      )}
    </div>
  );
};

export default Home;
