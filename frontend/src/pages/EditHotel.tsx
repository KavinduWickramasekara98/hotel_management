import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContexts";
const EditHotel = () => {  
    const {showToast} = useAppContext();
    const {hotelId} = useParams();
    const {data:hotel} = useQuery(
        "fetchMyHotelById",
        ()=> apiClient.fetchMyHotelById(hotelId || ""),
    {
        enabled:!!hotelId,
    }
);
const { mutate, isLoading } = useMutation(
  (formData: FormData) => apiClient.updateMyHotelById(formData, hotelId || ""),
  {
    onSuccess: () => {
      showToast({ message: "Hotel Updated !", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Update Failed !", type: "ERROR" });
    },
  }
);
const handleSubmit = (hotelFormData: FormData) => {
  hotelFormData.append("hotelId", hotelId || ""); // Ensure hotelId is included
  mutate(hotelFormData);
};

return <ManageHotelForm hotel={hotel} onSave={handleSubmit} isLoading={isLoading}/>
}
export default EditHotel;