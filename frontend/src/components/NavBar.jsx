import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userRole } from '../redux/userReducer/actions';
import axios from 'axios';
import { host } from '../host';

const navData = [
    {
        href: '/customer',
        title: "Customers",
    },
    {
        href: '/products',
        title: "Products",
        isCustomer: true
    },
    {
        href: '/analysis',
        title: "Analysis",
    },
    {
        href: '/order',
        title: "Order List",
        isCustomer: true
    },
];

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false); // State for controlling nav visibility
    const role = useSelector((state) => state.userRole);
    const dispatch = useDispatch();
    const { user } = useUser();

    useEffect(() => {
        if (!!user?.id) {
            axios.get(`${host}/api/user/getUser`, {
                params: { id: user?.id },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    dispatch(userRole({ role: response.data.role, userID: user?.id }));
                })
                .catch(error => {
                    console.error('Error fetching user:', error.response || error.message);
                });
        }
    }, [user]);


    return (
        <nav className="bg-white w-full border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-2xl  mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-semibold text-gray-800">
                            AI Feedback App
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {role && (
                            navData
                                .filter(item => {
                                    // Show all items for admin role
                                    if (role === 'admin') {
                                        return true;
                                    }
                                    // For customer role, only show items where isCustomer is true
                                    return item.isCustomer === true && role === 'customer';
                                })
                                .map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        {item.title}
                                    </Link>
                                ))
                        )}

                    </div>

                    {/* Authentication Buttons */}
                    <div className="flex items-center">
                        <SignedOut>
                            <SignInButton className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition-all" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition-all" />
                        </SignedIn>

                        {
                            role && (<div className="md:hidden mx-2 my-2">
                                <button
                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>)
                        }
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Only visible on smaller screens */}
            {isNavOpen && (
                <div className="md:hidden">
                    <div className="px-2 sm:px-3">
                        {role && (navData
                            .filter(item => {
                                if (role === 'admin') return true;
                                return item.isCustomer === true && role === 'customer';
                            })
                            .map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="block text-right text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    {item.title}
                                </Link>
                            )))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
