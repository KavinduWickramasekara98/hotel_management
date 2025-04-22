import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/searchContexts";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const navigate= useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
const minDate = new Date();
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-4 p-3 bg-orange-300 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-2"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 h-full box-border">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-2 gap-2 h-full box-border items-center">
        <label className="flex items-center">
          Adults:
          <input
            type="number"
            min={1}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className="w-1/2 p-1 rounded border font-bold border-gray-300 focus:ring-orange-500 focus-outline-none"
          />
        </label>
        <label className="flex items-center ">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className="w-12 p-1 rounded border font-bold border-gray-300 focus:ring-orange-500 focus-outline-none"
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in"
          className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200 ease-in-out">
            Search
        </button>
        <button className="w-1/3 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 ease-in-out">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
