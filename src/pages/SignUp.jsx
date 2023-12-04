import React from "react";
import "./SignUp.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createAccount } from "../graphql/mutations";

import { generateClient } from "aws-amplify/api";
const client = generateClient();

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
    fullname: "",
    balance: 99.99,
    purchased: [],
  });

  const [passwordCheck, setPasswordCheck] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(credentials);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (
      credentials.id !== "" &&
      credentials.password !== "" &&
      credentials !== ""
    ) {
      if (credentials.password === passwordCheck) {
        try {
          await client.graphql({
            query: createAccount,
            variables: { input: credentials },
          });
          navigate("/");
        } catch (error) {
          console.log("error on creating account", error);
        }
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("Fields cannot be empty.");
    }
  };

  return (
    <div className="SignUp">
      <h1 className="create-account">Create Account</h1>

      <form className="input-form">
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Re-enter Password"
          value={passwordCheck}
          onChange={(event) => {
            const { value } = event.target;
            setPasswordCheck(value);
          }}
        ></input>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Full Name"
          value={credentials.fullname}
          onChange={handleChange}
        ></input>
        {/* <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={credentials.address}
          onChange={handleChange}
        ></input>

        <div className="sign-up-duo">
          <input
            className="duo"
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={credentials.state}
            onChange={handleChange}
          ></input>
          <input
            className="duo"
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zip Code"
            value={credentials.zipcode}
            onChange={handleChange}
          ></input>
        </div> */}

        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
