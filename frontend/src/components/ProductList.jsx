import React from 'react';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';

const ProductList = ({ productList }) => {
  const { userRole } = useSelector((state) => state);
  return (
    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b py-2 text-left">Product Name</th>
            <th className="border-b py-2 text-left">Description</th>
            <th className="border-b py-2 text-left">Price</th>
            {
              userRole !== 'admin' ?
                <>
                  <th className="border-b py-2 text-left">Details</th>
                </> : null
            }
          </tr>
        </thead>
        <tbody>
          {productList.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No products added yet.</td>
            </tr>
          ) : (
            productList.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
