import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/componentStep.module.css";

export default function ComponentStep({
  componentType,
  products = [],
  suggestions = [],
  selectedItem,
  onSelect,
  onRemove,
  loading,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  return (
    <div className={styles.container}>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>
          {getComponentIcon(componentType)}{" "}
          {t(`builder.select${componentType}`, `Select ${componentType}`)}
        </h2>
      </div>

      {selectedItem && (
        <div className={styles.selectedComponent}>
          {selectedItem.productImageUrl ? (
            <img
              className={styles.selectedImage}
              src={selectedItem.productImageUrl}
              alt={selectedItem.productName}
            />
          ) : (
            <div className={styles.selectedPlaceholder}>
              {getComponentIcon(componentType)}
            </div>
          )}
          <div className={styles.selectedInfo}>
            <h3 className={styles.selectedName}>{selectedItem.productName}</h3>
            <p className={styles.selectedBrand}>{selectedItem.brandName}</p>
            <p className={styles.selectedPrice}>
              {selectedItem.priceBgn?.toFixed(2)} лв.
            </p>
          </div>
          <button
            className={styles.removeButton}
            onClick={() => onRemove(selectedItem.id)}
          >
            {t("builder.remove", "Remove")}
          </button>
        </div>
      )}

      <input
        className={styles.searchInput}
        type="text"
        placeholder={t("builder.searchProducts", "Search products...")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <div className={styles.suggestionsSection}>
          <h3 className={styles.sectionTitle}>
            ⭐ {t("builder.recommended", "Recommended for Your Build")}
          </h3>
          <div className={styles.productGrid}>
            {suggestions.slice(0, 3).map((suggestion) => (
              <div className={styles.productCard} key={suggestion.productId}>
                <span className={styles.recommendedBadge}>
                  {suggestion.reason}
                </span>
                {suggestion.imageUrl ? (
                  <img
                    className={styles.productImage}
                    src={suggestion.imageUrl}
                    alt={suggestion.productName}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    {getComponentIcon(componentType)}
                  </div>
                )}
                <h4 className={styles.productName}>{suggestion.productName}</h4>
                <p className={styles.productBrand}>{suggestion.brandName}</p>
                <p className={styles.productPrice}>
                  {suggestion.priceBgn?.toFixed(2)} лв.
                </p>
                <button
                  className={styles.addButton}
                  onClick={() =>
                    onSelect({
                      id: suggestion.productId,
                      name: suggestion.productName,
                      price: suggestion.priceBgn,
                    })
                  }
                  disabled={loading || !!selectedItem}
                >
                  {t("builder.addToBuild", "Add to Build")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className={styles.sectionTitle}>
        {t("builder.allProducts", "All Products")}
      </h3>

      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div className={styles.productCard} key={product.id}>
              {product.imageUrl ? (
                <img
                  className={styles.productImage}
                  src={product.imageUrl}
                  alt={product.name}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  {getComponentIcon(componentType)}
                </div>
              )}
              <h4 className={styles.productName}>{product.name}</h4>
              <p className={styles.productBrand}>
                {product.brand?.name || product.brandName}
              </p>
              <p className={styles.productPrice}>
                {product.price?.toFixed(2)} лв.
              </p>
              <button
                className={styles.addButton}
                onClick={() => onSelect(product)}
                disabled={loading || !!selectedItem}
              >
                {t("builder.addToBuild", "Add to Build")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}>
          {t(
            "builder.noProducts",
            "No products found for this component type.",
          )}
        </div>
      )}
    </div>
  );
}
