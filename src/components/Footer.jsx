import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        
      <div className="footer-overlay">
        
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h3>About Elegance Furniture</h3>
            <p>
              We provide high-quality, luxurious furniture that transforms your home. Discover our exclusive collections today.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Promotions</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Pinterest</a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="footer-bottom">
          <p>© 2026 Developed by Misheck Karani. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;