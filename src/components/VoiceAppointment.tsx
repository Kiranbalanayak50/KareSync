import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const VoiceAppointment = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
    patientName: '',
    contactNumber: '',
    symptoms: '',
    preferredLanguage: '',
    insuranceProvider: '',
    previousVisits: '',
    emergency: false,
    preferredGender: '',
    allergies: ''
  });
  const [status, setStatus] = useState('Click the microphone to start booking');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Initialize speech synthesis
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    let recognition = null;
    
    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsProcessing(false);
        setError('');
        speak('I am listening. Please speak clearly.');
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        processVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Error: ${event.error}. Please try again.`);
        speak('Sorry, there was an error. Please try again.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (!isProcessing) {
          speak('Voice recognition ended. Click the microphone to start again.');
        }
      };
    } else {
      setError('Speech recognition is not supported in your browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const processVoiceCommand = (text) => {
    const lowerText = text.toLowerCase();
    let updated = false;

    // Doctor selection
    if (lowerText.includes('doctor') || lowerText.includes('specialist')) {
      const doctorMatch = doctors.find(doctor => 
        lowerText.includes(doctor.name.toLowerCase()) || 
        lowerText.includes(doctor.specialization.toLowerCase())
      );
      if (doctorMatch) {
        setAppointmentDetails(prev => ({ ...prev, doctor: doctorMatch.name }));
        speak(`Selected doctor ${doctorMatch.name}`);
        updated = true;
      }
    }

    // Date selection
    if (lowerText.includes('date') || lowerText.includes('appointment on')) {
      const dateMatch = lowerText.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i);
      if (dateMatch) {
        const [_, day, month] = dateMatch;
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();
        const year = new Date().getFullYear();
        const date = new Date(year, monthIndex, parseInt(day));
        const formattedDate = date.toISOString().split('T')[0];
        setAppointmentDetails(prev => ({ ...prev, date: formattedDate }));
        speak(`Appointment date set to ${month} ${day}`);
        updated = true;
      }
    }

    // Time selection
    if (lowerText.includes('time') || lowerText.includes('at')) {
      const timeMatch = lowerText.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
      if (timeMatch) {
        const [_, hours, minutes = '00', meridiem] = timeMatch;
        let hour = parseInt(hours);
        if (meridiem.toLowerCase() === 'pm' && hour !== 12) hour += 12;
        if (meridiem.toLowerCase() === 'am' && hour === 12) hour = 0;
        const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
        setAppointmentDetails(prev => ({ ...prev, time }));
        speak(`Appointment time set to ${hours}:${minutes} ${meridiem}`);
        updated = true;
      }
    }

    // Patient name
    if (lowerText.includes('my name is') || lowerText.includes('i am')) {
      const nameMatch = lowerText.match(/(?:my name is|i am)\s+([a-zA-Z\s]+)/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        setAppointmentDetails(prev => ({ ...prev, patientName: name }));
        speak(`Name recorded as ${name}`);
        updated = true;
      }
    }

    // Contact number
    if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('number')) {
      const numberMatch = lowerText.match(/\b\d{10}\b/);
      if (numberMatch) {
        const number = numberMatch[0];
        setAppointmentDetails(prev => ({ ...prev, contactNumber: number }));
        speak(`Contact number recorded as ${number}`);
        updated = true;
      }
    }

    // Emergency status
    if (lowerText.includes('emergency')) {
      const isEmergency = !lowerText.includes('not') && !lowerText.includes('no emergency');
      setAppointmentDetails(prev => ({ ...prev, emergency: isEmergency }));
      speak(isEmergency ? 'Marked as emergency appointment' : 'Not marked as emergency');
      updated = true;
    }

    // Symptoms
    if (lowerText.includes('symptoms') || lowerText.includes('suffering from') || lowerText.includes('having')) {
      const symptomsMatch = lowerText.match(/(?:symptoms|suffering from|having)\s+(.+)/i);
      if (symptomsMatch) {
        const symptoms = symptomsMatch[1].trim();
        setAppointmentDetails(prev => ({ ...prev, symptoms }));
        speak(`Symptoms recorded: ${symptoms}`);
        updated = true;
      }
    }

    // Preferred language
    if (lowerText.includes('language') || lowerText.includes('speak')) {
      const languages = ['english', 'spanish', 'french', 'german'];
      const languageMatch = languages.find(lang => lowerText.includes(lang));
      if (languageMatch) {
        const language = languageMatch.charAt(0).toUpperCase() + languageMatch.slice(1);
        setAppointmentDetails(prev => ({ ...prev, preferredLanguage: language }));
        speak(`Preferred language set to ${language}`);
        updated = true;
      }
    }

    // Insurance provider
    if (lowerText.includes('insurance') || lowerText.includes('covered by')) {
      const insuranceMatch = lowerText.match(/(?:insurance|covered by)\s+(.+)/i);
      if (insuranceMatch) {
        const provider = insuranceMatch[1].trim();
        setAppointmentDetails(prev => ({ ...prev, insuranceProvider: provider }));
        speak(`Insurance provider recorded as ${provider}`);
        updated = true;
      }
    }

    // Previous visits
    if (lowerText.includes('visited') || lowerText.includes('previous')) {
      if (lowerText.includes('first time') || lowerText.includes('never visited')) {
        setAppointmentDetails(prev => ({ ...prev, previousVisits: 'First visit' }));
        speak('Marked as first visit');
      } else if (lowerText.includes('regular') || lowerText.includes('frequent')) {
        setAppointmentDetails(prev => ({ ...prev, previousVisits: 'Regular patient' }));
        speak('Marked as regular patient');
      } else {
        setAppointmentDetails(prev => ({ ...prev, previousVisits: 'Visited before' }));
        speak('Marked as previous visitor');
      }
      updated = true;
    }

    // Preferred doctor gender
    if (lowerText.includes('prefer') && (lowerText.includes('doctor') || lowerText.includes('physician'))) {
      if (lowerText.includes('female') || lowerText.includes('woman')) {
        setAppointmentDetails(prev => ({ ...prev, preferredGender: 'Female' }));
        speak('Preferred doctor gender set to female');
      } else if (lowerText.includes('male') || lowerText.includes('man')) {
        setAppointmentDetails(prev => ({ ...prev, preferredGender: 'Male' }));
        speak('Preferred doctor gender set to male');
      }
      updated = true;
    }

    // Allergies
    if (lowerText.includes('allergic') || lowerText.includes('allergy')) {
      const allergyMatch = lowerText.match(/(?:allergic to|allergy to)\s+(.+)/i);
      if (allergyMatch) {
        const allergies = allergyMatch[1].trim();
        setAppointmentDetails(prev => ({ ...prev, allergies }));
        speak(`Allergies recorded: ${allergies}`);
        updated = true;
      }
    }

    // Reason for visit
    if (lowerText.includes('reason') || lowerText.includes('because') || lowerText.includes('visit for')) {
      const reasonMatch = lowerText.match(/(?:reason|because|visit for)\s+(.+)/i);
      if (reasonMatch) {
        const reason = reasonMatch[1].trim();
        setAppointmentDetails(prev => ({ ...prev, reason }));
        speak(`Reason for visit recorded: ${reason}`);
        updated = true;
      }
    }

    if (!updated) {
      speak("I couldn't understand that command. Please try again or use the form fields.");
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.start();
      setIsListening(true);
      setStatus('Listening... Speak now');
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.stop();
      setIsListening(false);
      setStatus('Click the microphone to start booking');
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['doctor', 'date', 'time', 'patientName', 'contactNumber'];
    const missingFields = requiredFields.filter(field => !appointmentDetails[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Show success message
    setShowSuccess(true);
    speak('Appointment booked successfully!');

    // After showing success message, reset the form and hide success message
    setTimeout(() => {
      setShowSuccess(false);
      // Reset all form fields
      setAppointmentDetails({
        doctor: '',
        date: '',
        time: '',
        patientName: '',
        contactNumber: '',
        symptoms: '',
        preferredLanguage: '',
        insuranceProvider: '',
        previousVisits: '',
        emergency: false,
        preferredGender: '',
        allergies: '',
        reason: ''
      });
      // Clear transcript
      setTranscript('');
      // Clear any errors
      setError(null);
      // Show a message that the form is ready for new booking
      speak('Form is ready for new booking');
      setStatus('Ready for new booking');
    }, 3000);
  };

  const clearAll = () => {
    setAppointmentDetails({
      doctor: '',
      date: '',
      time: '',
      reason: '',
      patientName: '',
      contactNumber: '',
      symptoms: '',
      preferredLanguage: '',
      insuranceProvider: '',
      previousVisits: '',
      emergency: false,
      preferredGender: '',
      allergies: ''
    });
    setTranscript('');
    setStatus('All fields cleared. Click the microphone to start booking');
    speak('All fields have been cleared');
  };

  const handleInputChange = (field, value) => {
    setAppointmentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Stylish Header Section */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="bg-gradient-to-r from-primary to-blue-600 px-4 py-2 rounded-lg shadow-lg transform -rotate-1">
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Voice Appointment Booking
              </h1>
            </div>
            <div className="mt-4 bg-white px-6 py-3 rounded-lg shadow-md transform rotate-1">
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                Book your appointment using voice commands or manual input
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="ml-2 text-sm text-gray-600">Voice Assistant Ready</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-sm text-gray-600">Quick & Easy Booking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-primary p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Voice Assistant</h2>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">{status}</p>
              </div>
              <button
                onClick={toggleListening}
                className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-white text-primary'
                } transition-all duration-300 hover:scale-105 self-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 m-3 sm:m-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full mx-4 relative z-10 transform transition-all">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Appointment Booked Successfully!</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    Your appointment has been confirmed. You will be redirected to the appointment page.
                  </p>
                  <div className="animate-pulse">
                    <div className="h-2 w-2 bg-green-500 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6">
            {/* Transcript Section */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Transcript</h3>
                <p className="text-gray-600 italic text-sm sm:text-base">{transcript || 'Speak to see the transcript here...'}</p>
              </div>
            </div>

            {/* Appointment Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Doctor</label>
                    <select
                      value={appointmentDetails.doctor || ''}
                      onChange={(e) => handleInputChange('doctor', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={appointmentDetails.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Time</label>
                    <input
                      type="time"
                      value={appointmentDetails.time || ''}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={appointmentDetails.patientName || ''}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Contact Number</label>
                    <input
                      type="tel"
                      value={appointmentDetails.contactNumber || ''}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter your contact number"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emergency"
                      checked={appointmentDetails.emergency}
                      onChange={(e) => handleInputChange('emergency', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
                      This is an emergency appointment
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Medical Information</h3>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Symptoms</label>
                    <textarea
                      value={appointmentDetails.symptoms || ''}
                      onChange={(e) => handleInputChange('symptoms', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      rows="2"
                      placeholder="Describe your symptoms"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Preferred Language</label>
                    <select
                      value={appointmentDetails.preferredLanguage || ''}
                      onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select language</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Insurance Provider</label>
                    <input
                      type="text"
                      value={appointmentDetails.insuranceProvider || ''}
                      onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Enter insurance provider"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Previous Visits</label>
                    <select
                      value={appointmentDetails.previousVisits || ''}
                      onChange={(e) => handleInputChange('previousVisits', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select option</option>
                      <option value="First visit">First visit</option>
                      <option value="Visited before">Visited before</option>
                      <option value="Regular patient">Regular patient</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Preferred Doctor Gender</label>
                    <select
                      value={appointmentDetails.preferredGender || ''}
                      onChange={(e) => handleInputChange('preferredGender', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">No preference</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Allergies</label>
                    <textarea
                      value={appointmentDetails.allergies || ''}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      rows="2"
                      placeholder="List any allergies"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-500 mb-1">Reason for Visit</label>
                    <textarea
                      value={appointmentDetails.reason || ''}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                      rows="2"
                      placeholder="Describe the reason for your visit"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Command Examples */}
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-3">Voice Command Examples</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "My name is John Smith"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "My contact number is 1234567890"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "I am suffering from fever and cough"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "I prefer to speak in Spanish"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "My insurance is covered by Blue Cross"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "I visited this hospital last month"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "This is an emergency appointment"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "I prefer a female doctor"</p>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-800">• "I am allergic to penicillin"</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showSuccess}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {showSuccess ? 'Booking...' : 'Proceed to Book'}
              </button>
              <button
                onClick={clearAll}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={showSuccess}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAppointment;