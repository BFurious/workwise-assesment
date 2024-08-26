'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Updated for Next.js
import { useDispatch } from 'react-redux';
import { setEmail, setLogIn, setRole } from '../../store/actions/userActions'; // Adjust this path if necessary
import PopUpMessage from '@/components/PopUp/PopUpMessage';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPopup, setShowPopup] = useState({});
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const errorMessage = queryParams.get('errorMessage');
        if(errorMessage)
            setShowPopup({ show: true, messageArray: ["Login", "Login Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
    },[]);
    const validate = () => {
        let tempErrors = {};
        tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid';
        tempErrors.password = formData.password.length > 5 ? '' : 'Password must be at least 6 characters long';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, formData);
                localStorage.setItem('token', res.data.token);
                dispatch(setEmail(formData.email));
                dispatch(setRole(res.data.role));
                dispatch(setLogIn({isLoggedIn: true}));
                setShowPopup({ show: true, messageArray: ["Login", "Login Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
                router.push('/dashboard'); // Redirect to the dashboard
            } catch (err) {
                console.error(err);
                alert(`${err.response?.data?.error || 'Login failed'}`);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                    <p className="text-1xl font-bold mb-6 text-center text-gray-800">Not registered?</p>
                    <button
                        type="button"
                        onClick={() => router.push('/register')}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 m-top:20"
                    >
                        Register
                    </button>
                </form>
            </div>
            {showPopup.show === true && <PopUpMessage messageArray={showPopup.messageArray} />}
        </div>
    );
};

export default Login;
