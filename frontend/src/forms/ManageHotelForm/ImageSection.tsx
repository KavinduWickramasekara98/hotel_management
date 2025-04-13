import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection=()=>{
    const {register,formState:{errors},watch,setValue}=useFormContext<HotelFormData>();
    const existingImageUrls = watch("imageUrls");
    const handleDelete = (event:React.MouseEvent<HTMLButtonElement,MouseEvent> , imageUrl:string)=>{
        event.preventDefault();
        setValue("imageUrls",
        existingImageUrls?.filter((url)=>url!==imageUrl));
    }
    return (
      <div>
        <h2 className="text-2xl font-bold mb-3">Image Section</h2>
        <div className="pd-4 border border-gray-400 rounded-lg fkex flex-col gap-4 p-4 text-center">
          {existingImageUrls && (
            <div className="grid grid-cols-6 gap-2">
              {existingImageUrls.map((url) => (
                <div className="relative group" key={url}>
                  <img
                    src={url}
                    alt="hotel"
                    className="min-h-full object-cover"
                  />
                  <button 
                  onClick={(event)=>handleDelete(event,url)}
                  className="absolute inset-0 text-cyan-50 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          <label>Enter Images</label>
          <input
            multiple
            accept="image/*"
            type="file"
            {...register("imageFiles", {
              validate: (imageFiles) => {
                const imageLength = imageFiles.length + (existingImageUrls?.length || 0);
                if (imageLength === 0) {
                  return "Please upload at least one image";
                } else if (imageLength > 6) {
                  return "Maximum 6 images are allowed";
                } else {
                  return true;
                }
              },
            })}
          />
        </div>
        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    );
}
export default ImageSection;