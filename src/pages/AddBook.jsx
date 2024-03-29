import React, { useState } from "react";
import "./AddBook.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import { createBooks } from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";

import { uploadData } from "aws-amplify/storage";

const client = generateClient();

const AddBook = (props) => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
    subject: "",
    account: "",
    filepath: "",
    price: 0.0,
  });

  const [fileData, setFileData] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);

  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newerBook = newBook;
    newerBook.account = props.user.id;
    newerBook.filepath = fileData.name;

    if (fileData === null || fileData === undefined) {
      alert("please upload pdf");
    } else {
      if (Object.values(newBook).some((value) => value === "")) {
        alert("All Data Fields are required.");
      } else {
        try {
          await client.graphql({
            query: createBooks,
            variables: { input: newerBook },
          });
          //   navigate("/catalog");
        } catch (error) {
          console.error(error);
        }
        uploadFile();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(newBook);
  };

  const uploadFile = async () => {
    console.log(fileData);

    try {
      setIsFileUploading(true);
      const result = await uploadData({
        key: fileData.name,
        data: fileData,
        options: {
          contentType: "application/pdf",
        },
      }).result;
      console.log("Succeeded: ", result);
      setIsFileUploading(false);
      setFileStatus(true);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="AddBook">
      <div>
        <Link to="/Catalog">
          <button>Go Back</button>
        </Link>
        <div className="container"></div>
        <h2 className="addBook-title">Add Book Information Here</h2>

        <form id="bookForm" className="Issue">
          <input
            type="text"
            id="id"
            name="id"
            placeholder="ISBN"
            onChange={handleChange}
          />

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />

          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            onChange={handleChange}
          />

          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            onChange={handleChange}
          />

          <input
            type="text"
            id="year"
            name="year"
            placeholder="Year"
            onChange={handleChange}
          />

          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            onChange={handleChange}
          />
          <input
            type="text"
            id="pages"
            name="pages"
            placeholder="Pages"
            onChange={handleChange}
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
          />

          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />

          <div className="FileUpload">
            <p className="file-upload-label">Upload Book PDF</p>
            <input
              id="file-upload"
              className="custom-file-upload"
              type="file"
              onChange={(e) => {
                setFileData(e.target.files[0]);
              }}
            />
            {isFileUploading ? "Upload in Progress" : ""}
            {fileStatus ? "File uploaded successfully" : ""}
          </div>

          {props.user === "" ? (
            <p>You need to Login to add a Book.</p>
          ) : (
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBook;
