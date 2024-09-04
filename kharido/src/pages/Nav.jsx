import React, { useState, useEffect } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for logout functionality
import './nav.css';
import Profile from './Profile';

function Nav() {
  const [isOpen, setOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear the token and other user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="relative">
      <div
        className='flex items-center justify-center p-4'
        style={{ background: "linear-gradient(to top right, white 40%, gray )" }}
      >
        <img src="images/stepnlogo.png" alt="StepNest Logo" className='h-16 md:h-20' />
      </div>
      <h1 className='text-center text-3xl md:text-4xl font-semibold'>STEPNEST</h1>
      <h1 className='text-center text-lg md:text-xl -mt-1'>STEP INTO COMFORT.</h1>

      <div className='hidden md:flex h-[52px] text-lg mt-3 gap-8 flex-wrap bg-slate-200 items-center justify-between px-4'>
        <a href="#" className='nav-link ml-4'>HOME</a>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder='Search item' 
            className='w-full md:w-80 lg:w-96 font-serif rounded-lg mt-1 h-10 text-black font-normal border-none p-2'
          />
          <button 
            className='search-button text-lg h-10 text-neutral-100 font-bold mt-1 px-4 rounded-lg'
          >
            Search
          </button>
        </div>

        <div className='mt-0 mr-5 flex gap-6'>
          <a href="#"><i className="fa fa-heart nav-icon"></i></a>
          <a href="#"><i className="fa fa-shopping-cart nav-icon"></i></a>
          <a href="#" onClick={() => setProfileOpen(!isProfileOpen)}><i className="fa fa-address-book nav-icon"></i></a>
        </div>
      </div>

      <div className='md:hidden inline-block absolute left-3 top-5 z-30'>
        <Hamburger color='black' toggled={isOpen} toggle={setOpen} />
      </div>

      {isOpen && (
        <div className='menu p-5 absolute font-bold text-black top-0 left-0 w-60 gap-1 h-screen z-20 bg-white shadow-lg'>
          <ul className='flex flex-col opacity-90 items-start space-y-4 py-20 text-lg px-4'>
            <li><Link to="/" onClick={() => setOpen(false)} className='menu-link hover:text-black'>Home</Link></li>
            <li><Link to="/order" onClick={() => setOpen(false)} className='menu-link'>Order</Link></li>
            <li><Link to="/favorites" onClick={() => setOpen(false)} className='menu-link'>Favorite</Link></li>
            <li><Link to="/cart" onClick={() => setOpen(false)} className='menu-link'>Cart</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)} className='menu-link'>About</Link></li>
          </ul>
        </div>
      )}

      {/* Profile menu */}
      <div className={`profile-menu absolute right-5 top-[240px] shadow-lg p-4 rounded-lg w-48 z-20 ${isProfileOpen ? 'open' : ''}`}>
        <ul className='flex flex-col items-start space-y-2'>
          <li><Link to="/profile" className='profile-link'>Profile</Link></li>
          {/* <li><Link to="/settings" className='profile-link'>Settings</Link></li> */}
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className='profile-link'>Logout</button>
            ) : (
              <Link to="/login" className='profile-link'>Login</Link>
            )}
          </li>
        </ul>

      </div>

      <div className='mt-2 h-[50%] w-[80%] bg-black ml-[10%]'>
        <video
          loop
          muted
          autoPlay
          className="h-[100%] w-[100%] object-cover"
          src="images/navbg.mp4"
        />
        <img src="images/navbg-unscreen.gif" alt="" />
      </div>
      <h1 className='font-serif text-center text-5xl mt-10'>ADD IN YOUR </h1>
      <h1 className='font-serif text-center text-4xl'>COLLECTION</h1>
      <div className='showpro mt-10 flex flex-wrap gap-7 items-center justify-center '>
        <div className='card '>
          <img src="images/prodect1.png" alt="" className=' rounded-md relative' />
          
          <div className="intro">
            <h1 className='text-xl text-white font-serif mt-7  '>Step shoes</h1>
            <h1 className='font-serif text-white text-xl '>RS 1800 </h1> <span className='text-white -mt-2 text-sm line-through'>Rs 2300</span>
            <p className='text-white text-sm font-serif'>size: 8</p>
          <button className='buy text-xl ml-72 mt-3 '>Buy</button>
        </div>
        </div>
        <div className='card '>
          <img src="images/prodect2.jpg" alt="" className=' rounded-md relative' />
          <div className="intro">
            <h1 className='text-xl text-white font-serif mt-7  '>Step shoes</h1>
            <h1 className='font-serif text-white text-xl '>RS 2200 </h1> <span className='text-white -mt-2 text-sm line-through'>Rs 2500</span>
            <p className='text-white text-sm font-serif'>size: 7</p>
          <button className='buy text-xl ml-72 mt-3 '>Buy</button>
        </div>
        </div>
        <div className='card '>
          <img src="images/poster1 2.jpg" alt="" className=' rounded-md relative' />
          <div className="intro">
            <h1 className='text-xl text-white font-serif mt-7  '>Step shoes</h1>
            <h1 className='font-serif text-white text-xl '>RS 1800 </h1> <span className='text-white -mt-2 text-sm line-through'>Rs 2500</span>
            <p className='text-white text-sm font-serif'>size: 8</p>
          <button className='buy text-xl ml-72 mt-3 '>Buy</button>
        </div>
        </div>
        <div className='card '>
          <img src="images/prodect2.jpg" alt="" className=' rounded-md relative' />
          <div className="intro">
            <h1 className='text-xl text-white font-serif mt-7  '>Step shoes</h1>
            <h1 className='font-serif text-white text-xl '>RS 1800 </h1> <span className='text-white -mt-2 text-sm line-through'>Rs 2500</span>
            <p className='text-white text-sm font-serif'>size: 7</p>
          <button className='buy text-xl ml-72 mt-3 '>Buy</button>
        </div>
        </div>
        <div className='card '>
          <img src="images/prodect2.jpg" alt="" className=' rounded-md relative' />
          
          <div className="intro">
            <h1 className='text-xl text-white font-serif mt-7  '>Step shoes</h1>
            <h1 className='font-serif text-white text-xl '>RS 1800 </h1> <span className='text-white -mt-2 text-sm line-through'>Rs 2500</span>
            <p className='text-white text-sm font-serif'>size: 6</p>
          <button className='buy text-xl ml-72 mt-3 '>Buy</button>
        </div>
        </div>

      </div>

        <div className='flex items-center justify-center mt-7'>
        <button className='seemore text-lg bg-slate-500 h-10  text-neutral-100 font-medium px-4 rounded-lg'>See more</button>
        </div>

      
        <footer className="footer bg-gray-500 mt-10  text-white">
      <div className="container mx-auto px-4 py-8 font-serif flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold">StepNest</h2>
          <p className="mt-2 font-mono ">Step into comfort with StepNest shoes, crafted for every occasion.</p>
        </div>

        <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
          <h3 className="text-lg font-serif font-medium mb-2">Quick Links</h3>
          <ul className="space-y-2 ">
            <li><a href="#" className="font-serif hover:underline">Home</a></li>
            <li><Link to="/about"  className=" font-serif hover:underline"> About</Link></li>
            {/* <li><a href="#" className=" font-serif hover:underline">Contact</a></li> */}
            <li><Link to="/policy"  className=" font-serif hover:underline"> Privacy Policy </Link></li>
          </ul>
        </div>

        <div className="w-full md:w-1/3 text-center md:text-right">
  <h3 className="text-lg font-medium mb-2">Follow Us</h3>
  <div className="flex justify-center md:justify-end space-x-4">
    <a href="#" className="text-white hover:text-gray-300 social-icon">
      <i className="fa fa-facebook-f"></i>
    </a>
    <a href="#" className="text-white hover:text-gray-300 social-icon">
      <i className="fa fa-twitter"></i>
    </a>
    <a href="#" className="text-white hover:text-gray-300 social-icon">
      <i className="fa fa-instagram"></i>
    </a>
    <a href="#" className="text-white hover:text-gray-300 social-icon">
      <i className="fa fa-linkedin"></i>
    </a>
  </div>
        </div>
      </div>
      <div className="text-center py-4 bg-gray-700">
        <p>&copy; 2024 StepNest. All rights reserved.</p>
      </div>
    </footer>
  </div>
  );
}

export default Nav;
