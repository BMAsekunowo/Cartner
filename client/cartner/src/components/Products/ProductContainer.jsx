import React, { useState, useEffect } from "react";
import axios from 'axios'
import ReactSlider from "react-slider";
import SearchBar from "../Reusables/SearchBar";
import "../../styles/ProductContainer.css";
import ProductGrid from "./ProductGrid";
import { getAllProducts } from "../../services/ProductService";

const ProductContainer = () => {
  
  const [priceRange, setpriceRange] = useState([0, 1000]);
  const [products, setProducts] = useState([]); // ✅ dynamic data
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const data = await getAllProducts()
        setProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <div className="product-container">
        <div className="product-content">
          <div className="product-filters">
            <h2>Filters</h2>
            <div className="product-category">
              <h3>Category</h3>
              <div className="category-options">
                <label htmlFor="electronics">
                  <input type="checkbox" name="electronics" id="electronics" />
                  Electronics
                </label>

                <label htmlFor="clothing">
                  <input type="checkbox" name="clothing" id="clothing" />
                  Clothing
                </label>

                <label htmlFor="home&k">
                  <input type="checkbox" name="home&k" id="home&k" />
                  Home & Kitchen
                </label>

                <label htmlFor="beauty">
                  <input type="checkbox" name="beauty" id="beauty" />
                  Beauty
                </label>

                <label htmlFor="sports&o">
                  <input type="checkbox" name="sports&o" id="sports&o" />
                  Sports & Outdoors
                </label>
              </div>
            </div>

            <div className="makeline"></div>

            <div className="price-range-filter">
              <label className="price-label" htmlFor="price-label">
                Price Range
              </label>
              <div className="price-values">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <ReactSlider
                className="price-slider"
                id="price-label"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={1000}
                value={priceRange}
                onChange={setpriceRange}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                pearling
                minDistance={10}
              />
            </div>

            <div className="makeline"></div>

            <div className="sortby">
              <h3>Sort by</h3>
              <div className="sortby-options">
                <label htmlFor="relevance">
                  <input type="checkbox" name="relevance" id="relevance" />
                  Relevance
                </label>

                <label htmlFor="plth">
                  <input type="checkbox" name="plth" id="plth" />
                  Price Low to High
                </label>

                <label htmlFor="phtl">
                  <input type="checkbox" name="phtl" id="phtl" />
                  Price High to Low
                </label>

                <label htmlFor="cusrating">
                  <input type="checkbox" name="cusrating" id="cusrating" />
                  Customer Rating
                </label>
              </div>
            </div>

            <div className="makeline"></div>

            <div className="cartner-express">
              <h3>Cartner Express</h3>
              <div className="express-options">
                <label htmlFor="food">
                  <input type="checkbox" name="food" id="food" />
                  Food
                </label>

                <label htmlFor="drinks">
                  <input type="checkbox" name="drinks" id="drinks" />
                  Drinks
                </label>

                <label htmlFor="groceries">
                  <input type="checkbox" name="groceries" id="groceries" />
                  Groceries
                </label>
              </div>
            </div>

            <div className="makeline"></div>
          </div>

          <div className="products-wrap">
            <div className="search">
              <SearchBar
                placeholder="Search for products..."
                size="sm"
                buttonLabel="Find"
                onSearch={(query) => {
                  console.log("Searching for:", query);
                }}
              />
            </div>

            <div className="products-grid">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
