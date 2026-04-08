import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "../css/Payment.css";

const MakePaymentUpdated = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  // ✅ Load product safely
  useEffect(() => {
    if (location.state?.product) {
      console.log("RECEIVED PRODUCT:", location.state.product);
      setProduct(location.state.product);
    }
  }, [location.state]);

  // ✅ STRONG IMAGE HANDLER
  const getImage = () => {
    if (!product) return "https://via.placeholder.com/300";

    let img =
      product.product_photo ||
      product.img ||
      product.image ||
      product.photo ||
      "";

    if (!img) return "https://via.placeholder.com/300";

    // full URL
    if (img.startsWith("http")) return img;

    // already absolute path
    if (img.startsWith("/")) return img;

    // backend image
    return img_url + img;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost || product.price);

      const response = await axios.post(
        "https://karanimisheck22.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  if (!product) {
    return (
      <div className="payment-container">
        <div className="payment-shell">
          <div className="alert alert-warning">
            No product found. Please go back.
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-shell">

        {/* Header */}
        <div className="payment-header">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div>
            <h1 className="payment-title">Make Payment</h1>
            <p className="payment-subtitle">Lipa na Mpesa</p>
          </div>
        </div>

        {/* Card */}
        <div className="card payment-card">

          {/* IMAGE */}
          <div className="payment-media">
            <img
              src={getImage()}
              alt={product.product_name || product.name}
              className="payment-img"
            />
          </div>

          {/* DETAILS */}
          <div className="payment-content">
            <h2 className="payment-product-name">
              {(product.product_name || product.name)?.slice(0, 60)}
            </h2>

            <p className="payment-desc">
              {(product.product_description ||
                product.description ||
                "")?.slice(0, 140)}...
            </p>

            <div className="payment-price">
              KSH {product.product_cost || product.price}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="payment-form">
              {loading && <Loader />}
              {success && (
                <div className="alert alert-success">{success}</div>
              )}
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <label>Phone Number</label>
              <input
                type="number"
                placeholder="2547XXXXXXXX"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="form-control"
              />

              <button className="btn payment-btn mt-3">
                Pay Now
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentUpdated;