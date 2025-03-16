import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelFormData={
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    pricePerNight:number;
    starRating:number;
    facilities:string[];
    imageFiles:FileList;
    adultCount:number;
    childCount:number;
}
type Props={
    onSave:(hotelFormData:FormData)=>void;
    isLoading:boolean;
}
const ManageHotelForm = ({onSave,isLoading}:Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;
    const onSubmit = handleSubmit((formDateJson:HotelFormData) => {
      const formDate = new FormData();
      formDate.append("name", formDateJson.name);
      formDate.append("city", formDateJson.city);
      formDate.append("country", formDateJson.country);
      formDate.append("description", formDateJson.description);
      formDate.append("type", formDateJson.type);
      formDate.append("pricePerNight", formDateJson.pricePerNight.toString());
      formDate.append("starRating", formDateJson.starRating.toString());
      formDate.append("adultCount", formDateJson.adultCount.toString());
      formDate.append("childCount", formDateJson.childCount.toString());
      formDateJson.facilities.forEach((facility,index)=>{
        formDate.append(`facilities[${index}]`, facility);
      });
      for (let i = 0; i < formDateJson.imageFiles.length; i++) {
        formDate.append("imageFiles", formDateJson.imageFiles[i]);
      }
      onSave(formDate);
    } );

    return (
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImageSection />
          <span className="flex justify-end mb-8">
            <button
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 disabled:bg-gray-500 "
              type="submit"
            >
              {isLoading ? "submitting" : "Submit"}
            </button>
          </span>
        </form>
      </FormProvider>
    );
}

export default ManageHotelForm;