import { HotelType } from "../../../backend/src/shared/types";

interface Props {
  hotel: HotelType;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  adultCount: number;
  childCount: number;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setAdultCount: (count: number) => void;
  setChildCount: (count: number) => void;
}

const BookingDetailsSummary: React.FC<Props> = ({
  hotel,
  checkIn,
  checkOut,
  adultCount,
  childCount,
  setCheckIn,
  setCheckOut,
  setAdultCount,
  setChildCount,
}) => {
  return (
    <div className="p-5 border rounded-lg">
      <h2 className="text-xl font-bold">{hotel.name}</h2>
      <p>
        {hotel.city}, {hotel.country}
      </p>
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">Check-in</label>
        <input
          type="date"
          value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">
          Check-out
        </label>
        <input
          type="date"
          value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">Adults</label>
        <input
          type="number"
          value={adultCount}
          onChange={(e) => setAdultCount(Number(e.target.value))}
          min={1}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-1">Children</label>
        <input
          type="number"
          value={childCount}
          onChange={(e) => setChildCount(Number(e.target.value))}
          min={0}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
