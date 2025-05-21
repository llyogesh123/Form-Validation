import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

// Mock data for countries and cities
const countriesData = {
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad','Rajasthan'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol', 'Leeds', 'Sheffield'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra']
};

// Country codes
const countryCodes = {
  'India': '+91',
  'United States': '+1',
  'United Kingdom': '+44',
  'Canada': '+1',
  'Australia': '+61'
};

const App = () => {
  const [currentView, setCurrentView] = useState('form'); // 'form' or 'success'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? 'Must be at least 2 characters' : '';
      
      case 'username':
        return value.trim().length < 3 ? 'Must be at least 3 characters' : 
               !/^[a-zA-Z0-9_]+$/.test(value) ? 'Only letters, numbers, and underscores allowed' : '';
      
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      
      case 'password':
        return value.length < 8 ? 'Must be at least 8 characters' :
               !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) ? 'Must contain uppercase, lowercase, and number' : '';
      
      case 'phoneNumber':
        return !/^\d{10}$/.test(value) ? 'Must be 10 digits' : '';
      
      case 'country':
        return !value ? 'Please select a country' : '';
      
      case 'city':
        return !value ? 'Please select a city' : '';
      
      case 'panNumber':
        return !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'Invalid PAN format (e.g., ABCDE1234F)' : '';
      
      case 'aadharNumber':
        return !/^\d{12}$/.test(value) ? 'Must be 12 digits' : '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset city when country changes
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
    }

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    const requiredFields = Object.keys(formData);
    
    // Check if all fields are filled
    const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');
    
    // Check if there are no errors
    const noErrors = Object.values(errors).every(error => error === '');
    
    // Validate all fields
    const allFieldsValid = requiredFields.every(field => validateField(field, formData[field]) === '');
    
    return allFieldsFilled && noErrors && allFieldsValid;
  };

  const handleSubmit = () => {
    // Touch all fields and validate
    const newTouched = {};
    const newErrors = {};
    
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, formData[field]);
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    if (isFormValid()) {
      setCurrentView('success');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      country: '',
      city: '',
      panNumber: '',
      aadharNumber: ''
    });
    setErrors({});
    setTouched({});
    setCurrentView('form');
  };

  if (currentView === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Registration Successful!</h2>
            <p className="mt-2 text-sm text-gray-600">Your details have been submitted successfully.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className="mt-1 text-sm text-gray-900">{formData.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <p className="mt-1 text-sm text-gray-900">{formData.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="mt-1 text-sm text-gray-900">{formData.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="mt-1 text-sm text-gray-900">
                  {countryCodes[formData.country]} {formData.phoneNumber}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Country</label>
                <p className="mt-1 text-sm text-gray-900">{formData.country}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">City</label>
                <p className="mt-1 text-sm text-gray-900">{formData.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">PAN Number</label>
                <p className="mt-1 text-sm text-gray-900">{formData.panNumber}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Aadhar Number</label>
                <p className="mt-1 text-sm text-gray-900">{formData.aadharNumber}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={resetForm}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Submit Another Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Registration Form</h2>
          <p className="mt-2 text-sm text-gray-600">Please fill in all the required fields</p>
        </div>
        
        <div className="space-y-6">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.firstName && touched.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && touched.firstName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.firstName}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.lastName && touched.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && touched.lastName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                errors.username && touched.username ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter username"
            />
            {errors.username && touched.username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="h-4 w-4 mr-1" />
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                errors.email && touched.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.password && touched.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <div className="flex">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-32 px-3 py-2 border rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.country && touched.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Code</option>
                {Object.entries(countryCodes).map(([country, code]) => (
                  <option key={country} value={country}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border-l-0 border rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.phoneNumber && touched.phoneNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
            </div>
            {(errors.phoneNumber && touched.phoneNumber) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="h-4 w-4 mr-1" />
                {errors.phoneNumber}
              </p>
            )}
            {(errors.country && touched.country) && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="h-4 w-4 mr-1" />
                {errors.country}
              </p>
            )}
          </div>

          {/* Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country *
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.country && touched.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                {Object.keys(countriesData).map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && touched.country && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.country}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={!formData.country}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.city && touched.city ? 'border-red-300' : 'border-gray-300'
                } ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              >
                <option value="">Select city</option>
                {formData.country && countriesData[formData.country]?.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && touched.city && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.city}
                </p>
              )}
            </div>
          </div>

          {/* PAN and Aadhar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                PAN Number *
              </label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.panNumber && touched.panNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="ABCDE1234F"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.panNumber && touched.panNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.panNumber}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                Aadhar Number *
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                  errors.aadharNumber && touched.aadharNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="123456789012"
              />
              {errors.aadharNumber && touched.aadharNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <X className="h-4 w-4 mr-1" />
                  {errors.aadharNumber}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                isFormValid() 
                  ? 'bg-indigo-600 hover:bg-indigo-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isFormValid() ? 'Submit Registration' : 'Please fill all required fields'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;