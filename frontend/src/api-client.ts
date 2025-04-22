import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
 //use url or after built use same url

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
export const signIn = async (formData:SignInFormData) => {
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
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Logout failed");
  }
return responseBody;
}

export const addMyHotel = async (hotelFormData: FormData) => {

  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error("Faild to add Hotel");
  }
  return responseBody;
}

//HotelType is in backend create mongodb schema
export const fetchMyHotels = async ():Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
}

export const fetchMyHotelById = async (id: string):Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
}

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

export type searchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  page:string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};
export const searchHotels = async (
  params: searchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", params.destination || "");
  queryParams.append("checkIn", params.checkIn || "");
  queryParams.append("checkOut", params.checkOut || "");
  queryParams.append("adultCount", params.adultCount || "");
  queryParams.append("childCount", params.childCount || "");
  queryParams.append("page", params.page || "");

  queryParams.append("maxPrice", params.maxPrice || "");
  //queryParams.append("facilities",params.facilities?.join(",")||"");
  //queryParams.append("types",params.types?.join(",")||"");
  //queryParams.append("stars", params.stars?.join(",") || "");
  queryParams.append("sortOption", params.sortOption || "");
  params.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  params.types?.forEach((type) =>
    queryParams.append("types", type)
  );
  params.stars?.forEach((star) =>
    queryParams.append("stars", star)
  );

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Search hotels failed");
  }

  return await response.json();
};
