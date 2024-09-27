import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { host } from '../../host'
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const Customer = () => {
    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(false)
    const {userRole,userID} = useSelector((state) => state);

    useEffect(() => {
        setLoading(true)
        axios.get(`${host}/api/user/getalluser`)
            .then(response => {
                setLoading(false)
                setCustomer(response.data.data);
            })
            .catch(error => {
                console.log(error);

            })
    }, [])

    const handleCustomerList = (item, index) => {
        const list = [...customer]
        list.splice(index, 1, item)
        setCustomer(list)
    }

    const handleRole = (id, role, index) => {
        if (userRole === 'admin') {
            axios.put(`${host}/api/user/updateRole`, { id, role })
                .then(res => {
                    handleCustomerList(res.data.updatedUser, index);
                })
                .catch(error => {
                    console.error('Error updating role:', error.response?.data || error.message);
                    alert('Failed to update user role');
                });
        }
        return
    };
    if(loading) return <Loader />

    return (
        <div className="min-h-screen px-5 py-8 bg-gray-50">
            <div className="flex justify-center"> {/* This flex container will center the table */}
                <div className="overflow-x-auto w-full max-w-4xl"> {/* Ensure the table doesn't exceed the width */}
                    <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium text-gray-600 border-b">ID</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600 border-b">Name</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600 border-b">Email</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600 border-b">Role</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-600 border-b">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customer?.map((item, index) => {
                                    let buttonText;

                                    switch (true) {
                                        case !userID:
                                            buttonText = ""; // If user is not defined
                                            break;
                                        case userID === item.id:
                                            buttonText = ""; // If the user ID matches the item ID
                                            break;
                                        case item.role === 'admin':
                                            buttonText = 'Demote'; // If the item role is 'admin'
                                            break;
                                        default:
                                            buttonText = 'Promote'; // For any other case
                                    }

                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-4 text-sm text-gray-600 border-b">{index + 1}</td>
                                            <td className="p-4 text-sm text-gray-600 border-b">{item.fullName}</td>
                                            <td className="p-4 text-sm text-gray-600 border-b">{item.email}</td>
                                            <td className="p-4 text-sm text-gray-600 border-b">
                                                <span className="py-1 px-3 capitalize rounded-full bg-green-100 text-green-600 text-xs">{item.role}</span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 border-b">
                                                <button
                                                    onClick={() => handleRole(item.id, item.role === 'admin' ? "customer" : 'admin', index)}
                                                    className="text-indigo-500 hover:underline mr-2">
                                                    {/* {user ? user.id===item.id ? "": item.role === 'admin' ? 'Demote' : 'Promot':""} */}
                                                    {buttonText}

                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customer;
