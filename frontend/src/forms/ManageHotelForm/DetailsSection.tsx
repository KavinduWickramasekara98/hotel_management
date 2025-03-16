import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const {register,
        formState:{errors}} = useFormContext<HotelFormData>();

    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("name", { required: "name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </label>
        <div className="flex gap-4">
          <label className="text-gray-700 text-sm font-bold flex-1">
            City
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              type="text"
              {...register("city", { required: "city is required" })}
            />
            {errors.city && 
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            }
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Country
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              type="text"
              {...register("country", { required: "email is required" })}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Description
          <textarea
            rows={10}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Price Per Night
            <input
                className="border rounded w-full py-1 px-2 font-normal"
                type="number"
                min={1}
                {...register("pricePerNight", {
                required: "price per night is required",
                })}
            />
            {errors.pricePerNight && (
                <span className="text-red-500 text-sm">
                {errors.pricePerNight.message}
                </span>
            )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Star Rating
            <select {...register("starRating", { required: "star rating is required" })} className="border rounded w-full py-1 px-2 font-normal">
                <option value="1" className="text-sm font-bold">
                    Select as Rating
                </option>
               {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating} className="text-sm font-bold">
                        {rating}
                    </option>
                ))}

            </select>
            {errors.starRating && (
                <span className="text-red-500 text-sm">
                {errors.starRating.message}
                </span>
            )}
        </label>

        

    
      </div>
    );
};
export default DetailsSection;