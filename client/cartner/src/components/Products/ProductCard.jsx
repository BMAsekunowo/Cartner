// src/components/ProductCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEye,
  FaCartPlus,
} from "react-icons/fa";
import Button from "../Reusables/Button";
import "../../styles/ProductGrid.css"; // Keep this for styling

const ProductCard = ({ imageUrl, name, price, rating, reviews, _id }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={`full-${i}`} color="#facc15" />);
    if (hasHalf) stars.push(<FaStarHalfAlt key="half" color="#facc15" />);
    for (let i = 0; i < emptyStars; i++)
      stars.push(<FaRegStar key={`empty-${i}`} color="#facc15" />);

    return stars;
  };

  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={name} className="product-image" />
      </div>

      <div className="product-details">
        <div className="info-wrap">
          <h4 className="product-name">{name}</h4>
          <p className="product-price">${price}</p>
          <div className="product-rating">
            {renderStars()} <span className="rating-value">({reviews})</span>
          </div>
        </div>

        <div className="action-buttons">
          <Button size="xs" onClick={() => navigate(`/product/${_id}`)}>
            <FaEye />
          </Button>
          <Button size="xs" onClick={() => console.log("Add to Cart", name)}>
            <FaCartPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};

export default ProductCard;