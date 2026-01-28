import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSizeGuide } from "../../api/keyboardService";
import styles from "../../assets/styles/sizeGuide.module.css";

const CheckIcon = () => <span className={styles.checkIcon}>✓</span>;
const CrossIcon = () => <span className={styles.crossIcon}>✗</span>;

const SizeGuide = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const data = await getSizeGuide();
        setSizes(data || []);
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
          <span>Size Guide</span>
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>Keyboard Size Guide</h1>
          <p className={styles.subtitle}>
            From full-size to ultra-compact, find the perfect keyboard size for
            your desk space and workflow.
          </p>
        </div>

        <div className={styles.sizesGrid}>
          {sizes.map((size) => (
            <div className={styles.sizeCard} key={size.size}>
              <div className={styles.sizeVisual}>
                <h3 className={styles.sizeName}>{size.size}</h3>
                <span className={styles.keyCount}>{size.keys} keys</span>
                <div className={styles.keyboardIllustration} />
              </div>

              <div className={styles.sizeInfo}>
                <p className={styles.description}>{size.description}</p>
                <div className={styles.featureGrid}>
                  <div
                    className={`${styles.feature} ${
                      size.hasNumpad
                        ? styles.featureAvailable
                        : styles.featureUnavailable
                    }`}
                  >
                    <span className={styles.featureIcon}>
                      {size.hasNumpad ? "✓" : "✗"}
                    </span>
                    Numpad
                  </div>
                  <div
                    className={`${styles.feature} ${
                      size.hasFunctionRow
                        ? styles.featureAvailable
                        : styles.featureUnavailable
                    }`}
                  >
                    <span className={styles.featureIcon}>
                      {size.hasFunctionRow ? "✓" : "✗"}
                    </span>
                    Function Row
                  </div>
                  <div
                    className={`${styles.feature} ${
                      size.hasNavigationCluster
                        ? styles.featureAvailable
                        : styles.featureUnavailable
                    }`}
                  >
                    <span className={styles.featureIcon}>
                      {size.hasNavigationCluster ? "✓" : "✗"}
                    </span>
                    Navigation Keys
                  </div>
                </div>
              </div>

              <div className={styles.widthBadge}>
                <span className={styles.widthLabel}>Width</span>
                <span className={styles.widthValue}>{size.width}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.comparisonSection}>
          <h3 className={styles.sectionTitle}>Quick Comparison</h3>
          <table className={styles.comparisonTable}>
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
                  <td>
                    {size.hasNavigationCluster ? <CheckIcon /> : <CrossIcon />}
                  </td>
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
          </table>
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

export default SizeGuide;
