import React from "react";
import "./App.css";
import { Link, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import Catalog from "./pages/Catalog";
import ViewBook from "./pages/ViewBook";
import ViewAccount from "./pages/ViewAccount";
import EditBook from "./pages/EditBook";

import { Amplify } from "aws-amplify";
import AddBook from "./pages/AddBook";

import amplifyconfig from "./amplifyconfiguration.json";

// Amplify.configure({
//   API: {
//     GraphQL: {
//       endpoint:
//         "https://4lzmsis4wva53k3pwyvkxorcgy.appsync-api.us-west-1.amazonaws.com/graphql",
//       region: "us-west-1",
//       defaultAuthMode: "apiKey",
//       apiKey: "da2-74so3jigsngsxha3nvlz42xbdi",
//     },
//     Storage: {
//       bucket: "pdf-storage171945-dev",
//       region: "us-west-1",
//       credentials: {
//         accessKeyId: "AKIATUYN66HEY63NO23D",
//         secretAccessKey: "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",
//       },
//     },
//   },
// });

Amplify.configure(amplifyconfig);

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    password: "",
    fullname: "",
    balance: 0.0,
    purchased: [],
  });
  const manageSession = (data) => {
    setAuthenticated(!authenticated);

    console.log("it worked?");

    setLoggedInUser(data);
    console.log(data);
  };

  const updateBalance = (data) => {
    setLoggedInUser((prev) => {
      return {
        ...prev,
        balance: data,
      };
    });
  };

  const updateUser = (data) => {
    setLoggedInUser(data);
    setLoggedInUser((prev) => {
      return {
        ...prev,
        balance: data.balance,
      };
    });
  };

  let element = useRoutes([
    {
      path: "/",
      element: <Login loginUser={manageSession} />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/catalog",
      element: <Catalog user={loggedInUser} />,
    },
    {
      path: "catalog/view/:id",
      element: <ViewBook user={loggedInUser} update={updateUser} />,
    },
    {
      path: "catalog/account/:id",
      element: <ViewAccount setBalance={updateBalance} />,
    },
    {
      path: "catalog/addbook",
      element: <AddBook user={loggedInUser} />,
    },
    {
      path: "catalog/view/edit/:id",
      element: <EditBook user={loggedInUser} />,
    },
  ]);

  return (
    <div className="App">
      <div className="nav-bar">
        <div className="nav-title">
          <Link to="catalog">
            <h5>NetBooks</h5>
          </Link>
          {/* <h5>Logged in as: {loggedInUser.username}</h5> */}
        </div>

        <ul className="nav-links">
          {authenticated ? (
            <>
              <li>
                <h6>Available Balance: ${loggedInUser.balance} USD</h6>
              </li>
              <li>
                <Link to={"/catalog/account/" + loggedInUser.id}>
                  <h6 className="login-link">
                    View Account: {loggedInUser.id}
                  </h6>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h6 className="login-link" onClick={manageSession}>
                    Logout
                  </h6>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/">
                <h6 className="login-link">Login</h6>
              </Link>
            </li>
          )}
        </ul>
      </div>
      {element}
    </div>
  );
};

export default App;
