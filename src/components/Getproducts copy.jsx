import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Include your Navbar
import "../css/GetProduct.css";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://karanimisheck22.alwaysdata.net/api/get_products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Products Section */}
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary">Available Smart Gadgets</h2>
        {loading && <Loader />}
        {error && <div className="error-box text-center">{error}</div>}

        <div className="row">
          {products.map((product) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-5" key={product.id}>
              <div className="product-card">
                {/* Product Image */}
                <div className="card-image">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                    className="product_img"
                  />
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="product-title">{product.product_name}</h5>
                  <p className="product-desc">{product.product_description}</p>
                  <h4 className="product-price">KSH {product.product_cost}</h4>
                  <div className="card-buttons">
                    <button
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetProduct;