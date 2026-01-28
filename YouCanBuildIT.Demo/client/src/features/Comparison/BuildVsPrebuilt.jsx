import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/buildVsPrebuilt.module.css";

export default function BuildVsPrebuilt({ buildPrice, prebuilts = [] }) {
  const { t } = useTranslation();

  const maxPrice = Math.max(
    buildPrice,
    ...(prebuilts.map((p) => p.priceBgn).length
      ? prebuilts.map((p) => p.priceBgn)
      : [buildPrice]),
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        🆚 {t("comparison.vsPrebuilt", "Build vs Prebuilt")}
      </h2>
      <p className={styles.description}>
        {t(
          "comparison.vsDescription",
          "See how your custom build compares to similar prebuilt systems from retailers.",
        )}
      </p>

      {prebuilts.length > 0 ? (
        <>
          <div className={styles.comparisonBar}>
            <strong>
              {t("comparison.priceComparison", "Price Comparison")}
            </strong>

            <div className={styles.barContainer}>
              <span className={styles.barLabel}>
                {t("comparison.yourBuild", "Your Build")}
              </span>
              <div className={styles.bar}>
                <div
                  className={`${styles.barFill} ${styles.barFillBlue}`}
                  style={{ width: `${(buildPrice / maxPrice) * 100}%` }}
                />
                <span className={styles.barValue}>
                  {buildPrice.toFixed(2)} лв.
                </span>
              </div>
            </div>

            {prebuilts.slice(0, 3).map((prebuilt) => (
              <div className={styles.barContainer} key={prebuilt.id}>
                <span className={`${styles.barLabel} ${styles.barLabelSmall}`}>
                  {prebuilt.name.length > 15
                    ? `${prebuilt.name.substring(0, 15)}...`
                    : prebuilt.name}
                </span>
                <div className={styles.bar}>
                  <div
                    className={`${styles.barFill} ${
                      prebuilt.isMoreExpensive
                        ? styles.barFillRed
                        : styles.barFillGreen
                    }`}
                    style={{
                      width: `${(prebuilt.priceBgn / maxPrice) * 100}%`,
                    }}
                  />
                  <span className={styles.barValue}>
                    {prebuilt.priceBgn.toFixed(2)} лв.
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.prebuiltGrid}>
            {prebuilts.map((prebuilt) => (
              <div className={styles.prebuiltCard} key={prebuilt.id}>
                <span
                  className={`${styles.prebuiltBadge} ${
                    prebuilt.isMoreExpensive
                      ? styles.badgeExpensive
                      : styles.badgeCheaper
                  }`}
                >
                  {prebuilt.isMoreExpensive
                    ? `+${prebuilt.priceDifference.toFixed(0)} лв.`
                    : `-${prebuilt.priceDifference.toFixed(0)} лв.`}
                </span>

                <div className={styles.prebuiltImage}>
                  {prebuilt.imageUrl ? (
                    <img src={prebuilt.imageUrl} alt={prebuilt.name} />
                  ) : (
                    <div className={styles.prebuiltPlaceholder}>🖥️</div>
                  )}
                </div>

                <h3 className={styles.prebuiltName}>{prebuilt.name}</h3>
                <p className={styles.prebuiltVendor}>
                  📍 {prebuilt.vendorName}
                </p>

                <div className={styles.priceRow}>
                  <span className={styles.prebuiltPrice}>
                    {prebuilt.priceBgn.toFixed(2)} лв.
                  </span>
                  <span
                    className={`${styles.priceDiff} ${
                      prebuilt.isMoreExpensive
                        ? styles.diffExpensive
                        : styles.diffCheaper
                    }`}
                  >
                    {prebuilt.isMoreExpensive
                      ? t("comparison.moreExpensive", "More expensive")
                      : t("comparison.cheaper", "Cheaper")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <p>
            🔍{" "}
            {t("comparison.noPrebuilts", "No similar prebuilt systems found")}
          </p>
          <p className={styles.emptyNote}>
            {t(
              "comparison.uniqueBuild",
              "Your build is unique! We couldn't find comparable prebuilt systems.",
            )}
          </p>
        </div>
      )}
    </div>
  );
}
