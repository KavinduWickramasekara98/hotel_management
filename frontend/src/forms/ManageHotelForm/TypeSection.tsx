import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () =>{
    const {register,watch,formState:{errors},} =useFormContext<HotelFormData>();
    const typeWatch = watch("type");
    return (
      <div className="form-group">
        <h2 className="text-2xl font-bold mb-3">Type</h2>
        <div className="grid grid-cols-5 gap-2">
          {hotelTypes.map((type) => (
            <label
              className={
                typeWatch === type ? "cursor-pointer bg-blue-300 rounded-full px-4 py-2 font-semibold text-center": "cursor-pointer bg-gray-200 rounded-full px-4 py-2 font-semibold text-center"
              }>
          
        
              <input
                type="radio"
                value={type}
                {...register("type", { required: "Please select a type" })}
                className="mr-2 hidden"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {errors.type && (
          <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
        )}
      </div>
    );
}
export default TypeSection;