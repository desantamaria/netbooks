import React from "react";
import "./App.css";
import { Link, useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react";
import Catalog from "./pages/Catalog";

// eslint-disable-next-line
import { listBooks, listAccounts } from "./graphql/queries";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://4lzmsis4wva53k3pwyvkxorcgy.appsync-api.us-west-1.amazonaws.com/graphql",
      region: "us-west-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-74so3jigsngsxha3nvlz42xbdi",
    },
  },
});

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [books, setBooks] = useState([]);
  const manageSession = () => {
    setAuthenticated(!authenticated);
    console.log("it worked?");
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
      element: <Catalog />,
    },
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await client.graphql({ query: listBooks });
        const bookList = bookData.data.listBooks.items;
        setBooks(bookList);
        console.log(bookList);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="nav-bar">
        <div className="nav-title">
          <h5>NetBooks</h5>
        </div>

        <ul className="nav-links">
          {authenticated ? (
            <li>
              <Link to="/">
                <h6 className="login-link" onClick={manageSession}>
                  Logout
                </h6>
              </Link>
            </li>
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
