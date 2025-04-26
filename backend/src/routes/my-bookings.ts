import express ,{Request,Response} from "express";
import verifyToken from "../middleware/auth";

import BookingModel from "../models/Booking";
const router = express.Router();
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const hotels = await BookingModel.aggregate([
      // Match bookings for the user
      { $match: { userId } },
      // Lookup to join with Hotel collection
      {
        $lookup: {
          from: "hotels", // MongoDB collection name (lowercase, plural)
          localField: "hotelId",
          foreignField: "_id",
          as: "hotel",
        },
      },
      // Unwind the hotel array
      { $unwind: "$hotel" },
      // Group to get unique hotels
      {
        $group: {
          _id: "$hotel._id",
          hotel: { $first: "$hotel" },
        },
      },
      // Project to return only the hotel details
      {
        $replaceRoot: { newRoot: "$hotel" },
      },
    ]);

    res.status(200).send(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetching bookings failed" });
  }
});

export default router;