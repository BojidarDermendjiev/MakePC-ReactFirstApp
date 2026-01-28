import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "../../assets/styles/compatibilityAlert.module.css";

export default function CompatibilityAlert({ compatibility }) {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  if (!compatibility) return null;

  const {
    isCompatible,
    issues = [],
    warnings = [],
    missingComponents = [],
    estimatedWattage,
    hasAllRequiredComponents,
  } = compatibility;

  const getMessage = (item) =>
    language === "bg" ? item.messageBg : item.messageEn;

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
    <div className={styles.container}>
      <h3 className={styles.title}>
        🔍 {t("builder.compatibility", "Compatibility")}
        <span
          className={`${styles.statusBadge} ${
            isCompatible ? styles.statusCompatible : styles.statusIncompatible
          }`}
        >
          {isCompatible ? "✓ " : "✗ "}
          {isCompatible
            ? t("builder.compatible", "Compatible")
            : t("builder.incompatible", "Issues Found")}
        </span>
      </h3>

      {estimatedWattage > 0 && (
        <div className={styles.section}>
          <div className={styles.wattageInfo}>
            <span className={styles.wattageLabel}>
              ⚡ {t("builder.estimatedWattage", "Estimated Wattage")}
            </span>
            <span className={styles.wattageValue}>{estimatedWattage}W</span>
          </div>
        </div>
      )}

      {missingComponents.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            📋 {t("builder.missingComponents", "Missing Required Components")}
          </h4>
          <div className={styles.missingList}>
            {missingComponents.map((comp) => (
              <span className={styles.missingBadge} key={comp}>
                {translateComponent(comp)}
              </span>
            ))}
          </div>
        </div>
      )}

      {issues.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            ❌ {t("builder.compatibilityIssues", "Compatibility Issues")}
          </h4>
          <ul className={styles.issueList}>
            {issues.map((issue, index) => (
              <li
                key={index}
                className={`${styles.issueItem} ${styles.issueError}`}
              >
                <span className={styles.issueIcon}>⚠️</span>
                <span className={styles.issueText}>
                  <strong>
                    {issue.sourceComponent} ↔ {issue.targetComponent}:
                  </strong>{" "}
                  {getMessage(issue)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            ⚠️ {t("builder.warnings", "Warnings")}
          </h4>
          <ul className={styles.issueList}>
            {warnings.map((warning, index) => (
              <li
                key={index}
                className={`${styles.issueItem} ${styles.issueWarning}`}
              >
                <span className={styles.issueIcon}>💡</span>
                <span className={styles.issueText}>
                  <strong>{warning.component}:</strong> {getMessage(warning)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isCompatible &&
        issues.length === 0 &&
        warnings.length === 0 &&
        hasAllRequiredComponents && (
          <div className={styles.noIssues}>
            ✅ {t("builder.allGood", "All components are compatible!")}
          </div>
        )}
    </div>
  );
}
