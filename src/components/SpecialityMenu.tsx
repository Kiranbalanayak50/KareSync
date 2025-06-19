import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu: React.FC = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent drop-shadow-lg mb-1">Find by Speciality</h1>
            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-primary via-blue-600 to-primary rounded-full mb-2"></div>
            <p className="sm:w-1/3 text-center text-base text-gray-600 mb-2">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className="flex sm:justify-center gap-6 pt-7 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 pb-2">
                {specialityData.map((item, index) => (
                    <Link onClick={() => scrollTo(0, 0)} key={item.speciality} className="flex flex-col items-center text-base font-semibold cursor-pointer flex-shrink-0 bg-white border-2 border-blue-100 rounded-2xl shadow-md p-4 w-28 sm:w-36 hover:shadow-xl hover:bg-gradient-to-br hover:from-primary hover:to-blue-600 hover:text-white hover:scale-105 transition-all duration-300" to={`/doctors/${item.speciality}`}>
                        <img className="w-16 sm:w-20 mb-3 rounded-full border-2 border-primary shadow" src={item.image} alt="" />
                        <p className="mt-1">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu