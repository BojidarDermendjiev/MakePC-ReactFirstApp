import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSwitchGuide } from "../../api/keyboardService";
import styles from "../../assets/styles/switchGuide.module.css";

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
        setGuide(data || { guide: [], tips: [] });
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
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading guide...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/keyboards">Keyboards</Link>
          <span>/</span>
          <span>Switch Guide</span>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Mechanical Switch Guide</h1>
          <p className={styles.subtitle}>
            Understanding the differences between switch types will help you
            find the perfect keyboard for your typing style and use case.
          </p>
        </div>

        <div className={styles.guideGrid}>
          {guide.guide.map((switchType) => {
            const colors =
              switchColors[switchType.characteristic] || switchColors.Linear;
            return (
              <div
                className={styles.switchCard}
                key={switchType.characteristic}
              >
                <div className={styles.switchInfo}>
                  <h2
                    className={styles.switchType}
                    style={{ color: colors.main }}
                  >
                    {switchType.characteristic}
                  </h2>
                  <p className={styles.description}>{switchType.description}</p>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Popular Examples</span>
                    <div className={styles.tagList}>
                      {switchType.examples.map((example) => (
                        <span
                          key={example}
                          className={styles.tag}
                          style={{ background: colors.bg, color: colors.main }}
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Best For</span>
                    <div className={styles.tagList}>
                      {switchType.bestFor.map((use) => (
                        <span key={use} className={styles.tag}>
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={styles.switchVisual}
                  style={{ background: colors.bg }}
                >
                  <div className={styles.switchIcon}>
                    {switchIcons[switchType.characteristic]}
                  </div>
                  <div className={styles.actuationForce}>
                    <span className={styles.forceLabel}>
                      Typical Actuation Force
                    </span>
                    <span className={styles.forceValue}>
                      {switchType.actuationForce}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>Pro Tips</h3>
          <ul className={styles.tipsList}>
            {guide.tips.map((tip, index) => (
              <li className={styles.tipItem} key={index}>
                <span className={styles.tipIcon}>✓</span>
                <span className={styles.tipText}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.ctaSection}>
          <Link className={styles.ctaButton} to="/keyboards">
            Browse Keyboards
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SwitchGuide;
