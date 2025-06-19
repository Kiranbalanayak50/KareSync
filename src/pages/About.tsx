import React from 'react'
import { assets } from '../assets/assets'

const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen pb-10">
      <div className='text-center pt-12'>
        <p className='text-3xl font-extrabold tracking-wide bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow'>ABOUT <span className='text-gray-700 font-black'>US</span></p>
      </div>
      <div className='my-14 flex flex-col md:flex-row gap-12 items-center justify-center'>
        <img className='w-full md:max-w-[380px] rounded-2xl shadow-xl border-4 border-white' src={assets.about_image} alt="About KareSync" />
        <div className='flex flex-col justify-center gap-8 md:w-2/4 text-lg text-gray-700 bg-white/80 rounded-2xl shadow-lg p-8'>
          <p className='font-medium'>Welcome to <span className='text-primary font-bold'>KareSync</span>, your trusted platform for easy, reliable, and secure doctor appointments.</p>
          <p>We are dedicated to making healthcare more accessible by connecting patients with experienced and compassionate doctors across various specialties. Whether you're booking a routine checkup or seeking expert medical advice, our goal is to simplify the process and ensure you get the care you need—when you need it.</p>
          <ul className='list-disc list-inside pl-2 text-base text-gray-600'>
            <li>Browse verified doctors and their specialties</li>
            <li>View consultation fees and availability</li>
            <li>Book in-person or online appointments instantly</li>
            <li>Receive appointment reminders and follow-up support</li>
          </ul>
          <p>Our network includes certified professionals in general medicine, pediatrics, gynecology, dermatology, mental health, and more. All consultations are handled with utmost privacy and professionalism.<br/>We're here to support your well-being—one appointment at a time.<br/><span className='font-semibold text-primary'>Your health. Your time. Your choice.</span></p>
        </div>
      </div>
      <div className='text-2xl my-8 text-center font-bold tracking-wide'>
        <span className='bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>WHY CHOOSE US?</span>
      </div>
      <div className='flex flex-col md:flex-row gap-8 md:gap-6 mb-20 items-center justify-center'>
        <div className='border-2 border-primary/30 bg-white rounded-2xl px-10 md:px-14 py-10 sm:py-16 flex flex-col gap-5 text-lg shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-primary hover:via-blue-600 hover:to-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer w-full max-w-xs items-center'>
          <span className='text-3xl mb-2'>⚡</span>
          <b className='text-xl'>EFFICIENCY</b>
          <p className='text-base'>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
        </div>
        <div className='border-2 border-primary/30 bg-white rounded-2xl px-10 md:px-14 py-10 sm:py-16 flex flex-col gap-5 text-lg shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-primary hover:via-blue-600 hover:to-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer w-full max-w-xs items-center'>
          <span className='text-3xl mb-2'>🎯</span>
          <b className='text-xl'>PERSONALISATION</b>
          <p className='text-base'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border-2 border-primary/30 bg-white rounded-2xl px-10 md:px-14 py-10 sm:py-16 flex flex-col gap-5 text-lg shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-primary hover:via-blue-600 hover:to-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer w-full max-w-xs items-center'>
          <span className='text-3xl mb-2'>🕒</span>
          <b className='text-xl'>CONVENIENCE</b>
          <p className='text-base'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About