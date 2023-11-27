import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const ViewAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="ViewAccount">
      <Link to="/Catalog">
        <button>Go Back</button>
      </Link>

      <h2>Account Information</h2>

      <div className="account-container ">
        {/* <label for="username">Username:</label> */}
        <input type="text" id="username" name="username" />

        {/* <label for="email">Email:</label> */}
        <input type="email" id="email" name="email" />

        <h3>Account Settings</h3>

        {/* <label for="newPassword">New Password:</label> */}
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
        />

        {/* <label for="confirmPassword">Confirm Password:</label> */}
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm new password"
        />

        <button type="button">Update Password</button>
      </div>
    </div>
  );
};

export default ViewAccount;
