import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={"view/" + props.id}>
      <div className="Card">
        <div className="card-text">
          <h2 className="title">{props.title}</h2>
          <p className=""> By {props.author}</p>
          <p className=""> ISBN: {props.isbn}</p>
          <p className=""> Subject: {props.subject}</p>
          <p className=""> Status: {props.status}</p>
        </div>

        {/* <img className="card-img" src={props.image_url} /> */}
      </div>
    </Link>
  );
};

export default Card;
