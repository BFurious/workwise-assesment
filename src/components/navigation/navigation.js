'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/actions/userActions';
const NavigationBar = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        router.push('/login');
    };


    return (
        <div className={`bg-gray-800 text-white flex justify-between items-center p-4 sticky top-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="text-xl font-bold">
                <a href="/">MyApp</a> {/* Link to the homepage */}
            </div>
            <div>
                <a href="/profile" className="flex items-center">
                    <button
                        className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
                    >
                        Profile
                    </button>

                </a>
            </div>
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 w-full"
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default NavigationBar;
