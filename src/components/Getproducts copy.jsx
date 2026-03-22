import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproduct = () => {

  // 2. initialize the hook to help you nmanage the satate of your application
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  // declare the navigate hook
  const navigate = useNavigate()

  // below we specify the image base url
  const img_url = "https://karanimisheck22.alwaysdata.net/static/images/"

  //3. create a function to help you fetch the products from your API
  const fetchProducts = async() =>{
    try{
      // 4.update the loading hook
      setLoading(true)

      //5. interact with your endpoint for fetching the products
      const response = await axios.get("https://karanimisheck22.alwaysdata.net/api/get_products")

      //6. update the products hook with the response given from tthe API
      setProducts(response.data)
      // 7.Set the loading hook  back to default
      setLoading(false)

    }
    catch(error){
      // if there is an error 
      // set the loading back to default
      setLoading(false)

      // update the error wiith message
      setError(error.message)

    }
  }
  // we shall use the use Effect hook. This hook enables us to automatiacally re-render  new features incase of any changes
  useEffect(() => {
    fetchProducts()
  },[])
  // console.log(products)


  return (
    <div className='row'>
      <h3 className="text-primary">Available products</h3>
     {loading && <Loader/>}
     <h4 className="text-danger">{error}</h4>

     {/* map the products fetched from the API to the user interface */}

     {products.map((product) => (
      <div className="col-md-3 justify-content-center mb-3">
      <div className="card shadow">
        <img src={img_url + product.product_photo}
        alt="" className='product_img mt-3' />
        <div className="card body">
          <h5 className="text-success">{product.product_name.slice(0,25)}</h5>

          <p className="text-secondary"> {product.product_description.slice(0,30)}...</p>

          <h4 className="text-warning">$ {product.product_cost}</h4>

          <button className="btn btn-outline-info text-success" onClick={() => navigate("/makepayment" , {state :{product}})}><b>Purchase Now</b></button>
        </div>
      </div>
     </div>
     ) )} <br />


    </div>
  )
}

export default Getproduct;
