import React from "react";
import "./SignUp.css";
import { useState } from "react";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
    address: "",
    state: "",
    zipcode: "",
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

  return (
    <div className="SignUp">
      <h1 className="create-account">Create Account</h1>

      <form className="input-form">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        ></input>
        <input
          type="text"
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
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={credentials.fullname}
          onChange={handleChange}
        ></input>
        <input
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
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
