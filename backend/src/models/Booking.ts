import mongoose from "mongoose";
import { BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  userId: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  paymentIntentId: { type: String, required: true },
  totalCost: { type: Number, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

export const BookingModel = mongoose.model<BookingType>(
  "Booking",
  bookingSchema
);
export default BookingModel;