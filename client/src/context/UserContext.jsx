import React, { createContext, useContext, useEffect, useState } from 'react';
import { Axios } from '../utils/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

// 2. Create Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const {data} = await Axios.get('/');
                setUser(data.user); 
            } catch (error) {
                toast.warn(err.response?.data?.message || 'please login');
                setUser(null);
                navigate('/login');
            }
        };

        if (!user) checkAuthentication();
    }, [navigate]);

    // Signup function
    const signup = async (userData) => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/signup', userData);
            console.log(data)
            setUser(data.user);
            toast.success("Signup successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Signup failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (userData) => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/signin', userData);
            setUser(data.user);
            toast.success("Signin successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const signout = async () => {
        try {
            setLoading(true);
            await Axios.post('/signout');
            setUser(null);
            toast.success("sucessfully signout!")
            navigate("/login");
        } catch (err) {
            toast.warn("Signout failed!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, signout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
