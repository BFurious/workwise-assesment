'use client'
import React, { useState, useRef, useEffect } from 'react';
import ExpandableOptions from '../../components/ExpandingComponent/ExpandableOptions';
import "../globals.css";
import ColorStripPattern from "../../components/offerComponent/ColorStripPattern";
import PopUpMessage from '../../components/PopUp/PopUpMessage';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProductOptions = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const optionRefs = useRef({});
    const [finalAmount, setFinalAmount] = useState(0);
    const [showPopup, setShowPopup] = useState({ show: false, messageArray: [] });
    const [cartProducts, setproducts] = useState([])
    const router = useRouter();

    const isLoggedIn = useSelector((state)=>{state.user.isLoggedIn})

    useEffect(() => {
        if(!isLoggedIn){
            router.push({
                path: "/login", query: {
                    message: "please register or login to access"
                }
            })
        }
        handleShowCartItems();
        if (cartProducts) {
            var amount = 0;
            cartProducts.forEach((cartProduct) => {
                amount += (cartProduct.products.price - (cartProduct.products.price * cartProduct.products.discount)/100) * cartProduct.quantity;
            })
            setFinalAmount(amount);
        }
    }, [cartProducts.length]);

    // theis fucntion will handle the vales of the product it chose
    const handleOptionChange = async (option) => {
        setSelectedOption((op) => { return option });
        optionRefs.current[option?.id]?.focus();  // This line focuses on the expanded component
    };

    const handleShowCartItems = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const cartItems = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/product/cart-items`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setproducts(cartItems.data);
        } catch (error) {
            throw error;
        }
    };


    const handleDeleteItem = async () => {
        if (selectedOption) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/product/${selectedOption?.products?.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setShowPopup({ show: true, messageArray: ["Deleted", "Deleted item Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
                handleShowCartItems();
            } catch (error) {
                alert(error);
            }

        } else {
            setErrors("Select Atleast one to delete")
        }
    };

    const handleCheckout = () => {
        setShowPopup({ show: true, messageArray: ["Order Placed", "Your order will be reached Soon..."] })
    }

    return (
        <>
            {cartProducts ? (
                <>
                    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
                        <h2 className="font-inter text-center text-custom-baby-pink font-bold mb-6 text-3xl">My Cart</h2>
                        <div className=" flex flex-col font-inter ">
                            {cartProducts.map((cartProduct) => (
                                <div key={cartProduct?.products?.id}
                                    className={`border rounded-xl cursor-pointer min-w-full flex-1 my-2 overflow-hidden ${selectedOption?.products?.id === cartProduct?.products?.id ? 'border-green-500' : ''} `}>
                                    <div
                                        className={`flex flex-row flex-1 transition-max-height duration-300 ease-in-out ${selectedOption?.products?.id === cartProduct?.products?.id ? 'h-60' : 'h-24'} `}
                                        onClick={() => handleOptionChange(cartProduct)}
                                    >
                                        {selectedOption?.products?.id !== cartProduct?.products?.id && <ColorStripPattern discount={cartProduct?.products?.discount} />}
                                        <div className={`flex w-full flex-row item-center ${selectedOption?.products?.id === cartProduct?.products?.id ? "bg-green-50" : ""}`}>
                                            <div className={`custom-radio ml-4 flex flex-row pt-4 cursor-pointer ${selectedOption?.products?.id !== cartProduct?.products?.id ? "items-center" : "pt-8"}`} >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="product"
                                                        className="mr-2"
                                                        onChange={() => handleOptionChange(cartProduct)}
                                                        checked={selectedOption?.products?.id === cartProduct?.products?.id}
                                                    />
                                                </label>
                                            </div>
                                            <div className='flex flex-col py-4 ml-4 justify-center '>
                                                <div className='flex flex-row'>
                                                    <span className=" text-center my-auto max-w-max ">{cartProduct?.products?.name}</span>
                                                    {selectedOption?.products?.id === cartProduct?.products?.id && <span className="mx-1 my-auto bg-green-500 text-white px-1 max-w-max text-sm">
                                                        {cartProduct?.products?.discount}% Off
                                                    </span>
                                                    }
                                                </div>
                                                <div className='flex flex-row '>
                                                    {selectedOption?.products?.id === cartProduct?.products?.id &&
                                                        <p id="offer-price" className='p-2 text-xl font-bold'>
                                                            Rs.{cartProduct?.products?.price - (cartProduct?.products?.price * cartProduct?.products?.discount) / 100}
                                                        </p>
                                                    }
                                                    <p id="actual-price" className={`p-2 ${selectedOption?.products?.id === cartProduct?.products?.id ? 'text-xs font-bold text-gray-500 line-through' : 'text-sm font-bold'}`}>
                                                        Rs.{cartProduct?.products?.price}
                                                    </p>
                                                </div>

                                                {selectedOption?.products?.id === cartProduct?.products?.id && <ExpandableOptions description={cartProduct?.products?.description} category={cartProduct?.products?.category} showCart = {1} quantity ={cartProduct.quantity} ref={(el) => (optionRefs.current[selectedOption?.products?.id] = el)} />}
                                            </div>
                                            {(cartProduct?.products?.id === 1) &&
                                                <div className={`font-inter mt-6 items-center`} style={selectedOption?.products?.id !== 1 ? { margin: "auto" } : {}}>
                                                    <p className={`text-custom-baby-pink font-semibold text-sm ${selectedOption?.products?.id === cartProduct?.products?.id ? 'text-green-500' : ''}`} style={{ float: "left" }}>Most Popular</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="flex flex-col font-inter mt-6 ">
                            <div className='font-bold font-inter'>
                                <p>Rs.{finalAmount}</p>
                            </div>
                            <button className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-lg w-full" onClick={() => { router.push("/products") }}>Continue Shopping</button>
                            <div className="flex flex-row flex-1 font-inter">
                                {selectedOption && <button className="mt-4 bg-red-700 text-white mr-4 px-2 px-4 rounded-lg w-full"
                                    onClick={() => { handleDeleteItem() }}>Remove</button>
                                }
                                <button className={`mt-4 bg-green-500 text-white py-2 px-4 rounded-lg w-full ${selectedOption?"ml-4 ":""}`} onClick={() => { handleCheckout() }}>Checkout</button>
                            </div>
                            <h4 id="promotion-tag-line" className='space-2 p-1 text-center'>Powered by <span id="promotion-brand-name" className=" text-custom-baby-pink">Ashutosh</span></h4>
                        </div>
                    </div>
                    {showPopup.show === true && <PopUpMessage messageArray={showPopup.messageArray} />}
                </>
            ) : (
                <P> no products to show</P>
            )
            }
        </>
    );
};

export default ProductOptions;
