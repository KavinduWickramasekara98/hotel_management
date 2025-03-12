import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
const {register, formState:{errors},} = useFormContext<HotelFormData>();

return (
  <div className="flex flex-col gap-4">
    <h2 className="text-3xl font-bold  mb-4">Guests</h2>
    <div className="flex gap-4 mb-6 bg-gray-200 p-4 rounded">
      <label className="text-gray-700 text-sm font-bold flex-1">
        Adults
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="number"
          min={1}
          {...register("adultCount", { required: "Adult count is required",
            validate: (value) => value > 0 || "Adult count must be greater than 0" })}
        />
        {errors.adultCount && (
          <span className="text-red-500 text-sm">
            {errors.adultCount.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Children
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="number"
          min={0}
          {...register("childCount", { required: "Child count is required" ,validate: (value) => value >= 0 || "Child count must be greater than or equal to 0" })}
        />
        {errors.childCount && (
          <span className="text-red-500 text-sm">
            {errors.childCount.message}
          </span>
        )}
      </label>
    </div>
  </div>
);
}
export default GuestSection;