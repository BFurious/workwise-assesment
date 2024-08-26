'use client';

import React, { useState } from 'react';
import ErrorComponent from './formError';

const UserForm = ({ formName, initialFormData, onSubmit, validationSchema }) => {
    const [formData, setFormData] = useState(() =>
        initialFormData.fields.reduce((acc, element) => {
            acc[element.name] = element.value || ''; // Use initialFormData if available
            return acc;
        }, {}));
    const [errors, setErrors] = useState({});
    const [showError, setShowErrors] = useState(false);
 
    // Handle form data change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const validationErrors = validationSchema(formData);
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            setShowErrors(true);
            setTimeout(() => {
                setShowErrors(false);
            }, 3000);
            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    // Render form fields dynamically
    const renderField = (field) => {
        const { name, type, placeholder, disabled, options, value, label } = field;
        return type === 'select' ? (
            <div className="mb-6" key={name}>
                <label className="block text-gray-700">{label}</label>
                <select
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded border-gray-300"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {(errors[name]  && showError === true) && <ErrorComponent error = {errors[name]} />}
            </div>
        ) : (
            <div className="mb-4" key={name}>
                <label className="block text-gray-700">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {(errors[name] && showError === true) && <ErrorComponent error = {errors[name]} />}
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{formName}</h2>
                <form onSubmit={handleSubmit}>
                    {initialFormData.fields.map(renderField)}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
