import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getMyListings,
  deleteListing,
} from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/myListings.module.css";

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MyListings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchListings = useCallback(async () => {
    try {
      const data = await getMyListings();
      setListings(data.listings || data || []);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchListings();
    }
  }, [isAuthenticated, fetchListings]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    setDeletingId(id);
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  if (authLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <h2>Login Required</h2>
            <p>Please login to view your listings.</p>
            <Link className={styles.loginButton} to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>Loading your listings...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Listings</h1>
          <Link className={styles.createButton} to="/secondhand/create">
            <PlusIcon />
            Create Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className={styles.emptyState}>
            <BoxIcon />
            <h2>No Listings Yet</h2>
            <p>Start selling your used hardware today!</p>
            <Link className={styles.createButton} to="/secondhand/create">
              <PlusIcon />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className={styles.listingsGrid}>
            {listings.map((listing) => {
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
                <div className={styles.listingCard} key={listing.id}>
                  <div className={styles.cardImage}>
                    <img
                      src={listing.imageUrl || "/placeholder-product.png"}
                      alt={listing.title}
                      onError={(e) => {
                        e.target.src = "/placeholder-product.png";
                      }}
                    />
                    <span className={`${styles.statusBadge} ${badgeClass}`}>
                      {status}
                    </span>
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{listing.title}</h3>
                    <div className={styles.cardPrice}>
                      {listing.price?.toFixed(2)} <span>BGN</span>
                    </div>
                    <div className={styles.cardStats}>
                      <span className={styles.statItem}>
                        <EyeIcon />
                        {listing.viewCount || 0} views
                      </span>
                      <span className={styles.statItem}>
                        Created{" "}
                        {new Date(listing.createdAt).toLocaleDateString(
                          "bg-BG",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={`${styles.actionButton} ${styles.primary}`}
                      onClick={() => navigate(`/secondhand/${listing.id}`)}
                    >
                      View
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.secondary}`}
                      onClick={() => navigate(`/secondhand/edit/${listing.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.danger}`}
                      onClick={() => handleDelete(listing.id)}
                      disabled={deletingId === listing.id}
                    >
                      {deletingId === listing.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
