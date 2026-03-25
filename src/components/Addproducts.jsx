import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import "../css/Addproduct.css";

const Addproducts = () => {

  const [product_name,setProductName] = useState("");
  const [product_description,setProductDescription] = useState("");
  const [product_cost,setProductCost] = useState("");
  const [product_photo,setProductPhoto] = useState("");

  const [loading, setLoading] =useState(false);
  const [success, setSuccess] =useState("")
  const [error, setError] =useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)

    try{
      const formdata = new FormData()

      formdata.append("product_name",product_name);
      formdata.append("product_description",product_description);
      formdata.append("product_cost",product_cost);
      formdata.append("product_photo",product_photo)

      const response = await axios.post("https://karanimisheck22.alwaysdata.net/api/add_product",formdata)

      setLoading(false)
      setSuccess(response.data.message)

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      e.target.reset()

      setTimeout(() =>{
        setSuccess("");
      }, 5000)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center mt-4 page-bg'>
      <div className="col-md-6 p-4 card shadow form-card">

      <h3 className='text-success text-center mb-3'>WELCOME TO THE ADD PRODUCT</h3>

      {loading && <Loader/>}

      {success && <div className="success-msg">{success}</div>}
      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>

        <input type="text"
        placeholder='Enter gadget name' 
        className='form-control custom-input'
        required
        value={product_name}
        onChange={(e) => setProductName(e.target.value)}/> <br />

        <input type="text"
        placeholder='Enter gadget description'
        className='form-control custom-input' 
        required
        value={product_description}
        onChange={(e) => setProductDescription(e.target.value)}/> <br />

        <input type="number" 
        placeholder='Enter gadget price'
        className='form-control custom-input'
        required
        value={product_cost}
        onChange={(e) => setProductCost(e.target.value)}/> <br />
        
        <label className='text-primary mb-1'>Gadget photo</label>
        <input type="file" 
        className='form-control custom-file'
        required
        accept='image/*'
        onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

        <input type="submit" 
        value="Add gadget"
        className='btn btn-outline-primary submit-btn'/>
      </form>
      </div>
    </div>
  )
}

export default Addproducts;