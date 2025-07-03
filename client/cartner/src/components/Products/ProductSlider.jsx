import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "../../styles/ProductSlider.css";

const ProductSlider = ({ products = [], title = "More like this" }) => {
  if (!products.length) return null;

  return (
    <section className="product-slider-section">
      <h3 className="slider-title">{title}</h3>
      <div className="product-slider">
        {products.map((product, index) => (
          <div key={index} className="slider-item">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

ProductSlider.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
};

export default ProductSlider;