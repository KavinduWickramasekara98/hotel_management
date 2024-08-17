import "../styles/Hero.css"; 

const Hero = () => {
  return (
    <div className="bg-black pb-16">
      <div className="container mx-auto flex flex-col gap-2 hero-header-bar">
        <h1 className="text-3xl text-yellow-300 font-bold ">
          Find your next stay
        </h1>
        <p className="text-1xl  text-yellow-300">low prices high quality</p>
      </div>
    </div>
  );
};

export default Hero;
