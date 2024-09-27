import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { host } from '../host';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

const ProductDetails = () => {
  const { email, fullName, userID, userRole } = useSelector((state) => state);
  const { p_id, o_id } = useParams(); // Retrieve the dynamic 'id' from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  var socket
  const ENDPOINT = host;
  socket = io(ENDPOINT);

  useEffect(() => {
    if (o_id) {
      setOrderSubmitted(true)
      setShowFeedbackForm(true);
      axios.get(`${host}/api/order/getOrderDetails`, {
        params: { o_id: o_id }
      })
        .then(res => {
          setFeedback(res.data.message.feedback);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [o_id])


  useEffect(() => {
    // Fetch product details by ID
    axios.get(`${host}/api/product/productDetails`, { params: { _id: p_id } })
      .then(response => {
        setLoading(false);
        setProduct(response.data.message);

      })
      .catch(error => {
        setLoading(false)
        console.log(error);
        setLoading(false);
      });
  }, [p_id]);

  const handleOrderClick = () => {
    setLoading(true)
    axios.post(`${host}/api/order/addOrder`, {
      userID: userID,
      productId: p_id
    }).then(res => {
      // console.log(res.data.message);
      setLoading(false)
      setOrderDetails(res.data.message);
      setOrderSubmitted(true)
      setShowFeedbackForm(true);
    }).catch(error => {
      setLoading(false)
      console.log(error);
    })
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Handle feedback submission, e.g., send it to a server or just log it for now
    const data = {
      orderId: o_id || orderDetails._id,
      prompt: `${feedback}. `
    }
    setLoading(true)
    axios.post(`${host}/api/gemini`, { prompt: data.prompt })
      .then(res => {
        data.review = res.data.result
        axios.put(`${host}/api/order/updateOrder`, data)
          .then(res => {
            setLoading(false)
            const data={
              _id:res.data.message._id,
              review:res.data.message.review
            }
            socket.emit("editCustomerFeedback",data);
            setOrderDetails(res.data.message);
            setFeedbackSubmitted(true);
            setShowFeedbackForm(false);
          })
      })
      .catch(error => {
        setLoading(false)
        console.log(error);
      })

  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-4 px-8">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <p className="mb-2 text-sm text-gray-600">{product.description}</p>
      <p className="text-lg mb-4">Price: {product.price} ₹</p>

      {!orderSubmitted && (
        <button
          onClick={handleOrderClick}
          disabled={!!o_id}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Order Now
        </button>
      )}

      {orderSubmitted && !o_id && <p className="text-green-500 font-semibold">Order has been successfully placed. Thank you for your purchase! </p>}
      {feedbackSubmitted && <p className="text-green-500 font-semibold">Thank you for your feedback.</p>}

      {
        showFeedbackForm && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Feedback - {product.productName}</h2>
            <form onSubmit={handleSubmitFeedback}>
              <div className="mb-4">
                <input
                  type="text"
                  value={fullName}
                  disabled
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback here..."
                  required
                  disabled={userRole === 'admin'}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {
                userRole && userRole !== 'admin' && (
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Submit Feedback
                  </button>
                )
              }
            </form>
          </div>
        )}
    </div>
  );
};

export default ProductDetails;
