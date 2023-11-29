import React from "react";
import "./Catalog.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
// eslint-disable-next-line
import { listBooks, listAccounts } from "../graphql/queries";
import { Link } from "react-router-dom";

import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Catalog = (props) => {
  const [books, setBooks] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const bookData = await client.graphql({ query: listBooks });
        const bookList = bookData.data.listBooks.items;
        setBooks(bookList);
        console.log(bookList);
        setLoading(false);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };

    fetchBooks();

    // eslint-disable-next-line
  }, []);

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
        <div className="books-header">
          <h2>Textbook Listings</h2>{" "}
          <Link to="/catalog/addbook">
            <button>Add Book</button>
          </Link>
        </div>

        {books && books.length > 0
          ? searchInput.length > 0 && filteredResults.length > 0
            ? filteredResults.map((book, index) => (
                <Card
                  key={book.id}
                  id={book.id}
                  author={book.author}
                  createdAt={book.createdAt}
                  rentalTerm={book.rentalTerm}
                  rental_fee={book.rental_fee}
                  status={book.status}
                  subject={book.subject}
                  title={book.title}
                />
              ))
            : books.map((book, index) => (
                <Card
                  key={book.id}
                  id={book.id}
                  author={book.author}
                  createdAt={book.createdAt}
                  rentalTerm={book.rentalTerm}
                  rental_fee={book.rental_fee}
                  status={book.status}
                  subject={book.subject}
                  title={book.title}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default Catalog;
