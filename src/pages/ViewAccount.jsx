import React, { useState, useEffect } from "react";
import "./ViewAccount.css";
import { Link, useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { deleteAccount, updateAccount } from "../graphql/mutations";

const client = generateClient();

const ViewAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [account, setAccount] = useState({
    password: "",
    fullname: "",
    balance: "",
  });

  const [passwordCheck, setPasswordCheck] = useState({
    old: "",
    new: "",
    newCheck: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const accountData = await client.graphql({
          query: getAccount,
          variables: { id: id },
        });
        const accountItem = accountData.data.getAccount;
        setAccount(accountItem);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };

    fetchBooks();
    setPasswordMatch(false);

    // eslint-disable-next-line
  }, []);

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

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordCheck((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    if (passwordCheck.new === passwordCheck.newCheck) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }

    console.log(passwordCheck);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      Object.values(account).some((value) => value === "") ||
      Object.values(passwordCheck).some((value) => value === "")
    ) {
      alert("All Data Fields are required.");
    } else {
      console.log(account.password);
      console.log(passwordCheck.old);
      if (account.password !== passwordCheck.old) {
        alert("Old Password is incorrect");
      } else {
        let newerAccount = account;
        newerAccount.password = passwordCheck.new;
        try {
          await client.graphql({
            query: updateAccount,
            variables: {
              input: {
                id: id,
                password: newerAccount.password,
                fullname: account.fullname,
              },
            },
          });
          setPasswordCheck({
            old: "",
            new: "",
            newCheck: "",
          });
          setSucess(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  //   const handleDelete = async (event) => {
  //     event.preventDefault();
  //     try {
  //       await client.graphql({
  //         query: deleteAccount,
  //         variables: { input: { id: account.id } },
  //       });
  //       navigate("/");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  return (
    <div className="ViewAccount">
      <div>
        <Link to="/Catalog">
          <button className="btn">Go Back</button>
        </Link>
        <div className="duo-container">
          <div className="view-account">
            <div className="container"></div>
            <h1 className="create-account">{"View Account"}</h1>
            <h3>Username: {id}</h3>
            <h4>Full Name: {account.fullname}</h4>
            <div className="balance">
              <h1>Balance</h1>
              <h3>${account.balance} USD</h3>
            </div>
          </div>

          <div className="edit-account">
            <div className="container"></div>
            <h1 className="create-account">{"Edit Account"}</h1>

            <form className="Issue">
              <input
                type="password"
                id="password"
                name="old"
                placeholder="Old Password"
                onChange={handlePasswordChange}
                value={passwordCheck.old}
              ></input>
              <input
                type="password"
                id="password"
                name="new"
                placeholder="New Password"
                onChange={handlePasswordChange}
                value={passwordCheck.new}
              ></input>
              <input
                type="password"
                id="password"
                name="newCheck"
                placeholder="Re-enter Password"
                onChange={handlePasswordChange}
                value={passwordCheck.newCheck}
              ></input>
              {/* {passwordMatch ? "Passwords Match" : "Passwords do no Match"} */}
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                defaultValue={account.fullname}
                onChange={handleChange}
              ></input>

              <button onClick={handleSubmit}>Update Account</button>
              {/* <button className="delete" type="submit" onClick={handleDelete}>
                Delete Account
              </button> */}
            </form>
            {sucess ? "Password Update Sucessful" : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccount;
