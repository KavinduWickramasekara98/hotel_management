import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection=()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();
    return (
      <div>
        <h2 className="text-2xl font-bold mb-3">Image Section</h2>
        <div className="pd-4 border border-gray-400 rounded-lg fkex flex-col gap-4 p-4 text-center">
          <label>Enter Images</label>
          <input
          multiple
          accept="image/*" 
          type="file"
           {...register("imageFiles",{
            validate:(imageFiles)=>{
                const imageLength=imageFiles.length;
                if(imageLength===0){
                    return "Please upload at least one image";
                }else if(imageLength>6){
                    return "Maximum 6 images are allowed";
                    
                }else{
                    return true;
                }
            }
          })} />
        </div>
        {errors.imageFiles&&(
            <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
        )}
      </div>
    );
}
export default ImageSection;