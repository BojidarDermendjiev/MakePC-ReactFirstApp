import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../assets/styles/keyboardCard.module.css";

const SwitchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 5h10v2h-10v-2zm0 12h10v2h-10v-2zm0-6h10v2h-10v-2z" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
);

const LightIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
  </svg>
);

export const KeyboardCard = ({ keyboard, index = 0 }) => {
  const specs = keyboard.specs;

  const stockClass = keyboard.stock > 0 ? styles.inStock : styles.outOfStock;

  return (
    <Link
      to={`/keyboards/${keyboard.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={keyboard.imageUrl || "/placeholder-keyboard.png"}
          alt={keyboard.name}
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
        <div className={styles.badgeRow}>
          {specs?.size && (
            <span
              className={styles.badge}
              style={{ background: "#e0e7ff", color: "#3730a3" }}
            >
              {specs.size}
            </span>
          )}
          {specs?.switchCharacteristic && (
            <span
              className={styles.badge}
              style={{ background: "#fef3c7", color: "#92400e" }}
            >
              {specs.switchCharacteristic}
            </span>
          )}
        </div>
        <span className={`${styles.stockBadge} ${stockClass}`}>
          {keyboard.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className={styles.content}>
        {keyboard.brandName && (
          <span className={styles.brand}>{keyboard.brandName}</span>
        )}
        <h3 className={styles.title}>{keyboard.name}</h3>

        {specs && (
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <SwitchIcon />
              <span>{specs.switchType}</span>
            </div>
            <div className={styles.specItem}>
              <KeyboardIcon />
              <span>{specs.layout}</span>
            </div>
            <div className={styles.specItem}>
              <WifiIcon />
              <span>{specs.connectivity}</span>
            </div>
            {specs.hasBacklight && (
              <div className={styles.specItem}>
                <LightIcon />
                <span>{specs.backlightType || "Backlit"}</span>
              </div>
            )}
          </div>
        )}

        <div className={styles.priceRow}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>{keyboard.price?.toFixed(2)}</span>
            <span className={styles.currency}>BGN</span>
          </div>
          <div className={styles.featureBadges}>
            {specs?.isHotswap && (
              <span className={styles.featureBadge}>Hot-swap</span>
            )}
            {specs?.hasNkro && (
              <span className={styles.featureBadge}>NKRO</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

KeyboardCard.propTypes = {
  keyboard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brandName: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number,
    imageUrl: PropTypes.string,
    specs: PropTypes.shape({
      layout: PropTypes.string,
      switchType: PropTypes.string,
      switchCharacteristic: PropTypes.string,
      size: PropTypes.string,
      connectivity: PropTypes.string,
      hasBacklight: PropTypes.bool,
      backlightType: PropTypes.string,
      isHotswap: PropTypes.bool,
      hasNkro: PropTypes.bool,
    }),
  }).isRequired,
  index: PropTypes.number,
};

export default KeyboardCard;
