import React from 'react'
import { assets } from '../assets/assets'

const Contact: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen pb-10">
      <div className='text-center pt-12'>
        <h2 className='text-3xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent drop-shadow-lg mb-1 inline-block'>CONTACT <span className='text-gray-700 font-black'>US</span></h2>
        <div className="mx-auto w-20 h-1 bg-gradient-to-r from-primary via-blue-600 to-primary rounded-full mb-8"></div>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-base max-w-4xl mx-auto'>
        <img className='w-full md:max-w-[360px] rounded-2xl shadow-xl border-4 border-white' src={assets.contact_image} alt="Contact KareSync" />
        <div className='flex flex-col justify-center items-start gap-6 bg-white/90 rounded-2xl shadow-lg p-8 w-full'>
          <p className='font-semibold text-xl text-primary'>OUR OFFICE</p>
          <p className='text-gray-600'><span className='font-semibold'>Address:</span> National Institute of Technology, Rourkela</p>
          <p className='text-gray-600 flex items-center gap-2'><span className='font-semibold'>Tel:</span> <span className='text-blue-600'>(415) 555-0132</span></p>
          <p className='text-gray-600 flex items-center gap-2'><span className='font-semibold'>Email:</span> <span className='text-blue-600'>Kiranbnayak.050@gmail.com</span></p>
          <p className='font-semibold text-lg text-primary mt-4'>Careers at KareSync</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-3 rounded-full text-base font-semibold shadow hover:scale-105 transition-all duration-300'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact