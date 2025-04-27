import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContexts";
import SignOutButton from "./SignOutButton";
//import { useState } from "react";
//const themes = ["black","orange"]
const Header = () => {
  const {isLoggedIn} = useAppContext();
  //const [theme , setTheme] = useState<string>(themes[0]);
    return (
      <div className="bg-bgPrimary py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-tBase font-bold tracking-tight ubuntu-family">
            <Link to="/">HotelCalifornia.com</Link>
          </span>
          <span className="flex space-x-2">
            {isLoggedIn ? (
              <>
                {console.log("login" + isLoggedIn)}
                <Link to="/my-bookings">
                  <span className="flex items-center justify-center text-tBase px-3 py-2 w-32 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family">
                    My Bookings
                  </span>
                </Link>
                <Link to="/my-hotels">
                  <span className="flex items-center justify-center text-tBase px-3 py-2 w-32 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family">
                    My Hotels
                  </span>
                </Link>
                <div className="flex items-center justify-center text-tBase px-3 py-2 w-32 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family">
                  <SignOutButton />
                </div>
              </>
            ) : (
              <>
                {console.log("login" + isLoggedIn)}
                <Link
                  to="/sign-in"
                  className="flex items-center justify-center text-tBase px-3 py-2 w-32 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family"
                >
                  Sign In
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    );
    
}
export default Header;