'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        role: 'Seller',
    });
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNavigate = (path) => {
        router.push(path);
    };
    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formData.name ? '' : 'Name is required';
        tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid';
        tempErrors.phone_number = formData.phone_number ? '' : 'Phone number is required';
        tempErrors.password = formData.password.length > 5 ? '' : 'Password must be at least 6 characters long';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,{
                    method:"POST",
                    data: formData
                });
                alert('User registered successfully');
                handleNavigate('/login');
            } catch (err) {
                console.error(err);
                alert('Error registering user');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded border-gray-300"
                        >
                            <option value="Seller">Seller</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                    </div>
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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 19.5c4.5 0 8.5-3.5 8.5-8s-4-8-8.5-8c-1.7 0-3.3.5-4.7 1.5L4.4 4.4A11.7 11.7 0 002.5 12c0 6.5 5.5 12 12 12 2 0 4-0.5 5.7-1.4l-1.5-1.5C15.3 21.3 14.7 21 14 21c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1 0 1.8.4 2.5 1L18 12.5c-1.4-1.4-2.9-2.5-4.5-2.5-3.5 0-6.5 2.9-6.5 6.5s3 6.5 6.5 6.5z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 3c6.6 0 12 6 12 12s-5.4 12-12 12c-6.6 0-12-6-12-12S5.4 3 12 3zm0 18c4.4 0 8-4 8-8s-3.6-8-8-8c-4.4 0-8 4-8 8s3.6 8 8 8zm-4-8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                    <p className="text-1xl font-bold mb-6 text-center text-gray-800">Already registered?</p>    
                    <button
                        onClick={() => handleNavigate('/login')}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 m-top:20"
                    >
                        LogIn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
