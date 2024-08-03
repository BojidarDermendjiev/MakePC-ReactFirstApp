import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/feedback.module.css";
import { navigation } from "../../context/common/navigations";
import ErrorLoading from "../PageNotFound/ErrorLoading";
import Spiner from "../PageNotFound/Spiner";
import Review from "./Review";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Feedback() {
  const {
    data: comments,
    loading,
    error,
  } = useFetch("http://localhost:3030/jsonstore/advanced/users");

  const { user } = useContext(AuthContext);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (error) return <ErrorLoading />;

  return (
    <div className={styles.section__container}>
      <div className={styles.header}>
        <h1>What our clients say about us.</h1>
      </div>
      <div className={styles.testimonials__grid}>
        {loading ? (
          <Spiner />
        ) : (
          comments &&
          Object.values(comments).map((comment) => (
            <Review
              key={comment._id}
              {...comment}
              loggedInUser={loggedInUser}
            />
          ))
        )}
      </div>
      {user && (
        <div className={styles.coment}>
          <Link className={styles.donation} to={navigation.getCommentFromUrl()}>
            Comment
          </Link>
        </div>
      )}
      <div className={styles.btn}>
        <h1>Buy me a coffee 😊</h1>
        <Link className={styles.donation} to={navigation.getDonationUrl()}>
          Donation
        </Link>
      </div>
    </div>
  );
}
