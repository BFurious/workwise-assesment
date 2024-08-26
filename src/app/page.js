'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use from 'next/navigation' for Next.js 13+

const Home = () => {
    const router = useRouter();
    const token = localStorage.getItem('token'); ; // Replace with your actual selector for token

    useEffect(() => {
        if (token) {
            router.push('/dashboard'); // Redirect to dashboard if logged in
        } else {
            router.push('/login'); // Redirect to login if not logged in
        }
    }, [token, router]);

    return <div>Loading...</div>; // Show a loading indicator while redirecting
};

export default Home;

