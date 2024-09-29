import React, { useState } from 'react';
import { useAuth } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(userData).then(() => navigate('/dashboard'));  // Navigate to dashboard after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full  rounded-md shadow-sm p-2 sm:text-sm"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block p-2 w-full rounded-md shadow-sm   sm:text-sm"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>

        {/* Signup Redirect Button */}
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
      {loading ? <Loader /> : ""}
    </div>
  );
};

export default LoginPage;
