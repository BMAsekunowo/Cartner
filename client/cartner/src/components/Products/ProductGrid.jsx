// src/components/ProductGrid.jsx
import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "../../styles/ProductGrid.css";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductGrid;
