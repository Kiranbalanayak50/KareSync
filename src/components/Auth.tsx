import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { assets } from '../assets/assets';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showWelcome, setShowWelcome] = useState(true);

  const handleNewUser = () => {
    setShowWelcome(false);
    setActiveTab('register');
  };

  const handleExistingUser = () => {
    setShowWelcome(false);
    setActiveTab('login');
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Left side - Welcome Content */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-blue-600 p-6 flex flex-col justify-center text-white relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <img src={assets.doctor_icon} alt="Doctor Icon" className="h-10 w-10" />
                  <h2 className="text-3xl font-bold">KareSync</h2>
                </div>
                <p className="text-lg mb-6 opacity-90">Your trusted partner in healthcare management</p>
                
                <div className="space-y-6">
                  {[
                    { icon: assets.calendar_icon, title: "Easy Booking", text: "Book appointments quickly" },
                    { icon: assets.clock_icon, title: "24/7 Access", text: "Doctors available anytime" },
                    { icon: assets.shield_icon, title: "Secure Records", text: "Your data is protected" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <img src={item.icon} alt="" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-base opacity-90">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Welcome Question */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-white">
              <div className="w-full max-w-xs text-center">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to KareSync</h2>
                  <p className="text-sm text-gray-600">Are you a new or existing user?</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleNewUser}
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
                  >
                    I'm a New User
                  </button>
                  <button
                    onClick={handleExistingUser}
                    className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 border border-gray-200"
                  >
                    I'm an Existing User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left side - Welcome Content */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-blue-600 p-6 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 mb-4">
              <img src={assets.doctor_icon} alt="Doctor Icon" className="h-10 w-10" />
              <h2 className="text-3xl font-bold">KareSync</h2>
            </div>
            <p className="text-lg mb-6 opacity-90">Your trusted partner in healthcare management</p>
            
            <div className="space-y-6">
              {[
                { icon: assets.calendar_icon, title: "Easy Booking", text: "Book appointments quickly" },
                { icon: assets.clock_icon, title: "24/7 Access", text: "Doctors available anytime" },
                { icon: assets.shield_icon, title: "Secure Records", text: "Your data is protected" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <img src={item.icon} alt="" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-base opacity-90">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="w-full md:w-1/2 p-6 bg-white">
            <div className="h-full flex flex-col">
              {/* Tab Navigation */}
              <div className="flex border-b mb-4">
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>

              {/* Auth Forms */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-xs mx-auto py-4">
                  {activeTab === 'login' ? <Login /> : <Register />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;  