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

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    
    return (
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-5">
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
          <ImageSection />
          <span className="flex justify-end mb-8">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 ">Submit</button>
            </span>
        </form>
      </FormProvider>
    );
}

export default ManageHotelForm;