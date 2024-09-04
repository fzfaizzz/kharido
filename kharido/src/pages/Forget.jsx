import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './forget.css';

function Forget() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    try {
      const response = await axios.post('http://localhost:4800/api/auth/forget-password', { email });
      setMessage('OTP sent to your email');
    } catch (err) {
      setError('Error sending OTP');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4800/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      setMessage('Password reset successfully');
      navigate('/login');
    } catch (err) {
      setError('Invalid OTP or OTP expired');
    }
  };

  return (
    <div className='bg-[url("/images/newpassword.jpg")] bg-cover w-screen h-screen flex justify-center text-center items-center'>
      <h1 className='absolute top-6 left-10 text-3xl font-m'>STEPNEST</h1> 
      <div className='logpage h-2/3 w-96 backdrop:blur-md rounded-lg'>
        <h1 className='text-6xl mt-4 text-green-100 font-semibold'>FORGET</h1>
        
        <p className='mt-4 -ml-56 font-sans font-medium'>USER ID</p>
        <input 
          type="text" 
          placeholder='EMAIL' 
          className='rounded-xl w-72 border' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='get-otp-btn bg-gray-500 ml-48 mt-2 py-1' onClick={handleGetOtp}>
          Get OTP
        </button>

        <p className='-ml-64 pl-5 -mt-3 font-sans font-medium'>O.T.P</p>
        <input 
          type="text" 
          placeholder='Enter O.T.P' 
          className='rounded-xl w-72' 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        
        <p className='-ml-44 pl-5 mt-3 font-sans font-medium'>NEW PASSWORD</p>
        <input 
          type="password" 
          placeholder='New Password' 
          className='rounded-xl w-72' 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className='bg-gray-500 text-xl font-serif font-bold rounded-xl mt-8 px-6 py-2 text-green-100' onClick={handleResetPassword}>
          Submit
        </button>

        {message && <p className='text-green-500 mt-4'>{message}</p>}
        {error && <p className='text-red-500 mt-6'>{error}</p>}
      </div>
    </div>
  );
}

export default Forget;
