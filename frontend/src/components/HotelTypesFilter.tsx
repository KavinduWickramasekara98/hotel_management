import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Hotel Type</h3>
      <div className="flex flex-col gap-1">
        {hotelTypes.map((hotelType) => (
          <label key={hotelType} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>
              {hotelType} 
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypesFilter;
