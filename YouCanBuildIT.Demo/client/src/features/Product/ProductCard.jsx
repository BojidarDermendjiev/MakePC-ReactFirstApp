import { useState, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddToCartButton from "../ShoppingCart/AddToCartButton";
import styles from "../../assets/styles/productCard.module.css";

// Icons
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
);

// Skeleton Loading Component
export const ProductCardSkeleton = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div
        className={`${styles.skeletonText} ${styles.skeletonTextLarge}`}
        style={{ width: "40%", marginBottom: "12px" }}
      />
      <div className={styles.skeletonText} style={{ width: "90%" }} />
      <div
        className={styles.skeletonText}
        style={{ width: "70%", marginBottom: "12px" }}
      />
      <div
        className={`${styles.skeletonText} ${styles.skeletonTextSmall}`}
        style={{ width: "50%", marginBottom: "16px" }}
      />
      <div
        className={`${styles.skeletonText} ${styles.skeletonTextXLarge}`}
        style={{ width: "35%", marginBottom: "16px" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          className={`${styles.skeletonText} ${styles.skeletonTextButton}`}
          style={{ width: "50%", marginBottom: 0 }}
        />
        <div
          className={`${styles.skeletonText} ${styles.skeletonTextButton}`}
          style={{ width: "50%", marginBottom: 0 }}
        />
      </div>
    </div>
  </div>
);

// Main Component
const ProductCard = memo(
  ({
    product,
    index = 0,
    onQuickView,
    onWishlistToggle,
    isWishlisted = false,
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const {
      id,
      name,
      price,
      type,
      imageUrl,
      stock,
      condition,
      brand,
      specs,
      category,
    } = product;

    const displayName = name?.value || name || "Unknown Product";
    const brandName = brand?.name?.value || brand?.name || brand || "";
    const categoryName = category?.name?.value || type || "";
    const specsText = specs?.value || specs || "";
    const isNew = condition === 1 || condition === "New";
    const inStock = stock > 0;

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback((e) => {
      setImageError(true);
      e.target.style.display = "none";
    }, []);

    const handleQuickView = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onQuickView?.(product);
      },
      [onQuickView, product],
    );

    const handleWishlistClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onWishlistToggle?.(id);
      },
      [onWishlistToggle, id],
    );

    // Calculate animation delay based on index
    const animationDelay = `${index * 0.05}s`;

    return (
      <div className={styles.card} style={{ animationDelay }}>
        <div className={styles.imageContainer}>
          {(!imageLoaded || imageError) && (
            <div className={styles.imagePlaceholder}>
              <ImageIcon />
            </div>
          )}
          <img
            className={`${styles.productImage} ${imageLoaded && !imageError ? styles.productImageLoaded : styles.productImageLoading}`}
            src={imageUrl || "/placeholder-product.png"}
            alt={displayName}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className={styles.badgeContainer}>
            <span
              className={`${styles.badge} ${isNew ? styles.conditionBadgeNew : styles.conditionBadgeUsed}`}
            >
              {isNew ? "New" : "Used"}
            </span>
            <span
              className={`${styles.badge} ${inStock ? styles.stockBadgeInStock : styles.stockBadgeOutOfStock}`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className={styles.quickActions}>
            {onQuickView && (
              <button
                className={styles.quickActionButton}
                onClick={handleQuickView}
                title="Quick View"
              >
                <EyeIcon />
              </button>
            )}
            {onWishlistToggle && (
              <button
                className={styles.quickActionButton}
                onClick={handleWishlistClick}
                title="Add to Wishlist"
              >
                <HeartIcon filled={isWishlisted} />
              </button>
            )}
          </div>
        </div>
        <div className={styles.cardContent}>
          {categoryName && (
            <span className={styles.categoryTag}>{categoryName}</span>
          )}
          <h3 className={styles.productName} title={displayName}>
            {displayName}
          </h3>
          <div className={styles.brandRow}>
            {brandName && <span className={styles.brandName}>{brandName}</span>}
          </div>
          {specsText && (
            <p className={styles.specs} title={specsText}>
              {specsText}
            </p>
          )}
          <div className={styles.priceRow}>
            <span className={styles.price}>
              ${parseFloat(price).toFixed(2)}
            </span>
          </div>
          <div className={styles.buttonsContainer}>
            <Link to={`/products/${id}`} className={styles.viewButton}>
              <EyeIcon />
              Details
            </Link>
            <div className={styles.addToCartWrapper}>
              <AddToCartButton
                productId={id}
                disabled={!inStock}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

HeartIcon.propTypes = {
  filled: PropTypes.bool,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
    imageUrl: PropTypes.string,
    stock: PropTypes.number,
    condition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    brand: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    specs: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  index: PropTypes.number,
  onQuickView: PropTypes.func,
  onWishlistToggle: PropTypes.func,
  isWishlisted: PropTypes.bool,
};

export default ProductCard;
