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
  const [filteredResults2, setFilteredResults2] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setfilter] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const bookData = await client.graphql({ query: listBooks });
        const bookList = bookData.data.listBooks.items;
        setBooks(bookList);
        setFilteredResults(bookList);
        // console.log(bookList);
        setLoading(false);
      } catch (error) {
        console.log("error on fetching account", error);
      }
    };

    fetchBooks();

    // eslint-disable-next-line
  }, []);

  const searchPosts = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      if (filter) {
        setSearchInput("");
        const filteredData = filteredResults.filter((book) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData);
      } else {
        setSearchInput("");
        const filteredData = filteredResults.filter((book) =>
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData);
      }
    } else {
      if (filter) {
        setFilteredResults(filteredResults2);
      } else {
        setFilteredResults(books);
      }
    }

    setSearchInput(searchValue);
  };

  const toggleFilter = () => {
    const negate = !filter;
    console.log(negate);

    if (negate) {
      const filteredArray = filteredResults.filter((value) =>
        props.user.purchased.includes(value.id)
      );
      console.log(filteredArray);
      setFilteredResults(filteredArray);
      setFilteredResults2(filteredArray);
    } else {
      setFilteredResults(books);
    }

    setfilter(!filter);
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
        <div className="books-header">
          <h2>Textbook Listings</h2>{" "}
          <Link to="/catalog/addbook">
            <button>Add Book</button>
          </Link>
          <div className="row">
            {" "}
            <input type="checkbox" onChange={toggleFilter} />
            <label className="switch">Filter by purchased books</label>
          </div>
        </div>
        <div className="row">
          <input
            className="search-bar"
            type="text"
            name="title"
            placeholder="Search"
            onChange={(inputString) => searchPosts(inputString.target.value)}
          />
          <div></div>
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
            : filteredResults.map((book, index) => (
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
