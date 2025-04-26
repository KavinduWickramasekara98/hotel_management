import { useForm, SubmitHandler } from "react-hook-form";
import {
  UserType,
  HotelType,
  PaymentIntentType,
} from "../../../../backend/src/shared/types";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useAppContext } from "../../contexts/AppContexts"; // Import useAppContext

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focused: "number" | "expiry" | "cvc" | "name" | "";
}

interface Props {
  currentUser: UserType | null;
  hotel: HotelType;
  nights: number;
  onSubmit: (data: BookingFormData & { paymentIntentId: string }) => void;
}

interface PaymentError {
  error: string;
}

const BookingForm: React.FC<Props> = ({
  currentUser,
  hotel,
  nights,
  onSubmit,
}) => {
  const { showToast } = useAppContext(); // Use the AppContext to get showToast
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    expiry: "",
    cvc: "",
    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "",
    focused: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
    },
  });

  const calculateTotalPrice = (): number => {
    const total = nights * hotel.pricePerNight;
    console.log("nights:", nights);
    console.log("price per night:", hotel.pricePerNight);
    console.log("Total price:", total);
    if (total <= 0) {
      throw new Error("Total price must be greater than zero.");
    }
    return total;
  };

  const handleCardChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Omit<CardDetails, "focused">
  ): void => {
    const { value } = e.target;
    let formattedValue = value;
    if (field === "number") {
      formattedValue =
        value
          .replace(/\D/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || value;
    } else if (field === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5);
    }
    setCardDetails((prev) => ({
      ...prev,
      [field]: formattedValue,
      focused: field as CardDetails["focused"],
    }));
  };

  const handleInputFocus = (field: CardDetails["focused"]): void => {
    setCardDetails((prev) => ({ ...prev, focused: field }));
  };

  const onSubmitForm: SubmitHandler<BookingFormData> = async (data) => {
    setPaymentError(null);

    if (!cardDetails.number.replace(/\s/g, "").match(/^\d{16}$/)) {
      setPaymentError("Card number must be 16 digits.");
      return;
    }
    if (!cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setPaymentError("Invalid expiry date (MM/YY).");
      return;
    }
    if (!cardDetails.cvc.match(/^\d{3,4}$/)) {
      setPaymentError("CVC must be 3 or 4 digits.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/mock-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: calculateTotalPrice() * 100,
            currency: "usd",
            cardNumber: cardDetails.number.replace(/\s/g, ""),
            expiry: cardDetails.expiry,
            cvc: cardDetails.cvc,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          response.status === 404
            ? "Payment endpoint not found. Check server configuration."
            : `Payment failed: ${text}`
        );
      }

      const result: PaymentIntentType | PaymentError = await response.json();
      if ("error" in result) {
        throw new Error(result.error);
      }

      // Payment is successful, show toast
      showToast({ message: "Booking saved", type: "SUCCESS" });

      onSubmit({
        ...data,
        paymentIntentId: (result as PaymentIntentType).paymentIntentId,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during payment processing.";
      setPaymentError(errorMessage);
      console.error("Payment Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              readOnly
              disabled
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              readOnly
              disabled
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Price Summary
        </h3>
        <div className="flex justify-between text-gray-600">
          <span>Price per night</span>
          <span>${hotel.pricePerNight}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Nights ({nights})</span>
          <span>${nights * hotel.pricePerNight}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
          <span>Total</span>
          <span>${calculateTotalPrice()}</span>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Payment Details
        </h3>
        <div className="mb-4">
          <Cards
            number={cardDetails.number}
            expiry={cardDetails.expiry}
            cvc={cardDetails.cvc}
            name={cardDetails.name}
            focused={cardDetails.focused}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.number}
                onChange={(e) => handleCardChange(e, "number")}
                onFocus={() => handleInputFocus("number")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                MM/YY
              </label>
              <input
                type="text"
                value={cardDetails.expiry}
                onChange={(e) => handleCardChange(e, "expiry")}
                onFocus={() => handleInputFocus("expiry")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                CVC
              </label>
              <input
                type="text"
                value={cardDetails.cvc}
                onChange={(e) => handleCardChange(e, "cvc")}
                onFocus={() => handleInputFocus("cvc")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
        {paymentError && (
          <span className="text-red-500 text-sm">{paymentError}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
