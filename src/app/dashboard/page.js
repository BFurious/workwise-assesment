'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import BuyerDashBoard from './buyerDashboard';
import SellerDashBoard from './sellerDashboard';
import NavigationBar from "../../components/navigation/navigation"

const Dashboard = () => {
    const router = useRouter(); 
    const role = useSelector((state) => state.user.role);
    //FUMMY DATA

    return (
        <>
            <NavigationBar/>
            <div className="p-4">
                <div>
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
                            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-200">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Features Available</h2>
                                {role === 'Buyer' ? <BuyerDashBoard /> : <SellerDashBoard />}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Dashboard;
