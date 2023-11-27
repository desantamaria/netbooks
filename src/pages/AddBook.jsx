import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const AddBook = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/catalog");
  };

  return (
    <div className="AddBook">
      <Link to="/Catalog">
        <button>Go Back</button>
      </Link>
      <h2 className="addBook-title">Add Book Information Here</h2>

      <form id="bookForm" className="add-book-form">
        {/* <label for="bookTitle">Book Title:</label> */}
        <input
          type="text"
          id="bookTitle"
          name="bookTitle"
          placeholder="Book Tile"
        />

        {/* <label for="isbn">ISBN:</label> */}
        <input type="text" id="isbn" name="isbn" placeholder="ISBN" />

        {/* <label for="edition">Edition:</label> */}
        <input type="text" id="edition" name="edition" placeholder="Edition" />

        {/* <label for="author">Author:</label> */}
        <input type="text" id="author" name="author" placeholder="Author" />

        {/* <label for="imageLink">Image Link:</label> */}
        <input
          type="text"
          id="imageLink"
          name="imageLink"
          placeholder="Image Link"
        />

        {/* <label for="rentDuration">Rent Duration:</label> */}
        <input
          type="text"
          id="rentDuration"
          name="rentDuration"
          placeholder="Rent Duration"
        />

        {/* <label for="subject">Subject:</label> */}
        <input type="text" id="subject" name="subject" placeholder="Subject" />

        {/* <label for="cost">Cost:</label> */}
        <input type="text" id="cost" name="cost" placeholder="Cost USD" />

        {/* <label for="totalPrice">Total Price:</label> */}
        <input
          type="text"
          id="totalPrice"
          name="totalPrice"
          placeholder="Total Price"
        />

        <button type="button">Calculate Total</button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
