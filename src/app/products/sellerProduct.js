'use client'

import React, { useState, useRef, useEffect } from 'react';
import ExpandableOptions from '../../components/ExpandingComponent/ExpandableOptions';
import "../../app/globals.css";
import ColorStripPattern from "../../components/offerComponent/ColorStripPattern";
import PopUpMessage from '@/components/PopUp/PopUpMessage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ErrorComponent from '@/components/form/formError';
import UserForm from '@/components/form/userForm';

const SellerProduct = () => {
    const optionRefs = useRef({});
    const [selectedOption, setSelectedOption] = useState(null);
    const email = useSelector((state) => state.user.email);
    const [showError, setShowErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState({ show: false, messageArray: [] });

    const [addMoreMode, setAddMoreMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [products, setproducts] = useState([ ])

    const initialEditFormData = {
        fields: [
            { name: 'name', label:'Name', type: 'text', placeholder: 'Enter product name', value: selectedOption?.name},
            { name: 'category', label:'Category', type: 'text', placeholder: 'Enter product category', value: selectedOption?.category },
            { name: 'description', label:'Description', type: 'text', placeholder: 'Enter item description', value: selectedOption?.description },
            { name: 'price', label:'Name', Price: 'text', placeholder: 'Enter product price', value: selectedOption?.price },
            { name: 'discount', label:'Discount', type: 'text', placeholder: 'Enter product discount', value: selectedOption?.discount }
        ],
    };
    const initialAddFormData = {
        fields: [
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter product name' },
            { label: 'Category', name: 'category', type: 'text', placeholder: 'Enter product category' },
            { label: 'Description', name: 'description', type: 'text', placeholder: 'Enter item description' },
            { label: 'Price', name: 'price', type: 'text', placeholder: 'Enter product price' },
            { label: 'Discount', name: 'discount', type: 'text', placeholder: 'Enter product discount' }
        ], key: selectedOption?.id
    };
    const validateUserUpdateForm = (formData) => {
        let tempErrors = {};
        tempErrors.name = formData.name ? '' : 'Name is required';
        tempErrors.category = formData.category ? '' : 'category is required';
        tempErrors.price = formData.price ? '' : 'price is required';
        const errors = Object.entries(tempErrors).filter(([key, value]) => value !== "");
        // The result will be an array of key-value pairs (tuples) where value is the error message
        return  Object.fromEntries(errors);;
    };

    useEffect(() => {
        handleSellerProducts();
    }, []);

    const handleEditProduct = async (formData) => {
        
        if(!selectedOption){
            setErrors({})
        }
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const response = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/product/update/${selectedOption.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: JSON.stringify(formData),
            });
            if (response.status!=200) throw new Error('Error updating product');
            setShowPopup({ show: true, messageArray: ["Edited", "Edited item Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            setEditMode(false);
            router.push('/products');
        } catch (error) {
            setEditMode(false);
           alert(error);
        }
    };
    const handleAddProducts = async () => {
        setAddMoreMode(true);
    };

    const addModeProduct = async (formData) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        try {
            const response = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: JSON.stringify(formData),
            });
            if (response.status!=200) throw new Error('Error adding product');
            setShowPopup({ show: true, messageArray: ["Added Iten", "Added item Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            setAddMoreMode(false);
            router.push('/products');
        } catch (error) {
            setAddMoreMode(false);
            alert(error);
        }
    }

    

    const onSave = () => {
        setEditMode(false);
        handleSellerProducts(); // Refresh currentUser data
    };


    const handleEdit = () => {
        if (selectedOption) {
            setEditMode(true);
        } else {
            setErrors({name:"Can edit one at a time for now"})
        }
    };
    const handleDelete = async () => {
        if (selectedOption) {
            try {
                const token = localStorage.getItem('token'); 
                await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/product/delete/${selectedOption?.id}`,{
                    headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});
                setShowPopup({ show: true, messageArray: ["Deleted", "Deleted item Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            } catch (error) {
                alert(error);
            }

        } else {
            setErrors("Select Atleast one to delete")
        }
    };
    // theis fucntion will handle the vales of the product it chose
    const handleOptionChange = async (key, product) => {
        setSelectedOption(product);
        optionRefs.current[key]?.focus();  // This line focuses on the expanded component
    };

    const handleSellerProducts = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/product/`, {
                headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
            setproducts(response.data);
            alert('Product fetch successfully');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            {products ? (
                <>  
                    
                    {(errors && showError !== false) && <ErrorComponent> error = {errors}</ErrorComponent>}
                    {!(editMode === true || addMoreMode === true) ? (
                        <div className="flex flex-col p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
                            <h2 className="font-inter text-center text-red-500 font-bold mb-6 text-3xl">Your Products</h2>
                            <div className=" flex flex-col font-inter ">
                                {products.map((product) => (
                                    <div key={product?.id}
                                        className={`border rounded-xl  min-w-full flex-1 my-2 overflow-hidden ${selectedOption?.id === product?.id ? 'border-green-500' : ''} `}>
                                        <div
                                            className={`flex flex-row flex-1 transition-max-height duration-300 ease-in-out ${selectedOption?.id === product?.id ? 'h-60' : 'h-24'} `}
                                            onClick={() => handleOptionChange(product?.id, product)}
                                        >
                                            {selectedOption?.id !== product?.id && <ColorStripPattern discount={product?.discount} />}
                                            <div className={`flex w-full flex-row item-center ${selectedOption?.id === product?.id ? "bg-green-50" : ""}`}>
                                                <div className={`custom-checkbox ml-4 flex flex-row pt-4 cursor-pointer ${selectedOption?.id !== product?.id ? "items-center" : "pt-8"}`} >
                                                    <name>
                                                        <input
                                                            type="checkbox"
                                                            name="product"
                                                            className="mr-2"
                                                            onChange={() => handleOptionChange(product?.id, product)}
                                                            checked={selectedOption?.id === product?.id}
                                                        />
                                                    </name>
                                                </div>
                                                <div className='flex flex-col py-4 ml-4 justify-center '>
                                                    <div className='flex flex-row'>
                                                        <span className=" text-center my-auto max-w-max ">{product?.name}</span>
                                                        {selectedOption?.id === product?.id && <span className="mx-1 my-auto bg-green-500 text-white px-1 max-w-max text-sm">
                                                            {product?.discount}% Off
                                                        </span>
                                                        }
                                                    </div>
                                                    <div className='flex flex-row '>
                                                        {selectedOption?.id === product?.id &&
                                                            <p id="offer-price" className='p-2 text-xl font-bold'>
                                                                Rs.{product?.price-(product?.price * product?.discount) / 100}
                                                            </p>
                                                        }
                                                        <p id="actual-price" className={`p-2 ${selectedOption?.id === product?.id ? 'text-xs font-bold text-gray-500 line-through' : 'text-sm font-bold'}`}>
                                                            Rs.{product?.price}
                                                        </p>
                                                    </div>

                                                    {selectedOption?.id === product?.id && <ExpandableOptions description={product.description} category={product.category} ref={(el) => (optionRefs.current[selectedOption?.id] = el)} />}
                                                </div>
                                                {(product?.id === 1) &&
                                                    <div className={`font-inter mt-6 items-center`} style={selectedOption?.id !== 1 ? { margin: "auto" } : {}}>
                                                        <p className={`text-custom-baby-pink font-semibold text-sm ${selectedOption?.id === product?.id ? 'text-green-500' : ''}`} style={{ float: "left" }}>Most Popular</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                ))}
                                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg w-full" onClick={() => { handleAddProducts() }}>Add More</button>
                            </div>

                            {selectedOption &&
                                <div className="font-inter mt-6 ">
                                    <div className="flex flex-row font-inter">

                                        <button className="mt-4 bg-blue-500 text-white mr-4 px-2 px-4 rounded-lg w-full"
                                            onClick={() => { handleEdit() }}>Edit</button>
                                        <button className="mt-4 bg-red-700 text-white ml-4 py-2 px-4 rounded-lg w-full" onClick={() => { handleDelete() }}>Delete</button>
                                    </div>
                                    <h4 id="promotion-tag-line" className='space-2 p-1 mt-4 text-center'>Powered by <span id="promotion-brand-name" className=" text-custom-baby-pink">Ashutosh</span></h4>
                                </div>
                            }
                        </div>
                    ) :
                        (editMode === true) ? (
                            <UserForm
                                formName={"Edit Products"}
                                initialFormData={initialEditFormData}
                                onSubmit={handleEditProduct}
                                validationSchema={validateUserUpdateForm}
                            />
                        ) : (
                            <UserForm
                                formName={"Add Products"}
                                initialFormData={initialAddFormData}
                                onSubmit={addModeProduct}
                                validationSchema={validateUserUpdateForm}
                            />
                        )
                    }
                    {showPopup.show === true && <PopUpMessage messageArray={showPopup.messageArray} />}
                </>
            ) : (
                <p> no products to show</p>
            )
            }
        </>
    );
};

export default SellerProduct;
