import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import "../css/Form.css";

const Signin = () => {
    const [email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const[loading,setLoading] = useState(false);
    const[success,setSuccess] =useState("");
    const[error,setError] =useState("");

    const navigate = useNavigate();
    //Function to submit data to API
    const handlesubmit = async (e) => {
        e.preventDefault();//Prevent default actions
        setLoading(true);//set progress message
        //Add data to form data object
        try {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
            //Post above data to Backend API
            const response = await axios.post(
            "https://karanimisheck22.alwaysdata.net/api/signin",
            data);
            setLoading(false); //After successful posting, Clear the loading

            setSuccess(response.data.message)
            // clear the hooks
            setEmail("")
            setPassword("")

            setTimeout(() =>{
            setSuccess("");
            }, 5000)

            // Check if the response has user item, user exists
            if (response.data.user) {
            //If Yes
            // Redirect to /getproducts Component
            navigate("/");
            }
            else {
            //If Not
            //User Not Found, Show Error message
            setError(response.data.message);
            }
            //If there was an Error, Clear Loading
        } 
        catch (error) {
           setLoading(false);
           setError(error.data.message);
        }
    };
  return (
    <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">
            <h1 className='text-primary'>Sign In</h1>

            {loading && <Loader/>}
            <h3 className='text-success'>{success}</h3>
            <h4 className='text-danger'>{error}</h4>

            <form onSubmit ={handlesubmit}>
                <input type="email" 
                placeholder='Enter the email address here...'
                className='form-control' 
                required
                value={email}
                onChange ={(e) => setEmail(e.target.value)}/> <br />
                {/* {email} */}

                <input type="password" 
                placeholder='Enter the password here...'
                className='form-control' 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/> <br />

                <input type="submit" 
                value="Signin"
                className='btn btn-primary'/>
            </form>

            Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      
    </div>
  )
}

export default Signin
