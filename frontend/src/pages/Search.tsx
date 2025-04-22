import { useSearchContext } from "../contexts/searchContexts";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";

import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice,setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
console.log("searchParams", searchParams);
  const {
    data: hotelData,
    isLoading,
    error,
  } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams));


 const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const value = event.target.value;
   setSelectedStars((prev) =>
     event.target.checked
       ? [...prev, value]
       : prev.filter((star) => star !== value)
   );
 };
  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((hotelTypeValue) => hotelTypeValue !== value)
    );
  };
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, value]
        : prev.filter((facility) => facility !== value)
    );
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching hotels: {(error as Error).message}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <FacilitiesFilter selectedFacilityType={selectedFacilities} onChange={handleFacilityChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={setSelectedPrice}/>

        </div>
      </div>



      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold">
            {hotelData?.pagination?.total ?? 0} hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select value = {sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-slate-300 rounded-lg p-2 mt-2">
            <option value="">Sort By</option>
            <option value="starRating">Rating</option>
            <option value="pricePerNightAsc">Price Low to High</option>
            <option value="pricePerNightDesc">Price High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {hotelData?.data.map((hotel) => (
            <SearchResultCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div>
          <Pagination
          page = {hotelData?.pagination.page || 1}
          pages = {hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};



export default Search;
