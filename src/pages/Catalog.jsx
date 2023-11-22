import React from "react";
import "./Catalog.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const Catalog = (props) => {
  const [books, setBooks] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setBooks(props.data);
  }, [props]);

  return (
    <div className="Catalog">
      <div className="books-container">
        <h2>Textbook Listings</h2>
        {books && books.length > 0 ? (
          props.searchInput.length > 0 && filteredResults.length > 0 ? (
            filteredResults.map((book, index) => (
              <Card
                key={book.id}
                id={book.id}
                account={book.account}
                author={book.author}
                createdAt={book.createdAt}
                isbn={book.isbn}
                overdue_fee={book.overdue_fee}
                rentalTerm={book.rentalTerm}
                rental_fee={book.rental_fee}
                status={book.status}
                subject={book.subject}
                title={book.title}
              />
            ))
          ) : (
            books.map((book, index) => (
              <Card
                key={book.id}
                id={book.id}
                account={book.account}
                author={book.author}
                createdAt={book.createdAt}
                isbn={book.isbn}
                overdue_fee={book.overdue_fee}
                rentalTerm={book.rentalTerm}
                rental_fee={book.rental_fee}
                status={book.status}
                subject={book.subject}
                title={book.title}
              />
            ))
          )
        ) : (
          <h2>{"No books Yet"}</h2>
        )}
      </div>
    </div>
  );
};

export default Catalog;
