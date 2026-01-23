import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSizeGuide } from "../../api/keyboardService";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #6b7280;

  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      color: #1f2937;
    }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 18px;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

const SizesGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const SizeCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const SizeVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SizeName = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
`;

const KeyCount = styled.span`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
`;

const KeyboardIllustration = styled.div`
  width: 100%;
  max-width: 180px;
  height: 60px;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 6px;
    background: repeating-linear-gradient(
      90deg,
      #9ca3af 0px,
      #9ca3af 8px,
      transparent 8px,
      transparent 10px
    );
    border-radius: 4px;
    opacity: 0.3;
  }
`;

const SizeInfo = styled.div``;

const Description = styled.p`
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #4b5563;
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${(props) => (props.$available ? "#059669" : "#9ca3af")};
`;

const FeatureIcon = styled.span`
  font-size: 14px;
`;

const WidthBadge = styled.div`
  padding: 12px 20px;
  background: #f3f4f6;
  border-radius: 12px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const WidthLabel = styled.span`
  display: block;
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const WidthValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const ComparisonSection = styled.div`
  margin-top: 48px;
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #f3f4f6;
  }

  th {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #f9fafb;
  }

  td {
    font-size: 14px;
    color: #374151;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    th,
    td {
      padding: 8px 4px;
    }
  }
`;

const CheckIcon = () => <span style={{ color: "#059669" }}>✓</span>;
const CrossIcon = () => <span style={{ color: "#dc2626" }}>✗</span>;

const CTASection = styled.div`
  text-align: center;
  margin-top: 48px;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(199, 240, 34, 0.4);
  }
`;

const SizeGuide = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const data = await getSizeGuide();
        setSizes(data);
      } catch (err) {
        console.error("Failed to fetch size guide:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <Container>
          <div style={{ textAlign: "center", padding: "60px" }}>Loading guide...</div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/keyboards">Keyboards</Link>
          <span>/</span>
          <span>Size Guide</span>
        </Breadcrumb>

        <Header>
          <Title>Keyboard Size Guide</Title>
          <Subtitle>
            From full-size to ultra-compact, find the perfect keyboard size for your
            desk space and workflow.
          </Subtitle>
        </Header>

        <SizesGrid>
          {sizes.map((size) => (
            <SizeCard key={size.size}>
              <SizeVisual>
                <SizeName>{size.size}</SizeName>
                <KeyCount>{size.keys} keys</KeyCount>
                <KeyboardIllustration />
              </SizeVisual>

              <SizeInfo>
                <Description>{size.description}</Description>
                <FeatureGrid>
                  <Feature $available={size.hasNumpad}>
                    <FeatureIcon>{size.hasNumpad ? "✓" : "✗"}</FeatureIcon>
                    Numpad
                  </Feature>
                  <Feature $available={size.hasFunctionRow}>
                    <FeatureIcon>{size.hasFunctionRow ? "✓" : "✗"}</FeatureIcon>
                    Function Row
                  </Feature>
                  <Feature $available={size.hasNavigationCluster}>
                    <FeatureIcon>{size.hasNavigationCluster ? "✓" : "✗"}</FeatureIcon>
                    Navigation Keys
                  </Feature>
                </FeatureGrid>
              </SizeInfo>

              <WidthBadge>
                <WidthLabel>Width</WidthLabel>
                <WidthValue>{size.width}</WidthValue>
              </WidthBadge>
            </SizeCard>
          ))}
        </SizesGrid>

        <ComparisonSection>
          <SectionTitle>Quick Comparison</SectionTitle>
          <ComparisonTable>
            <thead>
              <tr>
                <th>Size</th>
                <th>Keys</th>
                <th>Numpad</th>
                <th>F-Row</th>
                <th>Nav</th>
                <th>Arrows</th>
                <th>Width</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size.size}>
                  <td>
                    <strong>{size.size}</strong>
                  </td>
                  <td>{size.keys}</td>
                  <td>{size.hasNumpad ? <CheckIcon /> : <CrossIcon />}</td>
                  <td>{size.hasFunctionRow ? <CheckIcon /> : <CrossIcon />}</td>
                  <td>{size.hasNavigationCluster ? <CheckIcon /> : <CrossIcon />}</td>
                  <td>
                    {size.hasNavigationCluster || size.size === "65%" ? (
                      <CheckIcon />
                    ) : (
                      <CrossIcon />
                    )}
                  </td>
                  <td>{size.width}</td>
                </tr>
              ))}
            </tbody>
          </ComparisonTable>
        </ComparisonSection>

        <CTASection>
          <CTAButton to="/keyboards">
            Browse Keyboards
            <span>→</span>
          </CTAButton>
        </CTASection>
      </Container>
    </PageContainer>
  );
};

export default SizeGuide;
