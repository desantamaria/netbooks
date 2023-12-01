import React, { useState } from "react";
import "./ViewAccount.css";
import { Link, useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const ViewAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [account, setAccount] = useState({
    password: "",
    fullname: "",
    address: "",
    state: "",
    zipcode: "",
  });

  const [passwordCheck, setPasswordCheck] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(account);
  };

  return (
   <div className="ViewAccount">

      <div>
       <Link to="/Catalog">
        <button className="btn">Go Back</button>
      </Link>
     
      <div className="container">
        </div>
      <h1 className="create-account">{"Edit Account for: " + id}</h1>
    

      <form className="Issue"> 
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Old Password"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="New Password"
          value={account.password}
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
          value={account.fullname}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={account.address}
          onChange={handleChange}
        ></input>

        <div className="sign-up-duo">
          <input
            className="duo"
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={account.state}
            onChange={handleChange}
          ></input>
          <input
            className="duo"
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zip Code"
            value={account.zipcode}
            onChange={handleChange}
          ></input>
        </div>

        <button>Update Account</button>
      </form>
      </div>
    </div>
  );
};

export default ViewAccount;
