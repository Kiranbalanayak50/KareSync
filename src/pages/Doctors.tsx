import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {AppContext} from '../context/AppContext'

interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
}

const Doctors: React.FC = () => {
  const {speciality} = useParams<{speciality?: string}>()
  const [filterDoc,setFilterDoc] = useState<Doctor[]>([])
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate()
  
  const {doctors} = useContext(AppContext)!

const applyFilter = ()=>{
  if(speciality){
    setFilterDoc(doctors.filter((doc: Doctor) => doc.speciality === speciality))
  }else{
    setFilterDoc(doctors)
  }
}

useEffect(()=>{
 applyFilter()
},[doctors,speciality])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-10">
      <div className="text-center pt-10">
        <h2 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent drop-shadow-lg mb-3 inline-block">Browse Our Specialists</h2>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-primary via-blue-600 to-primary rounded-full mb-6"></div>
        <p className='text-gray-700 text-lg mb-8'>Find the right doctor for your needs</p>
      </div>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 max-w-7xl mx-auto'>
        <div className={`flex flex-col gap-4 text-base text-gray-700 sm:flex`}>
          {['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map((spec, idx) => (
            <p
              key={spec}
              onClick={()=> speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-4 py-2 pr-16 border-2 rounded-full font-medium cursor-pointer transition-all duration-300 shadow-sm hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:text-white ${speciality === spec ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-primary' : 'border-gray-300 bg-white text-gray-700'}`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            filterDoc.map((item,index) => (
              <div
                onClick={()=>navigate(`/appointment/${item._id}`)}
                className='group border-2 border-blue-200 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-primary bg-white transition-all duration-300'
                key={index}
              >
                <img className='bg-blue-50 w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' src={item.image} alt=""/>
                <div className='p-5'>
                  <div className='flex items-center gap-2 text-sm mb-2'>
                    <span className='w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse'></span>
                    <span className='text-green-600 font-semibold'>Available</span>
                  </div>
                  <p className='text-gray-800 text-lg font-bold'>{item.name}</p>
                  <p className='text-primary text-base font-medium'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors