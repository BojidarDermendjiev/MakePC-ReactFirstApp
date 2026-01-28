import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/valueIndicator.module.css";

export default function ValueIndicator({
  buildPrice,
  lowestPrice,
  prebuilts = [],
}) {
  const { t } = useTranslation();

  // Calculate value score (0-100)
  const calculateValueScore = () => {
    if (!buildPrice || !lowestPrice) return 50;

    let score = 50;

    // Savings vs lowest prices
    const savingsPercent = ((buildPrice - lowestPrice) / buildPrice) * 100;
    if (savingsPercent > 20) score -= 20;
    else if (savingsPercent > 10) score -= 10;
    else if (savingsPercent < 5) score += 10;

    // Compare to prebuilts
    if (prebuilts.length > 0) {
      const cheaperPrebuilts = prebuilts.filter((p) => !p.isMoreExpensive);
      const expensivePrebuilts = prebuilts.filter((p) => p.isMoreExpensive);

      if (cheaperPrebuilts.length > expensivePrebuilts.length) {
        score -= 15;
      } else if (expensivePrebuilts.length > cheaperPrebuilts.length) {
        score += 15;
      }
    }

    return Math.max(0, Math.min(100, score));
  };

  const valueScore = calculateValueScore();

  const getValueColor = (score) => {
    if (score >= 70) return "#10b981"; // green
    if (score >= 40) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const color = getValueColor(valueScore);

  const getValueRating = (score) => {
    if (score >= 70) return t("comparison.excellentValue", "Excellent Value");
    if (score >= 50) return t("comparison.goodValue", "Good Value");
    if (score >= 30) return t("comparison.fairValue", "Fair Value");
    return t("comparison.considerAlternatives", "Consider Alternatives");
  };

  const getValueExplanation = (score) => {
    if (score >= 70) {
      return t(
        "comparison.excellentExplanation",
        "Your custom build offers great value! You're getting more for your money compared to prebuilt alternatives.",
      );
    }
    if (score >= 50) {
      return t(
        "comparison.goodExplanation",
        "Your build is competitively priced. You're getting good value with the flexibility of choosing your own components.",
      );
    }
    if (score >= 30) {
      return t(
        "comparison.fairExplanation",
        "Your build is fairly priced, but there might be some savings opportunities available.",
      );
    }
    return t(
      "comparison.considerExplanation",
      "There may be better value options available. Consider checking the suggestions below.",
    );
  };

  const getRecommendations = (score) => {
    const recommendations = [];

    if (lowestPrice && buildPrice > lowestPrice * 1.1) {
      recommendations.push({
        icon: "💡",
        text: t(
          "comparison.recCheckPrices",
          "Check alternative vendors for lower prices on some components",
        ),
      });
    }

    const cheaperPrebuilts = prebuilts.filter((p) => !p.isMoreExpensive);
    if (cheaperPrebuilts.length > 0) {
      recommendations.push({
        icon: "🖥️",
        text: t(
          "comparison.recCheckPrebuilts",
          "Some prebuilt systems offer similar specs at lower prices",
        ),
      });
    }

    if (score >= 70) {
      recommendations.push({
        icon: "✅",
        text: t(
          "comparison.recGreatChoice",
          "Great choice! Your custom build offers excellent value",
        ),
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: "👍",
        text: t(
          "comparison.recGoodBuild",
          "Your build is well-balanced for the price",
        ),
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations(valueScore);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        ⚖️ {t("comparison.valueScore", "Value Score")}
      </h3>

      <div className={styles.valueMeter}>
        <div
          className={styles.meterCircle}
          style={{
            background: `conic-gradient(${color} ${valueScore}%, #e5e7eb ${valueScore}%)`,
          }}
        >
          <div className={styles.meterInner}>
            <div className={styles.meterValue} style={{ color }}>
              {valueScore}
            </div>
            <div className={styles.meterLabel}>
              {t("comparison.outOf100", "/ 100")}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.valueDescription}>
        <h4 className={styles.valueRating} style={{ color }}>
          {getValueRating(valueScore)}
        </h4>
        <p className={styles.valueExplanation}>
          {getValueExplanation(valueScore)}
        </p>
      </div>

      <div className={styles.recommendationList}>
        <h4 className={styles.recommendationTitle}>
          💡 {t("comparison.recommendations", "Recommendations")}
        </h4>
        {recommendations.map((rec, index) => (
          <div className={styles.recommendationItem} key={index}>
            <span className={styles.recommendationIcon}>{rec.icon}</span>
            <span>{rec.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
