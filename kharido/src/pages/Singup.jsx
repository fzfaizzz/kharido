import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import './singup.css'; // Ensure your CSS is correctly loaded

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      // Assuming the response contains a success status
      if (response.status === 201) {
        navigate('/login'); // Redirect to main page after successful registration
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/images/singupbg.jpg')] w-full min-h-screen bg-cover flex items-center justify-center">
      <h1 className='absolute top-6 left-10 hidden md:inline-block text-3xl font-m'>STEPNEST</h1> 

      <div className="screen p-6 rounded-lg w-full max-w-md">
        <h5 className='text-center text-green-200 font-semibold text-2xl mb-2'>REGISTER</h5>
        <p className='text-center text-green-100 mb-6'>Enter all your details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder='First Name'
              className='w-full p-2 rounded-md'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder='Last Name'
              className='w-full p-2 rounded-md'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              placeholder='Phone Number'
              className='w-full p-2 rounded-md'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder='Email'
              className='w-full p-2 rounded-md'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder='Password'
              className='w-full p-2 rounded-md'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className='text-green-100' htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder='Confirm Password'
              className='w-full p-2 rounded-md'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className='text-red-600 text-center'>{error}</p>}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className='w-full max-w-xs py-2 font-semibold text-green-100 rounded-lg bg-gray-600'
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
