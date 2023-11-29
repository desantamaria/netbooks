import React from "react";
import "./Catalog.css";
import { useEffect, useState } from "react";
import { getBooks } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Catalog = (props) => {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };

    fetchBooks();

    // eslint-disable-next-line
  }, []);

  const getBook = async (id) => {
    console.log(id);
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
        <Link to="/catalog">
          <button>Go Back</button>
        </Link>
        <button onClick={getBook}>View Book</button>
        <h2>Book Details</h2>
        <h3>{book.title}</h3>
        <h4>{book.id}</h4>
        <p>Author(s): {book.author}</p>
        <p>Subject: {book.subject}</p>
        <p>Posted By: {book.account}</p>
        <p>Posted At: {book.createdAt}</p>
        <p>Edited At: {book.updatedAt}</p>

        <h2>Rental Terms</h2>
        <p>Time to Rent: {book.rentalTerm} days</p>
        <p>Rental Fee: ${book.rental_fee} USD</p>
        <p>Status: {book.status}</p>
      </div>
    </div>
  );
};

export default Catalog;
