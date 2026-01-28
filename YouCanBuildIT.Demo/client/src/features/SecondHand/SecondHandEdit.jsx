import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecondHandForm from "./SecondHandForm";
import {
  getListingById,
  updateListing,
} from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/secondHandEdit.module.css";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SecondHandEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError(null);

    try {
      await updateListing(id, formData);
      navigate(`/secondhand/${id}`);
    } catch (err) {
      console.error("Failed to update listing:", err);
      setError(err?.error || "Failed to update listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/secondhand/${id}`);
  };

  if (authLoading || loading) {
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
          <div className={styles.notFoundContainer}>
            <h2>Login Required</h2>
            <p>You need to be logged in to edit listings.</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.notFoundContainer}>
            <h2>Listing Not Found</h2>
            <p>The listing you are trying to edit does not exist.</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate("/secondhand")}
            >
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (user?.id !== listing.sellerId) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.notFoundContainer}>
            <h2>Access Denied</h2>
            <p>You can only edit your own listings.</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate("/secondhand")}
            >
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const initialData = {
    title: listing.title || "",
    description: listing.description || "",
    price: listing.price?.toString() || "",
    originalPrice: listing.originalPrice?.toString() || "",
    categoryId: listing.categoryId?.toString() || "",
    brandId: listing.brandId?.toString() || "",
    imageUrl: listing.imageUrl || "",
    additionalImageUrls: listing.additionalImageUrls || "",
    location: listing.location || "",
    offersShipping: listing.offersShipping || false,
    shippingCost: listing.shippingCost?.toString() || "",
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Back
        </button>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <SecondHandForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={saving}
          isEdit
        />
      </div>
    </div>
  );
};

export default SecondHandEdit;
