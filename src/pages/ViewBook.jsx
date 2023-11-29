import React from "react";
import "./Catalog.css";
import { useEffect, useState } from "react";
import { getBooks } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUrl, list } from "aws-amplify/storage";

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

  const getBook = async () => {
    // console.log(book.filepath);

    const bookFilePath = book.filepath;
    try {
      const fileAccessURL = await getUrl({
        key: "intro-to-computer-math.pdf",
        options: { expiresIn: 60 },
        // Add the Amplify configuration explicitly
        level: "private",
        // identityId: "YOUR_IDENTITY_ID", // Include if needed for user-specific access
        // Provide the config directly to ensure credentials are used
        config: {
          bucket: "pdf-storage171945-dev",
          region: "us-west-1",
          credentials: {
            accessKeyId: "AKIATUYN66HEY63NO23D",
            secretAccessKey: "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",
          },
        },
      });

      console.log("access URL: ", fileAccessURL.url.href);
      console.log("URL expires at: ", fileAccessURL.expiresAt);
    } catch (error) {
      console.error("", error);
    }

    // try {
    //   const result = await list({
    //     // prefix: "public",
    //   });
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }
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
