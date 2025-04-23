import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  // Fetch hotel data
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery(
    ["fetchHotelById", hotelId],
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  // State for image gallery (optional: for selecting main image)
  const [selectedImage, setSelectedImage] = useState(0);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong>Error:</strong> Failed to load hotel details. Please try again
          later.
        </div>
      </div>
    );
  }

  // No hotel data
  if (!hotel) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          <strong>Warning:</strong> Hotel not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hotel Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500" size={24} />
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {hotel.name}
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt />
          <span>
            {hotel.city}, {hotel.country}
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Image */}
        <div className="md:col-span-2">
          <img
            src={
              hotel.imageUrls[selectedImage] ||
              "https://via.placeholder.com/600x400"
            }
            alt={hotel.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
        {/* Thumbnail Images */}
        <div className="flex md:flex-col gap-2 overflow-x-auto">
          {hotel.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url || "https://via.placeholder.com/100x100"}
              alt={`${hotel.name} thumbnail ${index}`}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                selectedImage === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Hotel Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Description and Facilities */}
        <div className="md:col-span-2 space-y-6">
          {/* Type and Price */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              {hotel.type}
            </span>
            <span className="text-2xl font-bold text-blue-600">
              ${hotel.pricePerNight} / night
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              About {hotel.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
          </div>

          {/* Facilities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Facilities
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {hotel.facilities.map((facility, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="text-blue-500">•</span> {facility}
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Capacity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Guest Capacity
            </h2>
            <p className="text-gray-600">
              Adults: {hotel.adultCount} | Children: {hotel.childCount}
            </p>
          </div>
        </div>

        {/* Right Column: Booking Placeholder */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
          
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-gray-500 text-sm">
        Last updated: {new Date(hotel.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Detail;
