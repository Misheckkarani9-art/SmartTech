import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "../css/Payment.css";

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state || {};

  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post(
        "https://karanimisheck22.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (!product) {
    return (
      <div className="payment-container">
        <div className="payment-shell">
          <div className="alert alert-warning m-0">
            No product selected. Please go back and choose a product.
          </div>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-shell">
        <div className="payment-header">
          <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
            ← Back
          </button>

          <div>
            <h1 className="payment-title">Make Payment</h1>
            <p className="payment-subtitle">Lipa na Mpesa</p>
          </div>
        </div>

        <div className="card payment-card">
          {/* LEFT: IMAGE */}
          <div className="payment-media">
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              className="payment-img"
            />
          </div>

          {/* RIGHT: DETAILS + FORM */}
          <div className="payment-content">
            <h2 className="payment-product-name">
              {product.product_name?.slice(0, 60)}
            </h2>

            <p className="payment-desc">
              {product.product_description?.slice(0, 140)}...
            </p>

            <div className="payment-price">KSH {product.product_cost}</div>

            <form onSubmit={handlesubmit} className="payment-form">
              {loading && <Loader />}
              {success && <div className="alert alert-success py-2">{success}</div>}
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <label className="payment-label">Phone number</label>
              <input
                type="number"
                className="form-control payment-input"
                placeholder="2547XXXXXXXX"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <button type="submit" className="btn payment-btn mt-3">
                Make Payment
              </button>

              <div className="payment-hint">
                Tip: Enter number in format <b>2547XXXXXXXX</b>.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
