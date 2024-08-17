const Footer = ()=>{
    return (
      <div className="bg-bgThem py-10">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-3xl text-txtThem font-bold tracking-tight">
            HotelCalifornia.com
          </span>
          <span className="text-txtThem font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    );
}
export default Footer;