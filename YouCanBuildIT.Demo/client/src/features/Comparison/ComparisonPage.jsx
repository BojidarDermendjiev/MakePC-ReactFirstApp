import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import * as priceComparisonService from "../../api/priceComparisonService";
import * as buildService from "../../api/buildService";
import BuildVsPrebuilt from "./BuildVsPrebuilt";
import PriceChart from "./PriceChart";
import ValueIndicator from "./ValueIndicator";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${(props) => props.$bg || "#f9fafb"};
  border-radius: 8px;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.$color || "#333"};
`;

const SummaryLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
`;

const ComponentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ComponentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const ComponentInfo = styled.div`
  flex: 1;
`;

const ComponentType = styled.span`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
`;

const ComponentName = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-top: 0.25rem;
`;

const PriceInfo = styled.div`
  text-align: right;
`;

const OriginalPrice = styled.div`
  font-size: 0.85rem;
  color: #666;
  text-decoration: ${(props) => (props.$hasLower ? "line-through" : "none")};
`;

const LowestPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #10b981;
`;

const OfferCount = styled.span`
  font-size: 0.75rem;
  color: #2563eb;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

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
      <Container>
        <Loading>{t("loading", "Loading...")}</Loading>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <BackLink to="/builder/my-builds">
          ← {t("comparison.backToBuilds", "Back to My Builds")}
        </BackLink>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!comparison) {
    return (
      <Container>
        <BackLink to="/builder/my-builds">
          ← {t("comparison.backToBuilds", "Back to My Builds")}
        </BackLink>
        <ErrorMessage>
          {t("comparison.notFound", "Build not found")}
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to="/builder/my-builds">
        ← {t("comparison.backToBuilds", "Back to My Builds")}
      </BackLink>

      <Header>
        <Title>{t("comparison.title", "Price Comparison")}</Title>
        <Subtitle>
          {t("comparison.subtitle", "Compare prices for")} "
          {comparison.buildName}"
        </Subtitle>
      </Header>

      <Grid>
        <MainSection>
          <Card>
            <CardTitle>
              💰 {t("comparison.priceBreakdown", "Price Breakdown")}
            </CardTitle>

            <SummaryGrid>
              <SummaryItem $bg="#eff6ff">
                <SummaryValue $color="#2563eb">
                  {comparison.totalBuildCost?.toFixed(2)} лв.
                </SummaryValue>
                <SummaryLabel>
                  {t("comparison.yourBuildCost", "Your Build Cost")}
                </SummaryLabel>
              </SummaryItem>

              <SummaryItem $bg="#ecfdf5">
                <SummaryValue $color="#10b981">
                  {comparison.lowestComponentsCost?.toFixed(2)} лв.
                </SummaryValue>
                <SummaryLabel>
                  {t("comparison.lowestPossible", "Lowest Possible")}
                </SummaryLabel>
              </SummaryItem>

              <SummaryItem $bg={comparison.savings > 0 ? "#fef3c7" : "#f3f4f6"}>
                <SummaryValue
                  $color={comparison.savings > 0 ? "#d97706" : "#666"}
                >
                  {comparison.savings > 0
                    ? `${comparison.savings.toFixed(2)} лв.`
                    : "-"}
                </SummaryValue>
                <SummaryLabel>
                  {t("comparison.potentialSavings", "Potential Savings")}
                </SummaryLabel>
              </SummaryItem>
            </SummaryGrid>

            <ComponentList>
              {comparison.components?.map((component) => (
                <ComponentRow key={component.productId}>
                  <ComponentInfo>
                    <ComponentType>{component.componentType}</ComponentType>
                    <ComponentName>{component.productName}</ComponentName>
                  </ComponentInfo>
                  <PriceInfo>
                    <OriginalPrice
                      $hasLower={
                        component.lowestPrice &&
                        component.lowestPrice < component.originalPrice
                      }
                    >
                      {component.originalPrice.toFixed(2)} лв.
                    </OriginalPrice>
                    {component.lowestPrice &&
                      component.lowestPrice < component.originalPrice && (
                        <LowestPrice>
                          {component.lowestPrice.toFixed(2)} лв.
                        </LowestPrice>
                      )}
                    {component.offers?.length > 0 && (
                      <OfferCount>
                        {component.offers.length}{" "}
                        {t("comparison.offers", "offers")}
                      </OfferCount>
                    )}
                  </PriceInfo>
                </ComponentRow>
              ))}
            </ComponentList>
          </Card>

          <BuildVsPrebuilt
            buildPrice={comparison.totalBuildCost}
            prebuilts={comparison.similarPrebuilts}
          />
        </MainSection>

        <Sidebar>
          <ValueIndicator
            buildPrice={comparison.totalBuildCost}
            lowestPrice={comparison.lowestComponentsCost}
            prebuilts={comparison.similarPrebuilts}
          />

          {build && (
            <Card>
              <CardTitle>
                🖥️ {t("comparison.buildSummary", "Build Summary")}
              </CardTitle>
              <p>
                <strong>{build.name}</strong>
              </p>
              <p style={{ color: "#666", marginTop: "0.5rem" }}>
                {build.purpose}
              </p>
              <p style={{ marginTop: "1rem" }}>
                {build.items?.length || 0}{" "}
                {t("comparison.components", "components")}
              </p>
            </Card>
          )}
        </Sidebar>
      </Grid>
    </Container>
  );
}
