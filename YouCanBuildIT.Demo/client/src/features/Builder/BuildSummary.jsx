import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/buildSummary.module.css";

export default function BuildSummary({ build, onRemoveItem }) {
  const { t } = useTranslation();

  if (!build) return null;

  const {
    name,
    purpose,
    items = [],
    totalPriceBgn = 0,
    totalWattage = 0,
  } = build;

  const getComponentIcon = (type) => {
    const icons = {
      CPU: "🧠",
      Motherboard: "📟",
      RAM: "💾",
      GPU: "🎮",
      Storage: "💿",
      PSU: "⚡",
      Case: "🖥️",
      Cooler: "❄️",
    };
    return icons[type] || "🔧";
  };

  const calculateTotal = () =>
    items.reduce(
      (sum, item) => sum + (item.priceBgn || 0) * (item.quantity || 1),
      0,
    );

  const total = totalPriceBgn || calculateTotal();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        🛒 {t("builder.yourBuild", "Your Build")}
      </h3>

      <div className={styles.buildInfo}>
        <h4 className={styles.buildName}>{name}</h4>
        <p className={styles.buildPurpose}>{purpose}</p>
      </div>

      <div className={styles.componentCount}>
        <span>{t("builder.components", "Components")}:</span>
        <span>{items.length} / 8</span>
      </div>

      {items.length > 0 ? (
        <div className={styles.itemList}>
          {items.map((item) => (
            <div className={styles.item} key={item.id}>
              {item.productImageUrl ? (
                <img
                  className={styles.itemImage}
                  src={item.productImageUrl}
                  alt={item.productName}
                />
              ) : (
                <div className={styles.itemPlaceholder}>
                  {getComponentIcon(item.componentType)}
                </div>
              )}
              <div className={styles.itemInfo}>
                <p className={styles.itemType}>{item.componentType}</p>
                <p className={styles.itemName} title={item.productName}>
                  {item.productName}
                </p>
              </div>
              <p className={styles.itemPrice}>
                {(item.priceBgn ?? 0).toFixed(2)} лв.
              </p>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveItem(item.id)}
                title={t("builder.remove", "Remove")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <p>{t("builder.noComponents", "No components added yet")}</p>
          <p className={styles.emptyNote}>
            {t(
              "builder.selectComponents",
              "Select components to build your PC",
            )}
          </p>
        </div>
      )}

      <div className={styles.totalSection}>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>
            {t("builder.total", "Total")}
          </span>
          <span className={styles.totalPrice}>{total.toFixed(2)} лв.</span>
        </div>
        {totalWattage > 0 && (
          <div className={styles.wattageRow}>
            <span>⚡ {t("builder.estimatedPower", "Estimated Power")}</span>
            <span>{totalWattage}W</span>
          </div>
        )}
      </div>
    </div>
  );
}
