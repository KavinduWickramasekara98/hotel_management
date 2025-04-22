import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilityType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilityType, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Hotel Facilities</h3>
      <div className="flex flex-col gap-1">
        {hotelFacilities.map((hotelFacility) => (
          <label key={hotelFacility} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={hotelFacility}
              checked={selectedFacilityType.includes(hotelFacility)}
              onChange={onChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>
              {hotelFacility} 
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
