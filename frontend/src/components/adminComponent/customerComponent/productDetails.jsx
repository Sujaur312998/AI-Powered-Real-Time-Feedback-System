import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { host } from '../../../host';
import Loader from '../../Loader';

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve the dynamic 'id' from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // Controls feedback form visibility
  const [feedback, setFeedback] = useState(''); // Feedback from customer
  const [orderSubmitted, setOrderSubmitted] = useState(false); // Order submission state

  useEffect(() => {
    // Fetch product details by ID
    axios.get(`${host}/api/product/productDetails`, { params: { _id: id } })
      .then(response => {
        setLoading(false);
        setProduct(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleOrderClick = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Handle feedback submission, e.g., send it to a server or just log it for now
    console.log({ productId: id, feedback });
    setOrderSubmitted(true);
    setShowFeedbackForm(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-lg mb-4">Price: {product.price} ₹</p>

      {!orderSubmitted && (
        <button
          onClick={handleOrderClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Order Now
        </button>
      )}

      {orderSubmitted && <p className="text-green-500 font-semibold">Order submitted successfully! Thank you for your feedback.</p>}

      {showFeedbackForm && (
        <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
          <form onSubmit={handleSubmitFeedback}>
            <div className="mb-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

