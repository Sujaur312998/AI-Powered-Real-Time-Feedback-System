import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const navData = [
    {
        href: '/',
        title: "Upload Fonts"
    },
    {
        href: '/create_group',
        title: "Create Group"
    },
    {
        href: '/font_groups',
        title: "Font Groups"
    },
];

const Navbar = () => {
    return (
        <nav className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 h-20 text-white shadow-lg flex justify-between items-center px-6">
            <span className='text-3xl font-bold '>AI Feedback App</span>
            <ul className="flex items-center  text-lg font-semibold gap-8 h-full">
                {navData.map((item, index) => (
                    <Link to={item.href} key={index}>
                        <li className="transition-transform transform hover:text-yellow-400 cursor-pointer p-2 rounded-md hover:bg-white hover:bg-opacity-10">
                            {item.title}
                        </li>
                    </Link>
                ))}
            </ul>
            <button className='mr-5'>
                <SignedOut>
                    <SignInButton className="bg-yellow-400 text-black px-4 py-2 rounded-md transition-all hover:bg-yellow-300" />
                </SignedOut>
                <SignedIn>
                    <UserButton className="bg-yellow-400 text-black px-4 py-2 rounded-md transition-all hover:bg-yellow-300 " />
                </SignedIn>
            </button>
        </nav>
    );
}

export default Navbar;
