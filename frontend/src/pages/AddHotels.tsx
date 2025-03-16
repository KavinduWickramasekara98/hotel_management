import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContexts";

const AddHotel = () => {
    const {showToast} = useAppContext();
    const {mutate, isLoading} =useMutation(
        apiClient.addMyHotel,{
            onSuccess:()=>{
                showToast({message:"Hotel added successfully",type:"success"});
            },
            onError:(error)=>{
                showToast({message:error.message,type:"error"});
            }
        }
    );   
    const handleSave = (hotelFormData:FormData)=>{
        mutate(hotelFormData);
    } 
    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading} />);

}

export default AddHotel;