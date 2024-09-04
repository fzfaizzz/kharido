import React from 'react'
import './newpassword.css'
import { Link } from 'react-router-dom'

function Newpassword() {
  return (
    <div className='bg-[url("/images/newpassword.jpg")] bg-cover w-screen h-screen flex justify-center text-center items-center'>
    <h1 className=' absolute top-6 left-10 text-3xl font-m'>STEPNEST</h1> 
        <div className='logpage h-2/3 w-96  rounded-lg'>
        <h1 className='text-4xl mt-10 text-green-100 font-semibold'>CREATE  PASSWORD</h1>
        <p className='mt-4 -ml-36 font-sans font-medium'>NEW PASSWORD</p>

        <input type="text" placeholder='PASSWORD' className=' rounded-xl w-72 border' />
       <p className='-ml-32 pl-5 mt-6 font-sans font-medium'>CONFIRM PASSWORD</p>
        <input type="text" placeholder='PASSWORD' className=' rounded-xl w-72' />
        <Link to='/newpassword'><button className='bg-gray-500 text-xl font-serif font-bold rounded-xl mt-8 px-6 py-2 text-green-100'>
        <i class="fa fa-lock text-xl text-green-100  "></i>
         Update</button></Link>

    </div>
    </div>
  )
}

export default Newpassword
