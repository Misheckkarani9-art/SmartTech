import React from "react";
import "../css/Home.css";

const categories = [
  {
    name: "Living Room",
    items: [
      { name: "Luxury Sofa", description: "Comfortable 3-seater sofa.", price: "KSh 120,000", img: "/images/living1.jpg" },
      { name: "Coffee Table", description: "Modern wooden table.", price: "KSh 35,000", img: "/images/living2.jpg" },
    ],
  },
  {
    name: "Bedroom",
    items: [
      { name: "King Bed", description: "Stylish and comfy bed.", price: "KSh 150,000", img: "/images/bedroom1.jpg" },
      { name: "Wardrobe", description: "Spacious sliding doors.", price: "KSh 80,000", img: "/images/bedroom2.jpg" },
    ],
  },
  {
    name: "Decor",
    items: [
      { name: "Wall Art", description: "Enhance your walls.", price: "KSh 12,000", img: "/images/decor1.jpg" },
      { name: "Indoor Plant", description: "Freshen your home.", price: "KSh 6,000", img: "/images/decor2.jpg" },
    ],
  },
];

const HomePro = () => {
  return (
    <div className="home-pro-container">
      <h1 className="home-title">Welcome to WellSpring Furniture</h1>
      <p className="home-subtitle">Premium furniture & decor for every room</p>
      {categories.map((cat, idx) => (
        <div key={idx} className="category-section">
          <h2>{cat.name}</h2>
          <div className="cards-container">
            {cat.items.map((item, i) => (
              <div key={i} className="card">
                <img src={item.img} alt={item.name} />
                <div className="card-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="price">{item.price}</span>
                  <a href={`/product/${item.name}`} className="view-btn">View</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePro;