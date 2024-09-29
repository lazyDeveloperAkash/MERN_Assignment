import React from 'react'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user } = useAuth();
  return (
    <div>
      <ToastContainer position='bottom-left' autoClose={3000}/>
        <Routes>
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    </div>
  )
}

export default App