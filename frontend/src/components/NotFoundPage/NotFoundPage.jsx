import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600">OPS!</h1>
      <p className="text-lg text-gray-700 mt-2">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">Go back to the homepage</Link>
    </div>
  );
};

export default NotFoundPage;