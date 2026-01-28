import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as priceComparisonService from "../../api/priceComparisonService";
import styles from "../../assets/styles/priceChart.module.css";

export default function PriceChart({ productId, productName }) {
  const { t } = useTranslation();
  const [priceHistory, setPriceHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (productId) {
      fetchPriceHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, days]);

  const fetchPriceHistory = async () => {
    try {
      setLoading(true);
      const data = await priceComparisonService.getPriceHistory(
        productId,
        days,
      );
      setPriceHistory(data);
    } catch (error) {
      console.error("Error fetching price history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          📈 {t("comparison.priceHistory", "Price History")}
        </h3>
        <div className={styles.noData}>{t("loading", "Loading...")}</div>
      </div>
    );
  }

  if (
    !priceHistory ||
    !priceHistory.history ||
    priceHistory.history.length === 0
  ) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          📈 {t("comparison.priceHistory", "Price History")}
        </h3>
        <div className={styles.noData}>
          {t(
            "comparison.noHistory",
            "No price history available for this product",
          )}
        </div>
      </div>
    );
  }

  const { history, currentLowest, highestEver, lowestEver } = priceHistory;
  const maxPrice = Math.max(...history.map((p) => p.priceBgn));
  const minPrice = Math.min(...history.map((p) => p.priceBgn));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        📈 {productName || t("comparison.priceHistory", "Price History")}
      </h3>

      <div className={styles.timeRange}>
        <button
          className={`${styles.rangeButton} ${days === 7 ? styles.rangeButtonActive : ""}`}
          onClick={() => setDays(7)}
        >
          7 {t("comparison.days", "days")}
        </button>
        <button
          className={`${styles.rangeButton} ${days === 30 ? styles.rangeButtonActive : ""}`}
          onClick={() => setDays(30)}
        >
          30 {t("comparison.days", "days")}
        </button>
        <button
          className={`${styles.rangeButton} ${days === 90 ? styles.rangeButtonActive : ""}`}
          onClick={() => setDays(90)}
        >
          90 {t("comparison.days", "days")}
        </button>
      </div>

      <div className={styles.chartContainer}>
        {history.slice(-days).map((point, index) => {
          const height =
            ((point.priceBgn - minPrice) / (maxPrice - minPrice || 1)) * 100;
          const isLowest = point.priceBgn === minPrice;

          return (
            <div
              key={index}
              className={`${styles.chartBar} ${isLowest ? styles.chartBarLowest : ""}`}
              style={{ height: `${Math.max(height, 5)}%` }}
            >
              <div className={styles.tooltip}>
                {point.priceBgn.toFixed(2)} лв.
                <br />
                {point.vendorName}
                <br />
                {new Date(point.date).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <div className={`${styles.statValue} ${styles.statValueGreen}`}>
            {currentLowest.toFixed(2)} лв.
          </div>
          <div className={styles.statLabel}>
            {t("comparison.currentLowest", "Current Lowest")}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={`${styles.statValue} ${styles.statValueBlue}`}>
            {lowestEver.toFixed(2)} лв.
          </div>
          <div className={styles.statLabel}>
            {t("comparison.lowestEver", "Lowest Ever")}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={`${styles.statValue} ${styles.statValueRed}`}>
            {highestEver.toFixed(2)} лв.
          </div>
          <div className={styles.statLabel}>
            {t("comparison.highestEver", "Highest Ever")}
          </div>
        </div>
      </div>
    </div>
  );
}
