'use client'
import React, { useState, useRef, useEffect } from 'react';
import ExpandableOptions from '../../components/ExpandingComponent/ExpandableOptions';
import "../../app/globals.css";
import ColorStripPattern from "../../components/offerComponent/ColorStripPattern";
import PopUpMessage from '../../components/PopUp/PopUpMessage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/navigation';

const StoreProduct = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const optionRefs = useRef({ });
    const email = useSelector((state) => state.user.email);
    const role = useSelector((state) => state.user.role);
    const [showPopup, setShowPopup] = useState({ show: false, messageArray: [] });
    const [products, setproducts] = useState([]);
    const router =useRouter();
    

    useEffect(() => {
        handleShowProducts(role, email);
    }, []);

    const handleShowCart =()=>{
        router.push("/myCart");
    }
    // theis fucntion will handle the vales of the product it chose
    const handleOptionChange = async (product) => {
        setSelectedOption(product);
        optionRefs.current[product?.id]?.focus();  // This line focuses on the expanded component
    };

    // just to show the confirmation page trigger then the ass to card button is clicked
    const handleAddToCart = async () => {
        // Here you would typically handle adding to the cart logic
        const payload = {
            productId: selectedOption.id,
        }
        if (selectedOption) {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/product/add-cart`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: payload
                });

                if (response.status != 201) 
                    throw new Error('Error updating product');
                
                setShowPopup({ show: true, messageArray: ["Added", "item Added to cart Sucessfully try more"] })
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
                setTimeout(() => setOrderAdded(false), 3000);
            } catch (e) {
                alert(e);
            }
        }
    };

    const handleShowProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            const allItems = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/product/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (allItems.status != 200) 
                throw new Error('Error updating product');
            
            setproducts(allItems.data);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            {products ? (
                <>
                    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
                        <h2 className="font-inter text-center text-custom-baby-pink font-bold mb-6 text-3xl">Buy Product</h2>
                        <div className=" flex flex-col font-inter ">
                            {products.map((product) => (
                                <div key={product?.id}
                                    className={`border rounded-xl  min-w-full flex-1 my-2 overflow-hidden ${selectedOption?.id === product?.id ? 'border-green-500' : ''} `}>
                                    <div
                                        className={`flex flex-row flex-1 transition-max-height duration-300 ease-in-out ${selectedOption?.id === product?.id ? 'h-60' : 'h-24'} `}
                                        onClick={() => handleOptionChange(product)}
                                    >
                                        {selectedOption?.id !== product?.id && <ColorStripPattern discount={product?.discount} />}
                                        <div className={`flex w-full flex-row item-center ${selectedOption?.id === product?.id ? "bg-green-50" : ""}`}>
                                            <div className={`custom-radio ml-4 flex flex-row pt-4 cursor-pointer ${selectedOption?.id !== product?.id ? "items-center" : "pt-8"}`} >
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="product"
                                                        className="mr-2"
                                                        onChange={() => handleOptionChange(product)}
                                                        checked={selectedOption?.id === product?.id}
                                                    />
                                                </label>
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
                                                            Rs.{(product?.price - (product?.price * product?.discount) / 100)?.toFixed(2)}
                                                        </p>
                                                    }
                                                    <p id="actual-price" className={`p-2 ${selectedOption?.id === product?.id ? 'text-xs font-bold text-gray-500 line-through' : 'text-sm font-bold'}`}>
                                                        Rs.{(product?.price)?.toFixed(2)}
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
                        </div>


                        <div className="font-inter mt-6 ">
                            <div className="flex flex-row font-inter">

                                <button className="mt-4 bg-green-500 text-white mr-4 px-2 px-4 rounded-lg w-full"
                                    onClick={() => { handleAddToCart() }}>+ Add To Cart</button>
                                <button className="mt-4 bg-red-700 text-white ml-4 py-2 px-4 rounded-lg w-full" onClick={() => { handleShowCart() }}>See Cart</button>
                            </div>
                            <h4 id="promotion-tag-line" className='space-2 p-1 text-center'>Powered by <span id="promotion-brand-name" className=" text-custom-baby-pink">Ashutosh</span></h4>
                        </div>
                    </div>
                    {showPopup.show === true && <PopUpMessage messageArray={showPopup.messageArray} />}
                </>
            ) : (
                <p> no products to show</p>
            )
            }
        </>
    );
};

export default StoreProduct;
