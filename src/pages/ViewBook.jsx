import React from "react";
import "./Catalog.css";
import { useEffect, useState } from "react";
import { getBooks } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUrl } from "aws-amplify/storage";

import DateAge from "../components/DateAge";

import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import { deleteAccount, updateAccount } from "../graphql/mutations";

import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Catalog = (props) => {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [bookpdf, setpdfBook] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const bookData = await client.graphql({
          query: getBooks,
          variables: { id: id },
        });
        const bookItem = bookData.data.getBooks;
        setBook(bookItem);
        console.log(bookItem);
        getBook(bookItem);
        setLoading(false);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };

    fetchBooks();
    // eslint-disable-next-line
  }, []);

  const getBook = async (data) => {
    // console.log(book.filepath);

    const bookFilePath = data.filepath;
    try {
      const fileAccessURL = await getUrl({
        key: bookFilePath,
        options: { expiresIn: 180 },
        level: "private",
        config: {
          bucket: "pdf-storage171945-dev",
          region: "us-west-1",
        },
      });

      console.log("access URL: ", fileAccessURL.url.href);
      console.log("URL expires at: ", fileAccessURL.expiresAt);
      setpdfBook(fileAccessURL);
    } catch (error) {
      console.error("", error);
    }

    // try {
    //   const result = await list({
    //     // prefix: "public",
    //   });
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const buyBook = async () => {
    console.log(props.user.balance);

    let updatedUser = props.user;

    if (props.user.balance < book.price || props.user.id === "") {
      alert("Insufficient Funds");
    } else {
      const newBalance = parseFloat(
        (props.user.balance - book.price).toFixed(2)
      );

      updatedUser.balance = newBalance;

      updatedUser.purchased.push(book.id);

      //   console.log(updatedUser.purchased);
      // console.log(updatedUser.purchased.includes(book.id));

      try {
        await client.graphql({
          query: updateAccount,
          variables: {
            input: {
              id: updatedUser.id,
              password: updatedUser.password,
              fullname: updatedUser.fullname,
              balance: updatedUser.balance,
              purchased: updatedUser.purchased,
            },
          },
        });
        props.update(updatedUser);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="Catalog">
      {loading ? (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}

      <div className="books-container">
        <div className="row">
          <Link to="/catalog">
            <button>Go Back</button>
          </Link>
          {props.user.id === book.account ? (
            <Link to={"/catalog/view/edit/" + book.id}>
              <button>Edit Book</button>
            </Link>
          ) : Object.values(props.user.purchased).some(
              (value) => value === book.id
            ) ? (
            ""
          ) : (
            <button onClick={buyBook}>Buy Book</button>
          )}
        </div>

        {/* <button onClick={getBook}>View Book</button> */}
        <div className="row-align">
          <div>
            <h2>Book Details</h2>
            <h3>{book.title}</h3>
            <h4>ISBN: {book.id}</h4>
            <p>Author(s): {book.author}</p>
            <p>Subject: {book.subject}</p>
          </div>

          <div>
            <h2>Listing Details</h2>
            <p>Posted By: {book.account}</p>
            <div className="row">
              <p>Posted:</p>
              <DateAge date={book.createdAt} />
            </div>
            <div className="row">
              <p>Updated:</p>
              <DateAge date={book.updatedAt} />
            </div>
          </div>
          <div>
            <h2>Pricing</h2>
            <p>${book.price} USD</p>
          </div>
        </div>

        {/* <p>Posted At: {book.createdAt}</p>
        <p>Edited At: {book.updatedAt}</p> */}

        {(bookpdf !== null &&
          Object.values(props.user.purchased).some(
            (value) => value === book.id
          )) ||
        (bookpdf !== null && book.account === props.user.id) ? (
          <div>
            <iframe src={bookpdf.url.href} width="100%" height="1000px" />
          </div>
        ) : (
          ""
        )}
        <br></br>
      </div>
    </div>
  );
};

export default Catalog;
