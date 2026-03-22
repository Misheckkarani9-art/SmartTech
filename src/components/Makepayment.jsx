import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import "../css/Payment.css";

const Makepayment = () => {

    const {product} = useLocation().state || {}
     const navigate = useNavigate()
    // console.log(product)


    // below we specify the image base url
  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/"

    //initializze the hooks to manage the number
    const [number, setNumber] = useState("")
    const [loading, setLoading] =useState(false);
    const [success, setSuccess] =useState("")
    const [error, setError] =useState("")

    // create the function that will handle the submit action
    const handlesubmit = async (e) =>{
        // prevent the site froom reloading
        e.preventDefault()

        // update the loading hook
        setLoading(true)

        try{
            // ccreate a form data object
            const formdata  = new FormData()

            // append the data to the foorm data
            formdata.append("phone",number)
            formdata.append("amount",product.product_cost)

            const response = await axios.post("https://karanimisheck22.alwaysdata.net/api/mpesa_payment",formdata)

            // set loading back to default
            setLoading(false)

            // update the success hook with a message
            setSuccess(response.data.message)

        }
        catch(error){
            // if there iis an error respond to error
            setLoading(false)

            // update the error with error message
            setError(error.message)


        }
    }
  



  return (
    <div className="payment-container">

      <div className="row justify-content-center">
        {/* <button className="btn btn-outline-primary">Back To Products</button> */}
        <h1 className="text-success">Make Payment - Lipa na Mpesa</h1>
        
        <div className="col-md-1">
            <input type="button" 
            className='btn btn-primary'
            value="<-Back"
            onClick={() => navigate("/")}/>
        </div> <br /> <br />


        
        <div className="card shadow p-4 col-md-6">
            
            <img src={img_url + product.product_photo}
        alt="" className='product_img mt-3' />

            <div className="card-body">
                <h2 className="text-info"> {product.product_name.slice(0,40)}</h2>

                <p className="text-dark">{product.product_description.slice(0,40)}...</p>

                <h3 className="text-warning">$ {product.product_cost}</h3> <br />

                <form  onSubmit={handlesubmit}>
                    {loading && <Loader/>}
                    <h3 className="text-success">{success}</h3>
                    <h4 className="text-danger">{error}</h4>
                    <input type="number"
                    className='form-control'
                    placeholder='Enter the phone number 254XXXXX..' 
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                   /> <br /> 
                    {/* {number} */}

                    <input type="submit"
                    value= "Make Payment"
                    className='btn btn-success'/>
                </form>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Makepayment