import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getAllProducts } from "../services/ProductService";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ProductSlider from "../components/Products/ProductSlider";
import "../../src/styles/ProductDetails.css";
import Button from "../components/Reusables/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);

        const all = await getAllProducts();
        const filtered = all.products.filter((p) => p._id !== id);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating = product?.rating || 0) => {
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

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <main className="product-detailsd">
      <div className="prodd-sect">
        <div className="image-section">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="info-section">
          <div className="namenpwrap">
            <h2>{product.name}</h2>
            <span className="ratespan">
              <p className="price">${product.price}</p>
              <span>
                {renderStars()}{" "}
                <span className="rating-value">({product.reviews})</span>
              </span>
            </span>
          </div>

          <p className="desc">{product.description}</p>

          <div className="prod-info">
            <p className="category">Category: {product.category}</p>
            <p className="stock">Stock: {product.stock}</p>
          </div>

          {/* Placeholder for future session */}
          <div className="session-info">
            <h3>Session:</h3>
            <p>
              <em>Session data not available</em>
            </p>
          </div>

          {/* Placeholder for future cart */}
          <div className="cart-info">
            <h3>Cart:</h3>
            <p>
              <em>Cart data not available</em>
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => console.log("Add to Cart", product.name)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>

          <div className="reviews">
            <h3>Reviews:</h3>
            <p>
              <em>No reviews yet.</em>
            </p>
          </div>
        </div>
      </div>

      
      <ProductSlider products={relatedProducts} title="Similar Products" />
    </main>
  );
};

export default ProductDetails;
