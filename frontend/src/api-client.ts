import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  UserType,
  BookingType,
} from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchMyBookings = async () =>{
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`,
    {credentials:"include",

    }
  )
  console.log(response);
  if(!response.ok){
    throw new Error("Unable to fetch bookings");
  }
  return response.json();
}

export const fetchUser = async (): Promise<UserType | null> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return responseBody;
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody;
  } else {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Logout failed");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return {};
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Failed to add Hotel");
  }
  return responseBody;
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const fetchMyHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const updateMyHotelById = async (
  hotelFormData: FormData,
  hotelId: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "PUT",
    credentials: "include",
    body: hotelFormData,
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export type SearchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  page: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  params: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", params.destination || "");
  queryParams.append("checkIn", params.checkIn || "");
  queryParams.append("checkOut", params.checkOut || "");
  queryParams.append("adultCount", params.adultCount || "");
  queryParams.append("childCount", params.childCount || "");
  queryParams.append("page", params.page || "");
  queryParams.append("maxPrice", params.maxPrice || "");
  queryParams.append("sortOption", params.sortOption || "");
  params.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  params.types?.forEach((type) => queryParams.append("types", type));
  params.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Search hotels failed");
  }
  return await response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const bookHotel = async (
  data: BookingType
): Promise<{ message: string; bookingId: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.error || "Failed to book hotel");
  }
  return responseBody;
};
