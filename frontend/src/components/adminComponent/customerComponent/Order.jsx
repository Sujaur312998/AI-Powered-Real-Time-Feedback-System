import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { host } from '../../../host';
import Loader from '../../Loader';
import { useNavigate } from "react-router-dom";

const Order = () => {
    const { userID } = useSelector(state => state); // Get the userID from the Redux store
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userID) return;
        axios.get(`${host}/api/order/getOrder`, {
            params: { userID }
        })
            .then(res => {
                setOrders(res.data.orders);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError('Failed to fetch orders');
                setLoading(false);
            });
    }, [userID]);

    if (loading) return <Loader />
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left border-b">Product Name</th>
                            <th className="px-4 py-2 text-left border-b">Description</th>
                            <th className="px-4 py-2 text-left border-b">Price (₹)</th>
                            <th className="px-4 py-2 text-left border-b">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td className="px-4 py-2 border-b">{order.productId.productName}</td>
                                    <td className="px-4 py-2 border-b">{order.productId.description}</td>
                                    <td className="px-4 py-2 border-b">{order.productId.price}</td>
                                    <td onClick={()=>navigate(`/productdetails/${order.productId._id}/${order._id}`)} className="py-2 cursor-pointer"> Review</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Order;
