import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "../css/GetProduct.css";


const Getproduct = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "https://karanimisheck22.alwaysdata.net/api/get_products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to cart and navigate to Cart page
  const addToCart = (product) => {
    const exists = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    if (exists) {
      alert("Product already in cart, you can adjust quantity in cart.");
      navigate("/cart"); // Go to cart if already exists
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      navigate("/cart"); // Navigate to cart after adding
    }
  };

  return (
    <div className="products-container">

    
  

      {/* Title */}
      <h2 className="products-title">Available Cars</h2>

      {/* Loading & Error */}
      {loading && <Loader />}
      {error && <h4 className="error">{error}</h4>}

      

      {/* Products Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.product_id}>

            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="product-img"
            />

            <div className="product-info">
              <h5 className="product-title">{product.product_name}</h5>
              <p className="product-desc">{product.product_description}</p>
              <div className="product-category">{product.product_category}</div>
              <h4 className="product-price">KSH {product.product_cost}</h4>

              <div className="product-buttons">
                {/* Add to Cart */}
               

                {/* Buy Now */}
                <button
                  className="buy-btn"
                  onClick={() =>
                    navigate("/makepayment", { state: { product } })
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Getproduct;