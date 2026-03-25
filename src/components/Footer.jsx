import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pca-footer">
      <div className="pca-footer__top">
        <div className="pca-footer__brand">
          <h3 className="pca-footer__logo">Prime Car Accessories</h3>
          <p className="pca-footer__tagline">
            Upgrade your ride with quality accessories, fast service, and trusted payments.
          </p>

          <div className="pca-footer__badges">
            <span className="pca-badge">Quality Products</span>
            <span className="pca-badge">Fast Delivery</span>
            <span className="pca-badge">Secure Payments</span>
          </div>
        </div>

        <div className="pca-footer__links">
          <h4 className="pca-footer__title">Quick Links</h4>
          <ul>
            <li><Link to="/" className="pca-footer__link">Home</Link></li>
            <li><Link to="/products" className="pca-footer__link">Products</Link></li>
            <li><Link to="/contact" className="pca-footer__link">Contact</Link></li>
            <li><Link to="/about" className="pca-footer__link">About</Link></li>
          </ul>
        </div>

        <div className="pca-footer__contact">
          <h4 className="pca-footer__title">Contact</h4>
          <ul>
            <li className="pca-footer__text">Nairobi, Kenya</li>
            <li className="pca-footer__text">Phone: +254 7XX XXX XXX</li>
            <li className="pca-footer__text">Email: info@primecaraccessories.com</li>
            <li className="pca-footer__text">Hours: Mon - Sat, 8:00am - 6:00pm</li>
          </ul>
        </div>
      </div>

      <div className="pca-footer__bottom">
        <p className="pca-footer__copyright">
          © {year} Prime Car Accessories. All rights reserved.
        </p>

        <p className="pca-footer__dev">
          Developed by <span className="pca-footer__devname">Meshack Karani</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;