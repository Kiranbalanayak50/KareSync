import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
}

const TopDoctors: React.FC = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)!;

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Our Top Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Browse through the extensive list of our trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item: Doctor, index: number) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <span className='w-2 h-2 bg-green-500 rounded-full inline-block'></span><span>Available</span>
              </div>
              <p className='text-gray-500 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  );
};

export default TopDoctors;
