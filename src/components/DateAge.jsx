import React, { useEffect, useState } from "react";
import "./DateAge.css";

const DateAge = (props) => {
  const [DateAge, setDateAge] = useState("");

  const originalDate = new Date(props.date);
  const currentDate = new Date();

  // Calculate the difference in years
  const ageInMilliseconds = currentDate - originalDate;
  const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
  const ageInMinutes = Math.floor(ageInSeconds / 60);
  const ageInHours = Math.floor(ageInMinutes / 60);
  const ageInDays = Math.floor(ageInHours / 24);
  // const ageInYears = Math.floor(ageInDays / 365.25); // Accounting for leap years

  useEffect(() => {
    if (ageInDays < 1) {
      setDateAge(`${ageInHours} hours ago`);
    } else if (ageInHours < 1) {
      setDateAge(`${ageInMinutes} minutes ago`);
    } else if (ageInMinutes < 1) {
      setDateAge(`${ageInSeconds} seconds ago`);
    } else {
      setDateAge(`${ageInDays} days ago`);
    }

    if (ageInDays > 30) {
      setDateAge(`${Math.floor(ageInDays / 30)} months ago`);
    }
    if (ageInMinutes < 60) {
      setDateAge(`${ageInMinutes} minutes ago`);
    }
    if (ageInSeconds < 60) {
      setDateAge(`${ageInSeconds} seconds ago`);
    }
    if (ageInDays > 365) {
      setDateAge(`${Math.floor(ageInDays / 365)} years ago`);
    }
  }, [ageInDays, ageInHours, ageInMinutes]);

  return <p className="DateAge">{DateAge}</p>;
};

export default DateAge;
