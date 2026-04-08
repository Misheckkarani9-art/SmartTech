import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import "../css/Addproduct.css";

const Addproducts = () => {

  const [product_name, setProductName] = useState("");
  const [product_category, setProductCategory] = useState("");
  const [product_price, setProductPrice] = useState("");
  const [product_stock, setProductStock] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_image, setProductImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_category", product_category);
      formdata.append("product_price", product_price);
      formdata.append("product_stock", product_stock);
      formdata.append("product_description", product_description);
      if (product_image) {
        formdata.append("product_image", product_image);
      }

      const response = await axios.post(
        "https://gadgets-deck.codefreeapi.com/api/v1/addproducts",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          "X-API-Key": "cfa_zN50d..."
          }
        }
      );

      setLoading(false);
      setSuccess(response.data.message || "Product added successfully!");

      // Reset form fields
      setProductName("");
      setProductCategory("");
      setProductPrice("");
      setProductStock("");
      setProductDescription("");
      setProductImage(null);
      e.target.reset();

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className='row justify-content-center mt-4 page-bg'>
      <div className="col-md-6 p-4 card shadow form-card">
        <h3 className='text-success text-center mb-3'>ADD NEW GADGET</h3>

        {loading && <Loader />}
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder='Enter gadget name'
            className='form-control custom-input'
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          /> <br />

          <input
            type="text"
            placeholder='Enter category'
            className='form-control custom-input'
            required
            value={product_category}
            onChange={(e) => setProductCategory(e.target.value)}
          /> <br />

          <input
            type="number"
            placeholder='Enter price'
            className='form-control custom-input'
            required
            value={product_price}
            onChange={(e) => setProductPrice(e.target.value)}
          /> <br />

          <input
            type="number"
            placeholder='Enter stock quantity'
            className='form-control custom-input'
            required
            value={product_stock}
            onChange={(e) => setProductStock(e.target.value)}
          /> <br />

          <input
            type="text"
            placeholder='Enter description'
            className='form-control custom-input'
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          /> <br />

          <label className='text-primary mb-1'>Gadget photo</label>
          <input
            type="file"
            className='form-control custom-file'
            required
            accept='image/*'
            onChange={(e) => setProductImage(e.target.files[0])}
          /> <br />

          <input
            type="submit"
            value="Add Gadget"
            className='btn btn-outline-primary submit-btn'
          />
        </form>
      </div>
    </div>
  );
};

export default Addproducts;