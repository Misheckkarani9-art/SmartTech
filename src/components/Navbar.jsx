import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ products = [], cartItems = [], onSearchResults = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return products
      .filter((p) => (p.product_name || "").toLowerCase().includes(term))
      .slice(0, 6); // limit dropdown results
  }, [searchTerm, products]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const filtered = products.filter((p) =>
      (p.product_name || "").toLowerCase().includes(term)
    );

    onSearchResults(filtered);
    navigate("/products"); // change to "/Getproducts" if that's your route

    setShowDrop(false);
    setMenuOpen(false);
  };

  const handlePickResult = (product) => {
    // Option 1: send a single product result
    onSearchResults([product]);
    navigate("/products");

    setSearchTerm("");
    setShowDrop(false);
    setMenuOpen(false);
  };

  return (
    <header className="pnav">
      <div className="pnav__inner">
        <Link to="/" className="pnav__brand" onClick={() => setMenuOpen(false)}>
          <span className="pnav__mark">P</span>
          <span className="pnav__brandText">
            Prime Car <b>Accessories</b>
          </span>
        </Link>

        <nav className={`pnav__links ${menuOpen ? "is-open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/addproducts" onClick={() => setMenuOpen(false)}>Add Products</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          <Link to="/signup" className="pnav__cta" onClick={() => setMenuOpen(false)}>
            Sign up
          </Link>
        </nav>

        {/* Search */}
        <div className="pnavSearchWrap">
          <form className="pnav__search" onSubmit={handleSubmitSearch}>
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDrop(true);
              }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => {
                // small delay so click on dropdown works
                setTimeout(() => setShowDrop(false), 150);
              }}
            />
            <button type="submit">Search</button>
          </form>

          {/* Dropdown results */}
          {showDrop && searchTerm.trim() && (
            <div className="pnavSearchDrop">
              {filteredResults.length === 0 ? (
                <div className="pnavSearchEmpty">No products found</div>
              ) : (
                filteredResults.map((p) => (
                  <button
                    key={p.product_id || p.id || p.product_name}
                    type="button"
                    className="pnavSearchItem"
                    onClick={() => handlePickResult(p)}
                  >
                    <span className="pnavSearchItemTitle">{p.product_name}</span>
                    <span className="pnavSearchItemPrice">KSH {p.product_cost}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="pnav__actions">
          <Link to="/cart" className="pnav__cart" onClick={() => setMenuOpen(false)}>
            Cart
            {cartItems.length > 0 && <span className="pnav__count">{cartItems.length}</span>}
          </Link>

          <button
            type="button"
            className={`pnav__burger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;