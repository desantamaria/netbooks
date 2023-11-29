import React, { useState } from "react";
import "./AddBook.css";
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
      <div className="container">
        <div>
          <Link to="/Catalog">
            <button>Go Back</button>
          </Link>
          <h2 className="addBook-title">Add Book Information Here</h2>
        </div>

        <form id="bookForm" className="Issue">
          <input type="text" id="id" name="id" placeholder="ISBN" />

          <input type="text" id="title" name="title" placeholder="Title" />

          <input type="text" id="author" name="author" placeholder="Author" />

          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
          />

          <input type="text" id="year" name="year" placeholder="Year" />

          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language"
          />
          <input type="text" id="pages" name="pages" placeholder="Pages" />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
          />

          <input
            type="text"
            id="account"
            name="account"
            placeholder="Account"
          />

          <input
            type="text"
            id="rentalTerm"
            name="rentalTerm"
            placeholder="Rental Term (in Days)"
          />
          <input
            type="text"
            id="rental_fee"
            name="rental_fee"
            placeholder="Rental Fee USD$"
          />

          <div className="File Upload">
            <label for="file-upload" class="custom-file-upload">
              Upload Book PDF
            </label>
            <input
              id="file-upload"
              className="custom-file-upload"
              type="file"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />
            {/* <button onClick={uploadFile}>Upload File To S3</button> */}
            {fileStatus ? "File uploaded successfully" : ""}
          </div>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
