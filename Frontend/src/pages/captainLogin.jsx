import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const[captainData, setCaptainData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    })

  
    
    // Reset form fields
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 flex flex-col">
        <div className="flex justify-end items-end pt-2">
          <img
            className="w-20 mb-2"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber logo"
          />
        </div>

        <form  onSubmit={(e)=>{
          submitHandler(e)
      
        }} className="px-4">
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />

          <h3 className="text-lg font-medium mb-2">Enter Your Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="bg-[#111] text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
                                    {/*Registering as Captain*/}

        <p className="text-center py-4 ">
          Join a fleet!{' '}
          <Link to="/captain-signUp" className="text-blue-500 font-semibold">
            Register as a Captain!
          </Link>
        </p>
      </div>
        
                                    {/*Sign in as user */}

      <div className="p-4">
        <Link to="/login"
          className="bg-[#d5622d] flex items-center justify-center  text-Black font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User!
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

