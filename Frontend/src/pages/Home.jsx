
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Define background image outside JSX for better readability
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1200&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'bottom'
  };

  return (
    <div>
      {/* this div covers the entire home page's everything */}
      <div 
        style={backgroundStyle}
        className="min-h-screen pt-8 flex justify-between flex-col w-full"
      > 
        <div className="flex justify-end mr-5">
          <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
        </div>
          
        <div className="bg-white py-4 px-4 pb-4" >
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;