import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getListingById,
  deleteListing,
  markAsSold,
} from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";
import { CommentList } from "../Comments";
import styles from "../../assets/styles/secondHandDetails.module.css";

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const ShippingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const SecondHandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        console.error("Failed to fetch listing:", err);
        setError("Listing not found");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const isOwner = user && listing && user.id === listing.sellerId;

  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    setDeleting(true);
    try {
      await deleteListing(id);
      navigate("/secondhand/my-listings");
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleMarkAsSold = async () => {
    if (!window.confirm("Mark this item as sold?")) return;

    try {
      await markAsSold(id, user.id);
      setListing((prev) => ({ ...prev, status: "Sold" }));
    } catch (err) {
      console.error("Failed to mark as sold:", err);
      alert("Failed to mark as sold. Please try again.");
    }
  };

  const getAllImages = () => {
    const images = [listing?.imageUrl];
    if (listing?.additionalImageUrls) {
      const additional = listing.additionalImageUrls.split(",").filter(Boolean);
      images.push(...additional);
    }
    return images.filter(Boolean);
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>Loading listing...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <h2>Listing Not Found</h2>
            <p>
              The listing you are looking for does not exist or has been
              removed.
            </p>
            <Link className={styles.primaryButton} to="/secondhand">
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = statusLabels[listing.status] || "Active";
  const images = getAllImages();

  const badgeClass =
    status === "Sold"
      ? styles.statusSold
      : status === "Inactive"
        ? styles.statusInactive
        : status === "Active"
          ? styles.statusActive
          : styles.statusDefault;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/secondhand">Second Hand</Link>
          <span>/</span>
          <span>{listing.title}</span>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainSection}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <img
                  src={images[selectedImage] || "/placeholder-product.png"}
                  alt={listing.title}
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
              </div>
              {images.length > 1 && (
                <div className={styles.thumbnailRow}>
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`${styles.thumbnail} ${
                        selectedImage === index ? styles.thumbnailActive : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${listing.title} ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/placeholder-product.png";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.detailsCard}>
              <div className={styles.description}>
                <h3>Description</h3>
                <p>{listing.description}</p>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.detailsCard}>
              <span className={`${styles.statusBadge} ${badgeClass}`}>
                {status}
              </span>
              <h1 className={styles.title}>{listing.title}</h1>
              {listing.category && (
                <span className={styles.category}>
                  {listing.category.name?.value || listing.category.name}
                  {listing.brand &&
                    ` - ${listing.brand.name?.value || listing.brand.name}`}
                </span>
              )}

              <div className={styles.priceSection}>
                <span className={styles.price}>
                  {listing.price?.toFixed(2)}
                </span>
                <span className={styles.currency}>BGN</span>
                {listing.originalPrice &&
                  listing.originalPrice > listing.price && (
                    <span className={styles.originalPrice}>
                      {listing.originalPrice.toFixed(2)} BGN
                    </span>
                  )}
              </div>

              <div className={styles.infoGrid}>
                {listing.location && (
                  <div className={styles.infoItem}>
                    <LocationIcon />
                    <div>
                      <span className={styles.infoLabel}>Location</span>
                      <span className={styles.infoValue}>
                        {listing.location}
                      </span>
                    </div>
                  </div>
                )}
                <div className={styles.infoItem}>
                  <ShippingIcon />
                  <div>
                    <span className={styles.infoLabel}>Shipping</span>
                    <span className={styles.infoValue}>
                      {listing.offersShipping
                        ? listing.shippingCost
                          ? `${listing.shippingCost.toFixed(2)} BGN`
                          : "Free shipping"
                        : "Pickup only"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.sellerCard}>
                <div className={styles.sellerHeader}>
                  <div className={styles.sellerAvatar}>
                    {(
                      listing.seller?.fullName?.value ||
                      listing.seller?.fullName ||
                      "S"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className={styles.sellerInfo}>
                    <span className={styles.sellerName}>
                      {listing.seller?.fullName?.value ||
                        listing.seller?.fullName ||
                        "Seller"}
                    </span>
                    <span className={styles.sellerJoined}>
                      Member since 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                {isOwner ? (
                  <>
                    <Link
                      className={styles.secondaryButton}
                      to={`/secondhand/edit/${id}`}
                    >
                      Edit Listing
                    </Link>
                    {status === "Active" && (
                      <button
                        className={styles.primaryButton}
                        onClick={handleMarkAsSold}
                      >
                        Mark as Sold
                      </button>
                    )}
                    <button
                      className={styles.dangerButton}
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete Listing"}
                    </button>
                  </>
                ) : (
                  <>
                    {status === "Active" && isAuthenticated && (
                      <button className={styles.primaryButton}>
                        Contact Seller
                      </button>
                    )}
                    {!isAuthenticated && (
                      <Link className={styles.secondaryButton} to="/login">
                        Login to Contact Seller
                      </Link>
                    )}
                  </>
                )}
              </div>

              <div className={styles.viewCount}>
                <EyeIcon />
                {listing.viewCount || 0} views
              </div>
            </div>
          </div>
        </div>

        <section className={styles.commentsSection}>
          <CommentList
            entityType="SecondHandListing"
            entityId={listing.id}
            currentUserId={user?.id}
            isAuthenticated={isAuthenticated}
          />
        </section>
      </div>
    </div>
  );
};

export default SecondHandDetails;
