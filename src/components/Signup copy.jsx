import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Signup = () => {
  //Intialize the hooks
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [phone, setPhone]= useState("");

  // Define the   three states your proogram will move  to
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");
  const [error,setError]=useState("");

  // below is thefunction thst will handle submit action
  const handlesubmit = async (e) =>{
    // we prevent our site from reloading
    e.preventDefault()

    // update our loading hook wiith  A message that will be seen by users on thhe (UI)->userinterface
    setLoading(true)


    try{
      // Create a form data object that will enaable you to capture the adat entered on the form
      const formdata = new FormData()

      // insert the 4 details form of key value pair
      formdata.append("username" ,username);
      formdata.append("email" ,email);
      formdata.append("password" ,password);
      formdata.append("phone" ,phone);

      // by use of axois we can access the method post
      const response = await axios.post("https://karanimisheck22.alwaysdata.net/api/signup",formdata)
      // set back the loading to default
      setLoading(false);
      // incase everything  goes on well update the success hook with a mmessage
      setSuccess(response.data.message)

      //clear your hooks
      
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
       // clearing the file input value
      e.target.reset()

      setTimeout(() =>{
        setSuccess("");
      }, 5000)
 
    }
    catch(error){
      // set loading hook to  default
      setLoading(false)

      // update the set error with message
      setError(error.message)

    }
  }


  return (
    <div className ="row justify-content-center mt-4">
      <div className="cards col-md-6 shadow p-4">
        <h1 className="text-primary">sign up</h1>

        {/* bind the loading hook */}
        {loading && <Loader/>}
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>
          <input type="text"
          placeholder="Enter the Username" 
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required/><br/>
          {/* {username} */}

          <input type="email"
          placeholder="Enter the Email" 
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/><br/>
          {/* {email} */}

          <input type="password"
          placeholder="Enter the password" 
          className="form-control"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          required/><br/>
          {/* {password} */}

          <input type ="tel"
          placeholder="Enter mobile phone number"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required/><br/>
          {/* {phone} */}


         < input type="submit" value="signup" className="btn btn-outline-success"/><br/><br/>

         Already have an account?<Link to={'/signin'}>Sign in</Link>


        </form>
      </div>
    </div>
  )
}

export default Signup;
