import {Link} from "react-router-dom";
//import { useState } from "react";
//const themes = ["black","orange"]
const Header = () => {
  //const [theme , setTheme] = useState<string>(themes[0]);
    return (
      <div className="bg-bgPrimary py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-tBase font-bold tracking-tight ubuntu-family">
            <Link to="/">HotelCalifornia.com</Link>
          </span>
          <span className="flex space-x-2">
            <Link
              to="/sign-in"
              className="flex items-center text-tBase px-3 font-bold bg-slate-300 bg-opacity-50 hover:bg-yellow-400 rounded-lg ubuntu-family"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
    );
    
}
export default Header;