

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface BookingType {
  _id?: string;
  hotelId:string;
  userId: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  firstName: string;
  lastName: string;
  email: string;
  paymentIntentId: string;
  totalCost: number;
  createdAt?: string;
}

export interface HotelType {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: string[];
}

export type PaymentIntentType = {
  paymentIntentId: string;
};
