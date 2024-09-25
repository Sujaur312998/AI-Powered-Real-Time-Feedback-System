import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; 

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Welcome to AI Feedback App
            </h1>
            <p className="text-gray-600 text-lg">
                Give us Feedback to make product better
            </p>
        </header>

        <section className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hello, {user ? user?.fullName : "User!"}</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
                Explore the platform and enjoy our services to simplify your life.
                We're here to assist you anytime you need.
            </p>
            <button 
            className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all"
            onClick={()=>navigate("/products")}
            >
                Get Started
            </button>
        </section>
    </div>
    );
}

export default Home
