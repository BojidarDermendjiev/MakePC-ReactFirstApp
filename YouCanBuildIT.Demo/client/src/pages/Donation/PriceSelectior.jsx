import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navigation } from "../../common/navigations";
import styles from "../../assets/styles/priceSelector.module.css";

export default function PriceSelectior() {
  const { t } = useTranslation();
  return (
    <>
      <section className={styles["pricing-table"]}>
        <div className={styles.card}>
          <h6 className={styles.type}>{t("paymentCard.twoCoffees")}</h6>
          <div className={styles.price}>
            <span>$</span>5
          </div>
          <div className={styles["buy-button"]}>
            <Link className={styles.btn} to={navigation.getPaymentCardUrl()}>
              <h3>{t("paymentCard.donate")}</h3>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h6 className={styles.type}>{t("paymentCard.wholeBuffet")}</h6>
          <div className={styles.price}>
            <span>$</span>10
          </div>
          <div className={styles["buy-button"]}>
            <Link className={styles.btn} to={navigation.getPaymentCardUrl()}>
              <h3>{t("paymentCard.donate")}</h3>
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h6 className={styles.type}>{t("paymentCard.maintenance")}</h6>
          <div className={styles.price}>
            <span>$</span>20
          </div>
          <div className={styles["buy-button"]}>
            <Link className={styles.btn} to={navigation.getPaymentCardUrl()}>
              <h3>{t("paymentCard.donate")}</h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
