import React, { ReactNode } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Auth from './components/Auth'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import VoiceAppointment from './components/VoiceAppointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './components/firebase'

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        {/* Auth Route */}
        <Route path='/auth' element={user ? <Navigate to="/home" /> : <Auth/>}/>
        
        {/* Redirect root to auth if not authenticated */}
        <Route path='/' element={<Navigate to="/auth" />}/>
        
        {/* Protected Home Route */}
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        
        {/* Protected Routes */}
        <Route path='/doctors' element={
          <ProtectedRoute>
            <Doctors/>
          </ProtectedRoute>
        }/>
        <Route path='/doctors/:speciality' element={
          <ProtectedRoute>
            <Doctors/>
          </ProtectedRoute>
        }/>
        <Route path='/about' element={
          <ProtectedRoute>
            <About/>
          </ProtectedRoute>
        }/>
        <Route path='/contact' element={
          <ProtectedRoute>
            <Contact/>
          </ProtectedRoute>
        }/>
        <Route path='/my-profile' element={
          <ProtectedRoute>
            <MyProfile/>
          </ProtectedRoute>
        }/>
        <Route path='/appointment/:docId' element={
          <ProtectedRoute>
            <Appointment/>
          </ProtectedRoute>
        }/>
        <Route path='/my-appointments' element={
          <ProtectedRoute>
            <MyAppointments/>
          </ProtectedRoute>
        }/>
        <Route path='/voice-appointment' element={
          <ProtectedRoute>
            <VoiceAppointment/>
          </ProtectedRoute>
        }/>

        {/* Catch all route - redirect to auth */}
        <Route path='*' element={<Navigate to="/auth" />}/>
      </Routes>
      <ToastContainer/>
      <Footer/>
    </div>
  )
}

export default App