'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const SellerDashBoard = () => {
    const router = useRouter();
    const showSellerProducts= ()=>{
        router.push('/products')
    }
    return (
        <div className="p-4">

            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={showSellerProducts}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
                >
                    See Your Products
                </button>
            </div>
        </div>

    )                   

};
export default SellerDashBoard;