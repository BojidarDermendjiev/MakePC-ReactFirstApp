import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as priceComparisonService from "../../api/priceComparisonService";
import * as buildService from "../../api/buildService";
import BuildVsPrebuilt from "./BuildVsPrebuilt";
import PriceChart from "./PriceChart";
import ValueIndicator from "./ValueIndicator";
import styles from "../../assets/styles/comparisonPage.module.css";

export default function ComparisonPage() {
  const { t } = useTranslation();
  const { buildId } = useParams();
  const [comparison, setComparison] = useState(null);
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (buildId) {
      fetchComparison();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildId]);

  const fetchComparison = async () => {
    try {
      setLoading(true);
      setError(null);

      const [comparisonData, buildData] = await Promise.all([
        priceComparisonService.compareBuild(buildId),
        buildService.getBuildById(buildId),
      ]);

      setComparison(comparisonData);
      setBuild(buildData);
    } catch (err) {
      console.error("Error fetching comparison:", err);
      setError(t("comparison.fetchError", "Failed to load comparison data"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t("loading", "Loading...")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Link to="/builder/my-builds" className={styles.backLink}>
          ← {t("comparison.backToBuilds", "Back to My Builds")}
        </Link>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className={styles.container}>
        <Link to="/builder/my-builds" className={styles.backLink}>
          ← {t("comparison.backToBuilds", "Back to My Builds")}
        </Link>
        <div className={styles.errorMessage}>
          {t("comparison.notFound", "Build not found")}
        </div>
      </div>
    );
  }

  const savingsPositive = (comparison.savings || 0) > 0;

  return (
    <div className={styles.container}>
      <Link to="/builder/my-builds" className={styles.backLink}>
        ← {t("comparison.backToBuilds", "Back to My Builds")}
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>
          {t("comparison.title", "Price Comparison")}
        </h1>
        <p className={styles.subtitle}>
          {t("comparison.subtitle", "Compare prices for")} "
          {comparison.buildName}"
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainSection}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              💰 {t("comparison.priceBreakdown", "Price Breakdown")}
            </h2>

            <div className={styles.summaryGrid}>
              <div
                className={`${styles.summaryItem} ${styles.summaryItemBlue}`}
              >
                <div
                  className={`${styles.summaryValue} ${styles.summaryValueBlue}`}
                >
                  {comparison.totalBuildCost?.toFixed(2)} лв.
                </div>
                <div className={styles.summaryLabel}>
                  {t("comparison.yourBuildCost", "Your Build Cost")}
                </div>
              </div>

              <div
                className={`${styles.summaryItem} ${styles.summaryItemGreen}`}
              >
                <div
                  className={`${styles.summaryValue} ${styles.summaryValueGreen}`}
                >
                  {comparison.lowestComponentsCost?.toFixed(2)} лв.
                </div>
                <div className={styles.summaryLabel}>
                  {t("comparison.lowestPossible", "Lowest Possible")}
                </div>
              </div>

              <div
                className={`${styles.summaryItem} ${
                  savingsPositive
                    ? styles.summaryItemAmber
                    : styles.summaryItemGray
                }`}
              >
                <div
                  className={`${styles.summaryValue} ${
                    savingsPositive
                      ? styles.summaryValueAmber
                      : styles.summaryValueGray
                  }`}
                >
                  {savingsPositive
                    ? `${comparison.savings.toFixed(2)} лв.`
                    : "-"}
                </div>
                <div className={styles.summaryLabel}>
                  {t("comparison.potentialSavings", "Potential Savings")}
                </div>
              </div>
            </div>

            <div className={styles.componentList}>
              {comparison.components?.map((component) => {
                const hasLower =
                  component.lowestPrice &&
                  component.lowestPrice < component.originalPrice;
                return (
                  <div
                    className={styles.componentRow}
                    key={component.productId}
                  >
                    <div className={styles.componentInfo}>
                      <span className={styles.componentType}>
                        {component.componentType}
                      </span>
                      <p className={styles.componentName}>
                        {component.productName}
                      </p>
                    </div>
                    <div className={styles.priceInfo}>
                      <div
                        className={`${styles.originalPrice} ${
                          hasLower ? styles.originalPriceStriked : ""
                        }`}
                      >
                        {component.originalPrice.toFixed(2)} лв.
                      </div>
                      {hasLower && (
                        <div className={styles.lowestPrice}>
                          {component.lowestPrice.toFixed(2)} лв.
                        </div>
                      )}
                      {component.offers?.length > 0 && (
                        <span className={styles.offerCount}>
                          {component.offers.length}{" "}
                          {t("comparison.offers", "offers")}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <BuildVsPrebuilt
            buildPrice={comparison.totalBuildCost}
            prebuilts={comparison.similarPrebuilts}
          />
        </div>

        <div className={styles.sidebar}>
          <ValueIndicator
            buildPrice={comparison.totalBuildCost}
            lowestPrice={comparison.lowestComponentsCost}
            prebuilts={comparison.similarPrebuilts}
          />

          {build && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                🖥️ {t("comparison.buildSummary", "Build Summary")}
              </h2>
              <p>
                <strong>{build.name}</strong>
              </p>
              <p className={styles.buildPurpose}>{build.purpose}</p>
              <p className={styles.buildComponentsCount}>
                {build.items?.length || 0}{" "}
                {t("comparison.components", "components")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
