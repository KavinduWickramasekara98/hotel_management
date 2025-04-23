import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/searchContexts";
import { useAppContext } from "../../contexts/AppContexts";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    hotelId:string;
    pricePerNight:number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};
const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search =useSearchContext();
    const {isLoggedIn} = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        watch,
        register, 
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    
    const onSignInClick = (data:GuestInfoFormData) => {
        search.saveSearchValues("",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        );
        navigate("/sign-in",{state:{from:location}});
    }
    const onSubmit = (data: GuestInfoFormData) => {
      search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount
      );
      navigate("/hotel/${hotelId}/booking", { state: { from: location } });
    };

    
    return (
      <div className="flex felx-col p-4 bg-blue-200 gap-4">
        <h3 className="text-md font-bold">${pricePerNight}</h3>
        <form onSubmit={isLoggedIn?handleSubmit(onSubmit):handleSubmit(onSignInClick)}>
          <div className="grid grid-cols-1 gap-4 items-center">
            <div>
              <DatePicker
                required
                selected={checkIn}
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in"
                className="min-w-full bg-white p-2 focus:outline-none"
                wrapperClassName="min-w-full"
              />
              <div className="mt-4">
                <DatePicker
                  required
                  selected={checkOut}
                  onChange={(date) => setValue("checkOut", date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in"
                  className="min-w-full bg-white p-2 focus:outline-none"
                  wrapperClassName="min-w-full"
                />
              </div>
              <div className="flex bg-white px-2 py-2 gap-2 h-full box-border items-center mt-4">
                <label className="flex items-center">
                  Adults:
                  <input
                    type="number"
                    min={1}
                    max={20}
                    {...register("adultCount", {
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "At least one adult is required",
                      },
                      valueAsNumber: true,
                    })}
                  />
                </label>
                <label className="flex items-center ">
                  Children:
                  <input
                    type="number"
                    min={0}
                    max={20}
                    {...register("childCount", {
                      valueAsNumber: true,
                    })}
                  />
                </label>
                {errors.adultCount && (
                  <span className="text-red-500 text-sm">
                    {errors.adultCount.message}
                  </span>
                )}
              </div>
            </div>
            {isLoggedIn ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Book Now
              </button>
            ) : (
              <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign in to Book
              </button>
            )}
          </div>
        </form>
      </div>
    );


}

export default GuestInfoForm;