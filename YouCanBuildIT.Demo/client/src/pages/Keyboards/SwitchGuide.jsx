import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSwitchGuide } from "../../api/keyboardService";

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

const GuideGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 48px;
`;

const SwitchCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SwitchInfo = styled.div``;

const SwitchType = styled.h2`
  margin: 0 0 16px;
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.$color || "#1f2937"};
`;

const Description = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.7;
  color: #4b5563;
`;

const InfoRow = styled.div`
  margin-bottom: 16px;
`;

const InfoLabel = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => props.$bg || "#f3f4f6"};
  color: ${(props) => props.$color || "#374151"};
`;

const SwitchVisual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.$bg || "#f3f4f6"};
  border-radius: 12px;
  padding: 32px;
`;

const SwitchIcon = styled.div`
  font-size: 72px;
  margin-bottom: 16px;
`;

const ActuationForce = styled.div`
  text-align: center;
`;

const ForceLabel = styled.span`
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const ForceValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const TipsSection = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const TipsTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;

const TipsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const TipIcon = styled.span`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const TipText = styled.span`
  font-size: 15px;
  line-height: 1.6;
  color: #4b5563;
`;

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

const switchColors = {
  Linear: { main: "#ef4444", bg: "#fef2f2" },
  Tactile: { main: "#8b5cf6", bg: "#f5f3ff" },
  Clicky: { main: "#3b82f6", bg: "#eff6ff" },
};

const switchIcons = {
  Linear: "🔴",
  Tactile: "🟣",
  Clicky: "🔵",
};

const SwitchGuide = () => {
  const [guide, setGuide] = useState({ guide: [], tips: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const data = await getSwitchGuide();
        setGuide(data);
      } catch (err) {
        console.error("Failed to fetch switch guide:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
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
          <span>Switch Guide</span>
        </Breadcrumb>

        <Header>
          <Title>Mechanical Switch Guide</Title>
          <Subtitle>
            Understanding the differences between switch types will help you find the
            perfect keyboard for your typing style and use case.
          </Subtitle>
        </Header>

        <GuideGrid>
          {guide.guide.map((switchType) => {
            const colors = switchColors[switchType.characteristic] || switchColors.Linear;
            return (
              <SwitchCard key={switchType.characteristic}>
                <SwitchInfo>
                  <SwitchType $color={colors.main}>{switchType.characteristic}</SwitchType>
                  <Description>{switchType.description}</Description>

                  <InfoRow>
                    <InfoLabel>Popular Examples</InfoLabel>
                    <TagList>
                      {switchType.examples.map((example) => (
                        <Tag key={example} $bg={colors.bg} $color={colors.main}>
                          {example}
                        </Tag>
                      ))}
                    </TagList>
                  </InfoRow>

                  <InfoRow>
                    <InfoLabel>Best For</InfoLabel>
                    <TagList>
                      {switchType.bestFor.map((use) => (
                        <Tag key={use}>{use}</Tag>
                      ))}
                    </TagList>
                  </InfoRow>
                </SwitchInfo>

                <SwitchVisual $bg={colors.bg}>
                  <SwitchIcon>{switchIcons[switchType.characteristic]}</SwitchIcon>
                  <ActuationForce>
                    <ForceLabel>Typical Actuation Force</ForceLabel>
                    <ForceValue>{switchType.actuationForce}</ForceValue>
                  </ActuationForce>
                </SwitchVisual>
              </SwitchCard>
            );
          })}
        </GuideGrid>

        <TipsSection>
          <TipsTitle>Pro Tips</TipsTitle>
          <TipsList>
            {guide.tips.map((tip, index) => (
              <TipItem key={index}>
                <TipIcon>✓</TipIcon>
                <TipText>{tip}</TipText>
              </TipItem>
            ))}
          </TipsList>
        </TipsSection>

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

export default SwitchGuide;
