import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: auto;

  ${(props) =>
    props.$compatible
      ? `
    background: #dcfce7;
    color: #166534;
  `
      : `
    background: #fee2e2;
    color: #991b1b;
  `}
`;

const Section = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IssueList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IssueItem = styled.li`
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${(props) =>
    props.$type === "error"
      ? `
    background: #fef2f2;
    color: #991b1b;
    border-left: 3px solid #dc2626;
  `
      : `
    background: #fffbeb;
    color: #92400e;
    border-left: 3px solid #f59e0b;
  `}
`;

const IssueIcon = styled.span`
  flex-shrink: 0;
`;

const IssueText = styled.span`
  flex: 1;
`;

const MissingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MissingBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #fef2f2;
  color: #991b1b;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const WattageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f0f9ff;
  border-radius: 8px;
`;

const WattageLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const WattageValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0369a1;
`;

const NoIssues = styled.div`
  padding: 1rem;
  text-align: center;
  color: #166534;
  background: #dcfce7;
  border-radius: 8px;
  font-size: 0.9rem;
`;

export default function CompatibilityAlert({ compatibility }) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  if (!compatibility) return null;

  const { isCompatible, issues = [], warnings = [], missingComponents = [], estimatedWattage, hasAllRequiredComponents } = compatibility;

  const getMessage = (item) => {
    return language === "bg" ? item.messageBg : item.messageEn;
  };

  const translateComponent = (comp) => {
    const translations = {
      CPU: t("builder.cpu", "CPU"),
      Motherboard: t("builder.motherboard", "Motherboard"),
      RAM: t("builder.ram", "RAM"),
      GPU: t("builder.gpu", "GPU"),
      Storage: t("builder.storage", "Storage"),
      PSU: t("builder.psu", "PSU"),
      Case: t("builder.case", "Case"),
      Cooler: t("builder.cooler", "Cooler"),
    };
    return translations[comp] || comp;
  };

  return (
    <Container>
      <Title>
        🔍 {t("builder.compatibility", "Compatibility")}
        <StatusBadge $compatible={isCompatible}>
          {isCompatible ? "✓ " : "✗ "}
          {isCompatible
            ? t("builder.compatible", "Compatible")
            : t("builder.incompatible", "Issues Found")}
        </StatusBadge>
      </Title>

      {estimatedWattage > 0 && (
        <Section>
          <WattageInfo>
            <WattageLabel>⚡ {t("builder.estimatedWattage", "Estimated Wattage")}</WattageLabel>
            <WattageValue>{estimatedWattage}W</WattageValue>
          </WattageInfo>
        </Section>
      )}

      {missingComponents.length > 0 && (
        <Section>
          <SectionTitle>
            📋 {t("builder.missingComponents", "Missing Required Components")}
          </SectionTitle>
          <MissingList>
            {missingComponents.map((comp) => (
              <MissingBadge key={comp}>{translateComponent(comp)}</MissingBadge>
            ))}
          </MissingList>
        </Section>
      )}

      {issues.length > 0 && (
        <Section>
          <SectionTitle>
            ❌ {t("builder.compatibilityIssues", "Compatibility Issues")}
          </SectionTitle>
          <IssueList>
            {issues.map((issue, index) => (
              <IssueItem key={index} $type="error">
                <IssueIcon>⚠️</IssueIcon>
                <IssueText>
                  <strong>{issue.sourceComponent} ↔ {issue.targetComponent}:</strong>{" "}
                  {getMessage(issue)}
                </IssueText>
              </IssueItem>
            ))}
          </IssueList>
        </Section>
      )}

      {warnings.length > 0 && (
        <Section>
          <SectionTitle>
            ⚠️ {t("builder.warnings", "Warnings")}
          </SectionTitle>
          <IssueList>
            {warnings.map((warning, index) => (
              <IssueItem key={index} $type="warning">
                <IssueIcon>💡</IssueIcon>
                <IssueText>
                  <strong>{warning.component}:</strong> {getMessage(warning)}
                </IssueText>
              </IssueItem>
            ))}
          </IssueList>
        </Section>
      )}

      {isCompatible && issues.length === 0 && warnings.length === 0 && hasAllRequiredComponents && (
        <NoIssues>
          ✅ {t("builder.allGood", "All components are compatible!")}
        </NoIssues>
      )}
    </Container>
  );
}
