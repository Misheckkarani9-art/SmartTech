import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "../css/GetProduct.css";
import Mycarousel from "./Mycarousel";

const Getproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://karanimisheck22.alwaysdata.net/api/get_products"
      );

      // Most likely response.data is already an array of products
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

  return (
    <div className="row g-4">
      <h3 className="text-primary">Available products</h3>
      <Mycarousel/>

      {loading && <Loader />}
      {error && <h4 className="text-danger">{error}</h4>}

      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.product_id}>
          <div className="card product-card h-100">
  <div className="product-media">
    {/* optional badge */}
    {/* <span className="product-badge">New</span> */}

    <img
      src={img_url + product.product_photo}
      alt={product.product_name}
      className="product-img"
    />
  </div>

  <div className="card-body d-flex flex-column">
    <h5 className="product-title">{product.product_name.slice(0, 25)}</h5>
    <p className="product-desc flex-grow-1">
      {product.product_description.slice(0, 60)}...
    </p>
    <div className="product-price">KSH {product.product_cost}</div>

    <button
      className="btn product-btn mt-2"
      onClick={() => navigate("/makepayment", { state: { product } })}
    >
      Purchase Now
    </button>
  </div>
</div>
        </div>
      ))}
    </div>
  );
};

export default Getproduct;