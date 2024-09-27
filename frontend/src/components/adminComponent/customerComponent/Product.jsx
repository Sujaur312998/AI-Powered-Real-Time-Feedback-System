import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { host } from '../../../host';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Loader from '../../Loader';

const Product = () => {
  const [loading, setLoading] = useState(true)
  const [productList, setProductList] = useState([]);
  const { userRole, userID } = useSelector((state) => state);

  useEffect(() => {
    if (!userID) return;
    axios.get(`${host}/api/product/getProducts`, {
      params: { addedby: userID },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setLoading(false)
        setProductList(response.data);
      })
      .catch(error => {
        setLoading(false)
        console.error(error);
      });
  }, [userID]);

  if(loading) return <Loader />

  return (
    <div className="container mx-auto p-4 ">
      {
        userRole === 'admin' ?
          <div className="flex flex-col lg:flex-row space-x-4">
            {/* Form Section */}
            <ProductForm userRole={userRole} userID={userID} setProductList={setProductList} />

            {/* Product List Section */}
            <ProductList productList={productList} />
          </div> :
          <div className='flex items-center justify-center'>
            <ProductList productList={productList} />
          </div>
      }

    </div>
  );
};

export default Product;
