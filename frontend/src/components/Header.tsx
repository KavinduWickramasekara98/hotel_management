import {Link} from "react-router-dom";

const Header = () => {
    return (
      <div className="bg-bgThem py-6">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl text-txtThem font-bold tracking-tight ubuntu-family">
            <Link to="/">HotelCalifornia.com</Link>
          </span>
          <span className="flex space-x-2">
            <Link
              to="/sign-in"
              className="flex items-center text-txtThem px-3 font-bold hover:bg-yellow-900 rounded-lg ubuntu-family"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
    );
    
}
export default Header;