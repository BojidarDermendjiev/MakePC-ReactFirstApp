import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/feedback.module.css";
import { navigation } from "../../common/navigations";
import ErrorLoading from "../../components/ErrorLoading";
import Spiner from "../../components/Spiner";
import Review from "./Review";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContextProvider";
import { useTranslation } from "react-i18next";
import { serverUrl, serverEndpoints } from "../../common/generic";

export default function Feedback() {
  const { t } = useTranslation();
  const {
    data: feedbacks,
    loading,
    error,
    triggerRefreshHandler,
  } = useFetch(`${serverUrl}${serverEndpoints.getAllFeedbacks}`);

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
          feedbacks &&
          Array.isArray(feedbacks) &&
          feedbacks.map((feedback) => (
            <Review
              key={feedback.id}
              userId={feedback.userId}
              userName={feedback.userName}
              comment={feedback.comment}
              rating={feedback.rating}
              commentId={feedback.id}
              loggedInUser={user}
              avatarUrl={feedback.avatarUrl}
              triggerRefreshHandler={triggerRefreshHandler}
            />
          ))
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
