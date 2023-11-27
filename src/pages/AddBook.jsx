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

      <form id="bookForm" className="input-form">
        <label for="bookTitle">Book Title:</label>
        <input type="text" id="bookTitle" name="bookTitle" required />

        <label for="isbn">ISBN:</label>
        <input type="text" id="isbn" name="isbn" required />

        <label for="edition">Edition:</label>
        <input type="text" id="edition" name="edition" required />

        <label for="author">Author:</label>
        <input type="text" id="author" name="author" required />

        <label for="imageLink">Image Link:</label>
        <input type="text" id="imageLink" name="imageLink" required />

        <label for="rentDuration">Rent Duration:</label>
        <input type="text" id="rentDuration" name="rentDuration" required />

        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />

        <label for="cost">Cost:</label>
        <input type="text" id="cost" name="cost" required />

        <label for="totalPrice">Total Price:</label>
        <input type="text" id="totalPrice" name="totalPrice" readonly />

        <button type="button" onclick="calculateTotal()">
          Calculate Total
        </button>
        <button type="submit" onclick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
