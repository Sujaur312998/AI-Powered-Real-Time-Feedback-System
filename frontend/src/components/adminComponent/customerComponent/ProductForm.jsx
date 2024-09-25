import React, { useState } from 'react';
import axios from 'axios';
import { host } from '../../../host';

const ProductForm = ({ userRole, userID, setProductList }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRole !== 'admin') return;

    const newProduct = { productName, description, price, addedby: userID };
    setProductList((prev) => [...prev, newProduct]);

    axios.post(`${host}/api/product/addproduct`, newProduct)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });

    // Reset form fields
    setProductName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-black transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
