
import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const UserSignUp = () => {
const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const[firstName,setFirstName] = React.useState('');
  const[lastName,setLastName] = React.useState(''); 
  const[userData, setUserData] = React.useState({});

const submitHandler = (e) => {
  e.preventDefault();
  const newUserData = {
    Fullname: {
      firstName: firstName,
      lastName: lastName
    },
    email: email,
    password: password,
  };
  setUserData(newUserData);

  // fetch data from form fields and send it to the server for registration
  setEmail('');
  setPassword('');
  setFirstName('');
  setLastName(''); 
}







  return (
    <div>
      
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
      
        }}> 
        
          {/* accquring Firstname to the design */}
         <h3 className="text-lg font-medium mb-2">What's your Name</h3>
            <div className='flex gap-2 w-full mb-6'>
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {/* accquring Lastname to the design */}
          <input
          required
          className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
           />
        </div>



          {/* accquring Email to the design */}

          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            required
     
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Your Password</h3>
          <input
            required
  
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#111] text-white mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            SignUp
          </button>
        </form>

        <p className="text-center py-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login here
          </Link>
        </p>
      </div>

      <div className="p-4">
      <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy </span>and <span className="underline">Terms of Service apply.</span></p>
      </div>
      </div>
    </div>
  );
};

export default UserSignUp;