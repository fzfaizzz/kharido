import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Removed unused 'json' import
import axios from 'axios';
import './login.css';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error("Please fill the required fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Check if the response has a token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('user', JSON.stringify({ email }));
        
        setEmail("");
        setPassword("");
        navigate('/explore');
        toast.success("Logged in successfully");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err) {
      setError('Invalid email or password');
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className='font'>
      <h1 className='absolute top-6 left-10 text-3xl font-m'>STEPNEST</h1>
      <Link to="/singup"> {/* Corrected the typo here */}
        <button className='absolute top-6 hidden md:inline-block right-10 bg-gray-500 text-xl font-bold rounded-xl px-6 py-2 text-green-100'>
          Sign Up
        </button>
      </Link>
      <div className='bg-[url("/images/softbg.jpg")] bg-cover w-screen h-screen flex justify-center text-center items-center'>
        <div className='logpage h-2/3 w-96 backdrop:blur-md rounded-lg'>
          <h1 className='text-6xl mt-5 text-green-100 font-semibold'>LOGIN</h1>
          <form onSubmit={handleLogin}>
            <div className='mt-4'>
              <p className='-ml-56 font-sans font-medium'>EMAIL<span className='text-red-600 font-bold'>*</span></p>
              <input 
                type="email" 
                placeholder='EMAIL' 
                className='rounded-xl w-72 border' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mt-6'>
              <p className=' mt-4 -ml-48 font-sans font-medium'>PASSWORD<span className='text-red-600 font-bold'>*</span></p>
              <input 
                type="password" 
                placeholder='PASSWORD' 
                className='rounded-xl w-72' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='font-mono font-semibold mt-5'>
              Forgot <Link to='/forget'><span className='text-red-600 underline hover:text-blue-600'>Password?</span></Link>
            </p>
            <button 
              type="submit" 
              className='bg-gray-500 text-xl font-bold rounded-xl px-6 py-2 mt-5 text-green-100'
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
