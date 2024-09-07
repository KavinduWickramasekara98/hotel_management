import "../styles/Hero.css"; 

const Hero = () => {
  return (
    <div className="bg-bgPrimary pb-16">
      <div className="container mx-auto flex flex-col gap-2 hero-header-bar">
        <h1 className="text-3xl text-tBase font-bold ">
          Find your next stay
        </h1>
        <p className="text-1xl  text-tBase">low prices high quality</p>
      </div>
    </div>
  );
};

export default Hero;
