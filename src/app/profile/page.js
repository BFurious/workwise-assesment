'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NavigationBar from '@/components/navigation/navigation';
import UserForm from '@/components/form/userForm';
import { setRole, logout } from '@/store/actions/userActions';

const UserInformation = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const email = useSelector((state) => state.user.email);
    const [currentUser, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const initialFormData = {
        fields: [
            { name: 'name', type: 'text', placeholder: 'Enter your name', value: currentUser?.name },
            { name: 'email', type: 'email', placeholder: 'Enter your email', disables: true, value: currentUser?.email , disabled:true},
            { name: 'phone_number', type: 'text', placeholder: 'Enter your phone number', value: currentUser?.phone_number },
            {
                name: 'role', type: 'select', options: [
                    { value: 'Seller', label: 'Seller' },
                    { value: 'Buyer', label: 'Buyer' },
                ], value: currentUser?.role
            }
        ],
    };
    const validateUserUpdateForm = (formData) => {
        let tempErrors = {};
        tempErrors.name = formData.name ? '' : 'Name is required';
        tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Email is not valid';
        tempErrors.phone_number = formData.phone_number ? '' : 'Phone number is required';
        const errors = Object.entries(tempErrors).filter(([key, value]) => value !== "");
        // The result will be an array of key-value pairs (tuples) where value is the error message
        return  Object.fromEntries(errors);;
    };
   

    useEffect(() => {
        if (email) {
            fetchUser(email);
        }
    }, [email]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const onSave = () => {
        setEditMode(false);
        fetchUser(currentUser?.email); // Refresh currentUser data
    };

    const handleUpdateSubmit = async (formData) => {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${currentUser.email}`, formData);
        dispatch(setRole(formData.role));
        alert('User updated successfully');
        onSave();
        router.push('/dashboard');
    };

    const fetchUser = async (emailId) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${emailId}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        useDispatch(logout);
        localStorage.removeItem('token');
        router.push('/login');
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${currentUser.email}`);
            alert('User deleted successfully');
            handleLogout();
        } catch (error) {
            throw error;
        }
    };


    return (
        <>  
            <NavigationBar/>
            <div className="p-4">
                {editMode ? (
                    <UserForm
                        formName="Edit User Data"
                        initialFormData={initialFormData}
                        onSubmit={handleUpdateSubmit}
                        validationSchema={validateUserUpdateForm}
                    />
                ) : (
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Information</h2>
                        <div className="space-y-5">
                            <div className="flex justify-between p-3 border-b border-gray-300">
                                <span className="font-medium text-gray-700 text-left w-1/3">Name:</span>
                                <span className="text-gray-600 text-right w-2/3">{currentUser?.name}</span>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-300">
                                <span className="font-medium text-gray-700 text-left w-1/3">Email:</span>
                                <span className="text-gray-600 text-right w-2/3">{currentUser?.email}</span>
                            </div>
                            <div className="flex justify-between p-3 border-b border-gray-300">
                                <span className="font-medium text-gray-700 text-left w-1/3">Phone Number:</span>
                                <span className="text-gray-600 text-right w-2/3">{currentUser?.phone_number}</span>
                            </div>
                            <div className="flex justify-between p-3">
                                <span className="font-medium text-gray-700 text-left w-1/3">Role:</span>
                                <span className="text-gray-600 text-right w-2/3">{currentUser?.role}</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 space-x-4">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 w-full"
                            >
                                Delete
                            </button>
                           
                        </div>

                    </div>
                )
                }
            </div>
        </>
    );
};

export default UserInformation;
