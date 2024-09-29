import React, { useState } from 'react';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

const SignupPage = () => {
  const { signup,loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [focus, setFocus] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setFocus({ ...focus, [field]: true });
  };

  const handleBlur = (field, e) => {
    if (e.target.value === '') {
      setFocus({ ...focus, [field]: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup(formData);

    // Reset form after submission
    setFormData({
      userName: '',
      email: '',
      password: ''
    });

    setFocus({
      userName: false,
      email: false,
      password: false
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* userName Field */}
          <div className="relative mb-6">
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className={`peer w-full p-4 pt-6 bg-transparent border-b-2 outline-none transition-all ease-in-out duration-300 ${focus.userName ? 'border-blue-500' : 'border-gray-300'
                }`}
              onFocus={() => handleFocus('userName')}
              onBlur={(e) => handleBlur('userName', e)}
            />
            <label
              htmlFor="userName"
              className={`absolute left-4 top-4 text-gray-500 transition-all ease-in-out duration-300 peer-focus:top-[-12px] peer-focus:text-blue-500 ${focus.userName ? 'top-[-12px] text-blue-500' : ''
                }`}
            >
              userName
            </label>
          </div>

          {/* Email Field */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`peer w-full p-4 pt-6 bg-transparent border-b-2 outline-none transition-all ease-in-out duration-300 ${focus.email ? 'border-blue-500' : 'border-gray-300'
                }`}
              onFocus={() => handleFocus('email')}
              onBlur={(e) => handleBlur('email', e)}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 top-4 text-gray-500 transition-all ease-in-out duration-300 peer-focus:top-[-12px] peer-focus:text-blue-500 ${focus.email ? 'top-[-12px] text-blue-500' : ''
                }`}
            >
              Email
            </label>
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`peer w-full p-4 pt-6 bg-transparent border-b-2 outline-none transition-all ease-in-out duration-300 ${focus.password ? 'border-blue-500' : 'border-gray-300'
                }`}
              onFocus={() => handleFocus('password')}
              onBlur={(e) => handleBlur('password', e)}
            />
            <label
              htmlFor="password"
              className={`absolute left-4 top-4 text-gray-500 transition-all ease-in-out duration-300 peer-focus:top-[-12px] peer-focus:text-blue-500 ${focus.password ? 'top-[-12px] text-blue-500' : ''
                }`}
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            already an user?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        </form>
      </div>
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default SignupPage;
