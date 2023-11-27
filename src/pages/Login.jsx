import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loginInfo.username !== "") {
      const fetchedLogin = await client.graphql({
        query: getAccount,
        variables: { id: loginInfo.username },
      });

      if (
        fetchedLogin.data.getAccount != null &&
        loginInfo.password === fetchedLogin.data.getAccount.password
      ) {
        props.loginUser(loginInfo);
        navigate("/Catalog");
      } else {
        alert("Incorrect Credentials! Please try again.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="Login">
      <div className="form-container">
        <h1>Login</h1>

        <form className="input-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <button onClick={handleLogin}>Login</button>
        </form>

        <div>
          <p>
            New to us?{" "}
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
