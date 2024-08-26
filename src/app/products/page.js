'use client'
import React from 'react';
import "../../app/globals.css"
import StoreProduct from './storeProducts';
import SellerProduct from './sellerProduct';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/navigation/navigation';

const ProductOptions = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const role = useSelector((state) => state.user.role);
    const router = useRouter();

    return (
        <>
            {isLoggedIn === true ? (<>
                <NavigationBar />
                {role === "Buyer" ? <StoreProduct /> : <SellerProduct />}
            </>) :
                router.push({
                    pathname: "/login", query: {
                        message: "please register or login to access"
                    }
                })
            }
        </>
    );
};

export default ProductOptions;
