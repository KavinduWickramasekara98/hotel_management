import { Router, Request, Response } from "express";
import { BookingType } from "../shared/types";
import { BookingModel } from "../models/Booking";
import Hotel from "../models/hotel";

const router = Router();

router.post("/", async (req: Request<{}, {}, BookingType>, res: Response) => {
  try {
    const newBooking = new BookingModel(req.body);
    await newBooking.save();

    const hotel = await Hotel.findById(req.body.hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    hotel.bookings.push(newBooking._id);
    await hotel.save();

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
