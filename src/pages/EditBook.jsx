import React, { useState, useEffect } from "react";
import "./EditBook.css";
import { Link, useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line
import { createBooks, deleteBooks, updateBooks } from "../graphql/mutations";
import { getBooks } from "../graphql/queries";

import { generateClient } from "aws-amplify/api";

import { uploadData } from "aws-amplify/storage";

const client = generateClient();

const EditBook = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    language: "",
    pages: "",
    subject: "",
    account: "",
    filepath: "",
    rentalTerm: "",
    rental_fee: "",
  });

  const [loading, setLoading] = useState(false);

  const [fileData, setFileData] = useState(null);
  const [fileStatus, setFileStatus] = useState(false);

  const [isFileUploading, setIsFileUploading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newerBook = book;
    newerBook.account = props.user;
    // newerBook.filepath = fileData.name;

    if (fileData === null || fileData === undefined) {
      try {
        await client.graphql({
          query: updateBooks,
          variables: {
            input: {
              id: id,
              title: book.title,
              author: book.author,
              publisher: book.publisher,
              year: book.year,
              language: book.language,
              pages: book.pages,
              subject: book.subject,
              account: book.account,
              filepath: book.filepath,
              rentalTerm: book.rentalTerm,
              rental_fee: book.rental_fee,
              // Add other fields from the 'book' state as needed
            },
          },
        });
        navigate("/catalog/view/" + id);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else {
      if (Object.values(book).some((value) => value === "")) {
        alert("All Data Fields are required.");
      } else {
        try {
          await client.graphql({
            query: updateBooks,
            variables: {
              input: {
                id: id,
                title: book.title,
                author: book.author,
                publisher: book.publisher,
                year: book.year,
                language: book.language,
                pages: book.pages,
                subject: book.subject,
                account: book.account,
                filepath: book.filepath,
                rentalTerm: book.rentalTerm,
                rental_fee: book.rental_fee,
                // Add other fields from the 'book' state as needed
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
        uploadFile();
      }
    }
    // navigate("/catalog");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadFile = async () => {
    console.log(fileData);

    try {
      setIsFileUploading(true);
      const result = await uploadData({
        key: fileData.name,
        data: fileData,
      }).result;
      console.log("Succeeded: ", result);
      setIsFileUploading(false);
      setFileStatus(true);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await client.graphql({
        query: deleteBooks,
        variables: { input: { id: book.id } },
      });
      navigate("/catalog");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="AddBook">
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
      <div>
        <Link to={"/Catalog/view/" + id}>
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
            defaultValue={book.id}
            onChange={handleChange}
          />

          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={book.title}
            onChange={handleChange}
          />

          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            defaultValue={book.author}
            onChange={handleChange}
          />

          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            defaultValue={book.publisher}
            onChange={handleChange}
          />

          <input
            type="text"
            id="year"
            name="year"
            placeholder="Year"
            defaultValue={book.year}
            onChange={handleChange}
          />

          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            defaultValue={book.language}
            onChange={handleChange}
          />
          <input
            type="text"
            id="pages"
            name="pages"
            placeholder="Pages"
            defaultValue={book.pages}
            onChange={handleChange}
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            defaultValue={book.subject}
            onChange={handleChange}
          />

          <input
            type="text"
            id="rentalTerm"
            name="rentalTerm"
            placeholder="Rental Term (in Days)"
            defaultValue={book.rentalTerm}
            onChange={handleChange}
          />
          <input
            type="text"
            id="rental_fee"
            name="rental_fee"
            placeholder="Rental Fee USD$"
            defaultValue={book.rental_fee}
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
            <p>You need to sign in to edit this Book.</p>
          ) : (
            <>
              <button type="submit" onClick={handleSubmit}>
                Update Book
              </button>
              <button className="delete" type="submit" onClick={handleDelete}>
                Delete Book
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditBook;
