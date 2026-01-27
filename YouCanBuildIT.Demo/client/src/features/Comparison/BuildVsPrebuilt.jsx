import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const PrebuiltGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const PrebuiltCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PrebuiltBadge = styled.span`
  position: absolute;
  top: -10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  ${(props) =>
    props.$cheaper
      ? `
    background: #dcfce7;
    color: #166534;
  `
      : `
    background: #fee2e2;
    color: #991b1b;
  `}
`;

const PrebuiltImage = styled.div`
  width: 100%;
  height: 120px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PrebuiltPlaceholder = styled.div`
  font-size: 3rem;
`;

const PrebuiltName = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PrebuiltVendor = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

const PrebuiltPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
`;

const PriceDiff = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) => (props.$cheaper ? "#10b981" : "#ef4444")};
`;

const ComparisonBar = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const BarLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
  min-width: 100px;
`;

const Bar = styled.div`
  flex: 1;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const BarFill = styled.div`
  height: 100%;
  background: ${(props) => props.$color || "#2563eb"};
  width: ${(props) => props.$width}%;
  transition: width 0.3s ease;
`;

const BarValue = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export default function BuildVsPrebuilt({ buildPrice, prebuilts = [] }) {
  const { t } = useTranslation();

  const maxPrice = Math.max(buildPrice, ...prebuilts.map((p) => p.priceBgn));

  return (
    <Container>
      <Title>🆚 {t("comparison.vsPrebuilt", "Build vs Prebuilt")}</Title>
      <Description>
        {t("comparison.vsDescription", "See how your custom build compares to similar prebuilt systems from retailers.")}
      </Description>

      {prebuilts.length > 0 ? (
        <>
          <ComparisonBar>
            <strong>{t("comparison.priceComparison", "Price Comparison")}</strong>
            <BarContainer>
              <BarLabel>{t("comparison.yourBuild", "Your Build")}</BarLabel>
              <Bar>
                <BarFill $color="#2563eb" $width={(buildPrice / maxPrice) * 100} />
                <BarValue>{buildPrice.toFixed(2)} лв.</BarValue>
              </Bar>
            </BarContainer>
            {prebuilts.slice(0, 3).map((prebuilt, index) => (
              <BarContainer key={prebuilt.id}>
                <BarLabel style={{ fontSize: "0.8rem" }}>
                  {prebuilt.name.substring(0, 15)}...
                </BarLabel>
                <Bar>
                  <BarFill
                    $color={prebuilt.isMoreExpensive ? "#ef4444" : "#10b981"}
                    $width={(prebuilt.priceBgn / maxPrice) * 100}
                  />
                  <BarValue>{prebuilt.priceBgn.toFixed(2)} лв.</BarValue>
                </Bar>
              </BarContainer>
            ))}
          </ComparisonBar>

          <PrebuiltGrid style={{ marginTop: "1.5rem" }}>
            {prebuilts.map((prebuilt) => (
              <PrebuiltCard key={prebuilt.id}>
                <PrebuiltBadge $cheaper={!prebuilt.isMoreExpensive}>
                  {prebuilt.isMoreExpensive
                    ? `+${prebuilt.priceDifference.toFixed(0)} лв.`
                    : `-${prebuilt.priceDifference.toFixed(0)} лв.`}
                </PrebuiltBadge>
                <PrebuiltImage>
                  {prebuilt.imageUrl ? (
                    <img src={prebuilt.imageUrl} alt={prebuilt.name} />
                  ) : (
                    <PrebuiltPlaceholder>🖥️</PrebuiltPlaceholder>
                  )}
                </PrebuiltImage>
                <PrebuiltName>{prebuilt.name}</PrebuiltName>
                <PrebuiltVendor>📍 {prebuilt.vendorName}</PrebuiltVendor>
                <PriceRow>
                  <PrebuiltPrice>{prebuilt.priceBgn.toFixed(2)} лв.</PrebuiltPrice>
                  <PriceDiff $cheaper={!prebuilt.isMoreExpensive}>
                    {prebuilt.isMoreExpensive
                      ? t("comparison.moreExpensive", "More expensive")
                      : t("comparison.cheaper", "Cheaper")}
                  </PriceDiff>
                </PriceRow>
              </PrebuiltCard>
            ))}
          </PrebuiltGrid>
        </>
      ) : (
        <EmptyState>
          <p>🔍 {t("comparison.noPrebuilts", "No similar prebuilt systems found")}</p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            {t("comparison.uniqueBuild", "Your build is unique! We couldn't find comparable prebuilt systems.")}
          </p>
        </EmptyState>
      )}
    </Container>
  );
}
