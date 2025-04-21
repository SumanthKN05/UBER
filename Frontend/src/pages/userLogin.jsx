import React,{useState} from 'react';

import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const[userData, setUserData] = React.useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    })
  console.log({userData});
  
    
    // Reset form fields
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 flex flex-col">
        <div className="flex justify-end items-end pt-2">
          <img
            className="w-16 mb-5"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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

        <p className="text-center py-4">
          New here?{' '}
          <Link to="/signUp" className="text-blue-500 font-semibold">
            Create A new Account
          </Link>
        </p>
      </div>

      <div className="p-4">
        <Link to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center  text-Black font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain!
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
