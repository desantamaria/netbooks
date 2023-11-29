import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { getAccount } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

import { uploadData } from "aws-amplify/storage";

const client = generateClient();

const AddBook = (props) => {
  const navigate = useNavigate();

  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/catalog");
  };

  const uploadFile = async () => {
    console.log(fileData);

    try {
      const result = await uploadData({
        key: fileData.name,
        data: fileData,
      }).result;
      console.log("Succeeded: ", result);
      setFileStatus(true);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="AddBook">
      <Link to="/Catalog">
        <button>Go Back</button>
      </Link>
      <h2 className="addBook-title">Add Book Information Here</h2>

      <form id="bookForm" className="input-form">
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
      <input
        type="file"
        onChange={(e) => {
          setFileData(e.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File To S3</button>
      {fileStatus ? "File uploaded successfully" : ""}
    </div>
  );
};

export default AddBook;
