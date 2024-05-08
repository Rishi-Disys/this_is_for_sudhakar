import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import AuthContext from './AuthContext';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [occupation, setOccupation] =useState('');



  const handleSignup = (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8001/Register";
    if(password === confirmpassword) {
      const params ={
        username : name,
        email_id : email,
        password : password,
        occupation : occupation,
      }
      console.log(params)
      axios.post(url, null, { params })
      .then(response => {
        console.log(response.data);
        // Handle success response, e.g., show a success message or redirect the user
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message to the user
      });
    }
    else {
      alert("Passwords Don't match")
    }
    
  }
  

  return (
    <div>
      <br />
      <br />
      <form onSubmit={handleSignup}>
        <div className="d-flex bg-info-subtle align-items-center justify-content-center card text-center rounded-4 w-75 mt-5 p-5 mx-auto shadow-lg">
          <h1 className="text-primary">Signup</h1>
          <div className="input-group col">

          <div class="col-4">
              <div class="text-end text-success m-3">Name</div>
            </div>

            <div class="col-8">
              <input
                type="text"
                class="form-control col-8 m-2 shadow"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>


            <div class="col-4">
              <div class="text-end text-success m-3">Email</div>
            </div>

            <div class="col-8">
              <input
                type="email"
                class="form-control col-8 m-2 shadow"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div class="col-4">
              <div class="text-end text-success m-3">Password</div>
            </div>

            <div class="col-8">
              <input
                type="password"
                class="form-control m-2 shadow"
                placeholder="Enter your password..."
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div class="col-4">
              <div class="text-end text-success m-3">Re-enter Password</div>
            </div>

            <div class="col-8">
              <input
                type="password"
                class="form-control m-2 shadow"
                placeholder="Re-Enter your password..."
                
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <div class="col-4">
              <div class="text-end text-success m-3">Occupation</div>
            </div>

            <div class="col-8">
              <input
                type="text"
                class="form-control m-2 shadow"
                placeholder="Enter your occupation..."
                
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>

            <div className="input-group justify-content-center">
            <button type="submit" className="btn btn-primary m-2">
                Signup
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
