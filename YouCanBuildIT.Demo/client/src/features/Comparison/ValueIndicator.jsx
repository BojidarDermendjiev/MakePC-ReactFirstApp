import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ValueMeter = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MeterCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => props.$color} ${(props) => props.$percentage}%,
    #e5e7eb ${(props) => props.$percentage}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MeterInner = styled.div`
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MeterValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.$color};
`;

const MeterLabel = styled.div`
  font-size: 0.65rem;
  color: #666;
  text-transform: uppercase;
`;

const ValueDescription = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const ValueRating = styled.h4`
  font-size: 1.25rem;
  color: ${(props) => props.$color};
  margin-bottom: 0.5rem;
`;

const ValueExplanation = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const RecommendationList = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const RecommendationTitle = styled.h4`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.75rem;
`;

const RecommendationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #666;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RecommendationIcon = styled.span`
  flex-shrink: 0;
`;

export default function ValueIndicator({ buildPrice, lowestPrice, prebuilts = [] }) {
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
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

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
        "Your custom build offers great value! You're getting more for your money compared to prebuilt alternatives."
      );
    }
    if (score >= 50) {
      return t(
        "comparison.goodExplanation",
        "Your build is competitively priced. You're getting good value with the flexibility of choosing your own components."
      );
    }
    if (score >= 30) {
      return t(
        "comparison.fairExplanation",
        "Your build is fairly priced, but there might be some savings opportunities available."
      );
    }
    return t(
      "comparison.considerExplanation",
      "There may be better value options available. Consider checking the suggestions below."
    );
  };

  const getRecommendations = (score) => {
    const recommendations = [];

    if (lowestPrice && buildPrice > lowestPrice * 1.1) {
      recommendations.push({
        icon: "💡",
        text: t("comparison.recCheckPrices", "Check alternative vendors for lower prices on some components"),
      });
    }

    const cheaperPrebuilts = prebuilts.filter((p) => !p.isMoreExpensive);
    if (cheaperPrebuilts.length > 0) {
      recommendations.push({
        icon: "🖥️",
        text: t("comparison.recCheckPrebuilts", "Some prebuilt systems offer similar specs at lower prices"),
      });
    }

    if (score >= 70) {
      recommendations.push({
        icon: "✅",
        text: t("comparison.recGreatChoice", "Great choice! Your custom build offers excellent value"),
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: "👍",
        text: t("comparison.recGoodBuild", "Your build is well-balanced for the price"),
      });
    }

    return recommendations;
  };

  const color = getValueColor(valueScore);
  const recommendations = getRecommendations(valueScore);

  return (
    <Container>
      <Title>⚖️ {t("comparison.valueScore", "Value Score")}</Title>

      <ValueMeter>
        <MeterCircle $color={color} $percentage={valueScore}>
          <MeterInner>
            <MeterValue $color={color}>{valueScore}</MeterValue>
            <MeterLabel>{t("comparison.outOf100", "/ 100")}</MeterLabel>
          </MeterInner>
        </MeterCircle>
      </ValueMeter>

      <ValueDescription>
        <ValueRating $color={color}>{getValueRating(valueScore)}</ValueRating>
        <ValueExplanation>{getValueExplanation(valueScore)}</ValueExplanation>
      </ValueDescription>

      <RecommendationList>
        <RecommendationTitle>
          💡 {t("comparison.recommendations", "Recommendations")}
        </RecommendationTitle>
        {recommendations.map((rec, index) => (
          <RecommendationItem key={index}>
            <RecommendationIcon>{rec.icon}</RecommendationIcon>
            <span>{rec.text}</span>
          </RecommendationItem>
        ))}
      </RecommendationList>
    </Container>
  );
}
