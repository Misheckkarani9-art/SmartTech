import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import "../css/Products.css";

const GetProduct = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/";

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://karanimisheck22.alwaysdata.net/api/get_products"
      );
      setProducts(response.data);
      // Extract unique categories
      const uniqueCategories = ["All", ...new Set(response.data.map(p => p.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Available Smart Gadgets</h2>

      {loading && <Loader />}
      {error && <div className="error-box text-center">{error}</div>}

      {/* Categories Filter */}
      <div className="categories mb-4 text-center">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center text-muted">No products found.</div>
        )}

        {filteredProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="product-card shadow-lg">
              <div className="card-image">
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="product_img"
                />
              </div>

              <div className="card-body">
                <h5 className="product-title">{product.product_name.slice(0, 25)}</h5>
                <p className="product-desc">{product.product_description.slice(0, 50)}...</p>
                <h4 className="product-price text-warning">KSH {product.product_cost}</h4>

                <div className="card-buttons">
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navigate("/makepayment", { state: { product } })}
                  >
                    Purchase Now
                  </button>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => alert(`${product.product_name} added to wishlist!`)}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetProduct;