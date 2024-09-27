import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { userRole } = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <tr className="border-b">
      <td className="py-2">{product.productName}</td>
      <td className="py-2">{product.description}</td>
      <td className="py-2">{product.price} ₹</td>
      {
              userRole !== 'admin' ?
                <>
                  <td onClick={()=>navigate(`/productdetails/${product._id}`)} className="py-2 cursor-pointer"> View</td>
                </> : null
            }
    </tr>
  );
};

export default ProductItem;
