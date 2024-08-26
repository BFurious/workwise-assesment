'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';


const BuyerDashBoard = () => {
    const router = useRouter();
    const emailId = useSelector((state)=>{state.user.email})
    const handleShowProducts = async () => {
        router.push('/products');
    };

    const handleCartProducts = async () => {
        router.push('/myCart');
             };


    return (
        <div className="p-4">
            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={handleShowProducts}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
                >
                    Go To Shop
                </button>

                <button
                    onClick={handleCartProducts}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 w-full"
                >
                    Show Cart
                </button>
            </div>

        </div>
    )
}
export default BuyerDashBoard;