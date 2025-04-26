import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContexts";
import BookingForm from "../forms/BookingForm/BookingForm";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { HotelType, } from "../../../backend/src/shared/types";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
}

const Booking = () => {
  const { hotelId } = useParams();
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const fetchHotel = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/hotels/${hotelId}`
        );
        if (!response.ok) throw new Error("Failed to fetch hotel");
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        navigate("/");
      }
    };
    fetchHotel();
  }, [hotelId, user, navigate]);
  const calculateNights = (): number => {
    if (checkIn && checkOut) {
      const diffInMs = checkOut.getTime() - checkIn.getTime();
      const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };
  const handleBookingSubmit = async (
    data: BookingFormData & { paymentIntentId: string }
  ) => {
    try {
      if (!checkIn || !checkOut) {
        throw new Error("Check-in and check-out dates are required");
      }
      if (!user) {
        throw new Error("User not authenticated");
      }

      const totalCost =
        hotel!.pricePerNight *
        ((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

      const response = await fetch(
        `${API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hotelId,
            userId: user._id,
            checkIn: checkIn.toISOString(),
            checkOut: checkOut.toISOString(),
            adultCount,
            childCount,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            paymentIntentId: data.paymentIntentId,
            totalCost,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to create booking");
    }
  };

  if (!hotel) return <div>Loading...</div>;
 const nights = calculateNights();
 if (nights <= 0) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">Select Booking Dates</h2>
        <p className="text-red-500">
          Please select valid check-in and check-out dates to proceed with the booking.
        </p>
        <BookingDetailsSummary
          hotel={hotel}
          checkIn={checkIn}
          checkOut={checkOut}
          adultCount={adultCount}
          childCount={childCount}
          setCheckIn={(date: string) =>
            setCheckIn(date ? new Date(date) : undefined)
          }
          setCheckOut={(date: string) =>
            setCheckOut(date ? new Date(date) : undefined)
          }
          setAdultCount={setAdultCount}
          setChildCount={setChildCount}
        />
      </div>
    );
  }
 
  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-5">
      <BookingDetailsSummary
        hotel={hotel}
        checkIn={checkIn}
        checkOut={checkOut}
        adultCount={adultCount}
        childCount={childCount}
        setCheckIn={(date: string) =>
          setCheckIn(date ? new Date(date) : undefined)
        }
        setCheckOut={(date: string) =>
          setCheckOut(date ? new Date(date) : undefined)
        }
        setAdultCount={setAdultCount}
        setChildCount={setChildCount}
      />
      <BookingForm
        currentUser={user}
        hotel={hotel}
        nights={nights}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default Booking;
