import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../assets/styles/secondHandCard.module.css";

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const SecondHandCard = ({ listing, index = 0 }) => {
  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  const status = statusLabels[listing.status] || "Active";
  const badgeClass =
    status === "Sold"
      ? styles.statusSold
      : status === "Inactive"
        ? styles.statusInactive
        : status === "Active"
          ? styles.statusActive
          : styles.statusDefault;

  return (
    <Link
      to={`/secondhand/${listing.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={listing.imageUrl || "/placeholder-product.png"}
          alt={listing.title}
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
        <span className={`${styles.statusBadge} ${badgeClass}`}>{status}</span>
        {listing.viewCount > 0 && (
          <span className={styles.viewCount}>
            <EyeIcon />
            {listing.viewCount}
          </span>
        )}
      </div>

      <div className={styles.content}>
        {listing.category && (
          <span className={styles.category}>
            {listing.category.name?.value || listing.category.name}
          </span>
        )}
        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>{listing.price?.toFixed(2)}</span>
          <span className={styles.currency}>BGN</span>
          {listing.originalPrice && listing.originalPrice > listing.price && (
            <span className={styles.originalPrice}>
              {listing.originalPrice.toFixed(2)} BGN
            </span>
          )}
        </div>

        {listing.location && (
          <div className={styles.location}>
            <LocationIcon />
            {listing.location}
          </div>
        )}

        <div className={styles.sellerInfo}>
          <span className={styles.seller}>
            {listing.seller?.fullName?.value ||
              listing.seller?.fullName ||
              "Seller"}
          </span>
          <span
            className={`${styles.shippingBadge} ${
              listing.offersShipping
                ? styles.shippingOffers
                : styles.shippingPickup
            }`}
          >
            {listing.offersShipping ? "Ships" : "Pickup only"}
          </span>
        </div>
      </div>
    </Link>
  );
};

SecondHandCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    imageUrl: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    viewCount: PropTypes.number,
    location: PropTypes.string,
    offersShipping: PropTypes.bool,
    category: PropTypes.object,
    seller: PropTypes.object,
  }).isRequired,
  index: PropTypes.number,
};

export const SecondHandCardSkeleton = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div
        className={styles.skeletonText}
        style={{ height: "12px", width: "60px", marginBottom: "8px" }}
      />
      <div
        className={styles.skeletonText}
        style={{ height: "20px", width: "90%", marginBottom: "8px" }}
      />
      <div
        className={styles.skeletonText}
        style={{ height: "24px", width: "40%", marginBottom: "12px" }}
      />
      <div
        className={styles.skeletonText}
        style={{ height: "14px", width: "50%" }}
      />
    </div>
  </div>
);

export default SecondHandCard;
