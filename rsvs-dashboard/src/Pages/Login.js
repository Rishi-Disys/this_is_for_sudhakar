import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";

//import AuthContext from './AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
  //const {login} = useContext(AuthContext)

  const navigate = useNavigate();
  
  
  useEffect(() => {
    handleLogin();
  }, []);


  const handleLogin = () => {
    axios
      .get("http://127.0.0.1:8001/Users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log("Look at this Rishi:", error);
      });
  };



const validate = (e) =>{
  e.preventDefault();
  console.log(email, password)
  const findUser = users.find(
    (user) => email === user.email_id && password === user.password
  );



  if (findUser) {
    //alert("Login hogaya!!");
    navigate("/");
  }
  else{
  alert("Wrong Creds!!!Try Again or Signup");
  }
}

  return (
    <div class="container">
      <br />
      <br />
      <br />
      <form onSubmit={(e)=>{validate(e)}}>
        <div class="d-flex align-items-center justify-content-center card border-primary bg-info-subtle text-center mt-5 p-5 mx-auto shadow">
          <h1 class="text-primary ">Login</h1>

          <div class="input-group col">
            <div class="col-4 text-end">
              <div class="display-6 text-success p-2">Email</div>
            </div>
            <div class="col-8">
              <input
                class="input-group-text rounded-2 w-75 p-1 m-3 shadow"
                type="text"
                placeholder="Enter your username..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="col-4 text-end">
              <div class="display-6 text-success p-2">Password</div>
            </div>
            <div class="col-8">
              <input
                class="input-group-text rounded-2 w-75 p-1 m-3 shadow"
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" class="btn bg-primary rounded-4 m-3 shadow">
            Login
          </button>

          <h5>
            Not a user?
            <Link
              to="/signup"
              element={<Signup />}
              class="text line-opacity-100 mx-2"
            >
              Signup
            </Link>
          </h5>
        </div>
      </form>
      <Outlet />
    </div>
  );
}

export default Login;
