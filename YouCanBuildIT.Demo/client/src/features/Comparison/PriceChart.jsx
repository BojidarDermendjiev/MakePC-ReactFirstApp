import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as priceComparisonService from "../../api/priceComparisonService";

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

const ChartContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 1rem 0;
  border-bottom: 2px solid #e5e7eb;
`;

const ChartBar = styled.div`
  flex: 1;
  background: ${(props) => (props.$isLowest ? "#10b981" : "#2563eb")};
  border-radius: 4px 4px 0 0;
  min-height: 10px;
  transition: height 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  display: none;

  ${ChartBar}:hover & {
    display: block;
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.$color || "#333"};
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const NoData = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const TimeRange = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const RangeButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${(props) => (props.$active ? "#2563eb" : "#d1d5db")};
  background: ${(props) => (props.$active ? "#eff6ff" : "white")};
  color: ${(props) => (props.$active ? "#2563eb" : "#666")};
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
  }
`;

export default function PriceChart({ productId, productName }) {
  const { t } = useTranslation();
  const [priceHistory, setPriceHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (productId) {
      fetchPriceHistory();
    }
  }, [productId, days]);

  const fetchPriceHistory = async () => {
    try {
      setLoading(true);
      const data = await priceComparisonService.getPriceHistory(productId, days);
      setPriceHistory(data);
    } catch (error) {
      console.error("Error fetching price history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>📈 {t("comparison.priceHistory", "Price History")}</Title>
        <NoData>{t("loading", "Loading...")}</NoData>
      </Container>
    );
  }

  if (!priceHistory || !priceHistory.history || priceHistory.history.length === 0) {
    return (
      <Container>
        <Title>📈 {t("comparison.priceHistory", "Price History")}</Title>
        <NoData>
          {t("comparison.noHistory", "No price history available for this product")}
        </NoData>
      </Container>
    );
  }

  const { history, currentLowest, highestEver, lowestEver } = priceHistory;
  const maxPrice = Math.max(...history.map((p) => p.priceBgn));
  const minPrice = Math.min(...history.map((p) => p.priceBgn));

  return (
    <Container>
      <Title>📈 {productName || t("comparison.priceHistory", "Price History")}</Title>

      <TimeRange>
        <RangeButton $active={days === 7} onClick={() => setDays(7)}>
          7 {t("comparison.days", "days")}
        </RangeButton>
        <RangeButton $active={days === 30} onClick={() => setDays(30)}>
          30 {t("comparison.days", "days")}
        </RangeButton>
        <RangeButton $active={days === 90} onClick={() => setDays(90)}>
          90 {t("comparison.days", "days")}
        </RangeButton>
      </TimeRange>

      <ChartContainer>
        {history.slice(-30).map((point, index) => {
          const height = ((point.priceBgn - minPrice) / (maxPrice - minPrice || 1)) * 100;
          const isLowest = point.priceBgn === minPrice;

          return (
            <ChartBar
              key={index}
              $isLowest={isLowest}
              style={{ height: `${Math.max(height, 5)}%` }}
            >
              <Tooltip>
                {point.priceBgn.toFixed(2)} лв.
                <br />
                {point.vendorName}
                <br />
                {new Date(point.date).toLocaleDateString()}
              </Tooltip>
            </ChartBar>
          );
        })}
      </ChartContainer>

      <StatsRow>
        <StatItem>
          <StatValue $color="#10b981">{currentLowest.toFixed(2)} лв.</StatValue>
          <StatLabel>{t("comparison.currentLowest", "Current Lowest")}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue $color="#2563eb">{lowestEver.toFixed(2)} лв.</StatValue>
          <StatLabel>{t("comparison.lowestEver", "Lowest Ever")}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue $color="#ef4444">{highestEver.toFixed(2)} лв.</StatValue>
          <StatLabel>{t("comparison.highestEver", "Highest Ever")}</StatLabel>
        </StatItem>
      </StatsRow>
    </Container>
  );
}
