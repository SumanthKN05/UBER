import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './pages/home.jsx'
import UserLogin from './pages/userLogin.jsx'
import UserSignUp from './pages/userSignUp.jsx'
import CaptainLogin from './pages/captainLogin.jsx'
import CaptainSignup from './pages/captainSignup.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signUp" element={< UserSignUp/>} />
        <Route path="login" element={<UserLogin/>} />
        <Route path="captain-signUp" element={<CaptainSignup/>} />
        <Route path="captain-login" element={<CaptainLogin />} />
      </Routes>
    </div>
  );
};

export default App;