import { useQuery } from "react-query";
import * as apiClient from "../api-client"
const MyBookings =()=>{
    const { data: hotels } = useQuery("fetchMyBookings",apiClient.fetchMyBookings);
    console.log(hotels);
    if (!hotels||hotels.length ==0) {
        
        return <span>No bookings found</span>
    }
    
}

export default MyBookings;