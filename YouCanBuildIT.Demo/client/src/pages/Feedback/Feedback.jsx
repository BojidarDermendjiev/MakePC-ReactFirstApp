import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/feedback.module.css";
import { navigation } from "../../common/navigations";
import ErrorLoading from "../PageNotFound/ErrorLoading";
import Spiner from "../PageNotFound/Spiner";
import Review from "./Review";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContextProvider";
import { useTranslation } from "react-i18next";

export default function Feedback() {
  const { t } = useTranslation();
  const {
    data: clients,
    loading,
    error,
    triggerRefreshHandler,
  } = useFetch("http://localhost:3030/jsonstore/users/clients");

  const { user } = useContext(AuthContext);

  if (error) return <ErrorLoading />;

  return (
    <div className={styles.section__container}>
      <div className={styles.header}>
        <h1>{t("feedback.header")}</h1>
      </div>
      <div className={styles.testimonials__grid}>
        {loading ? (
          <Spiner />
        ) : (
          clients &&
          Object.values(clients).map((client) =>
            Object.values(client.comments || {}).map((comment, index) => (
              <Review
                key={`${client._id}-${comment.commentId}-${index}`}
                email={client.email}
                comment={comment.comment}
                review={comment.review}
                _id={client._id}
                commentId={comment.commentId}
                loggedInUser={user}
                triggerRefreshHandler={triggerRefreshHandler}
              />
            ))
          )
        )}
      </div>
      {user && (
        <div className={styles.coment}>
          <Link className={styles.donation} to={navigation.getCommentFromUrl()}>
            {t("feedback.comment")}
          </Link>
        </div>
      )}
      <div className={styles.btn}>
        <h1>{t("feedback.donationHeader")}</h1>
        <p className={styles.donationText}>{t("feedback.donationText")}</p>
        <Link className={styles.donation} to={navigation.getDonationUrl()}>
          {t("feedback.donationButton")}
        </Link>
      </div>
    </div>
  );
}
