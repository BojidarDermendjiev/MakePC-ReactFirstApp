import { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productService";
import { AuthContext } from "../../context/AuthContextProvider";
import AddToCartButton from "../ShoppingCart/AddToCartButton";
import ReviewList from "../Review/ReviewList";
import ReviewCrudPage from "../Review/ReviewCrudPage";
import { CommentList } from "../Comments";
import styles from "../../assets/styles/productDetails.module.css";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Failed to load product");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = useCallback(() => {
    navigate("/products");
  }, [navigate]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>Loading product details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowLeftIcon />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <p className={styles.notFoundMessage}>Product not found</p>
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowLeftIcon />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const displayName = product.name?.value || product.name || "Unknown Product";
  const brandName = product.brand?.name?.value || product.brand?.name || product.brand || "";
  const categoryName = product.category?.name?.value || product.category?.name || product.type || "";
  const specsText = product.specs?.value || product.specs || "";
  const isNew = product.condition === 1 || product.condition === "New";
  const inStock = product.stock > 0;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        <ArrowLeftIcon />
        Back to Products
      </button>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            {!imageError && product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={displayName}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <ImageIcon />
              </div>
            )}
          </div>
          <div className={styles.badgeContainer}>
            <span className={`${styles.badge} ${isNew ? styles.conditionBadgeNew : styles.conditionBadgeUsed}`}>
              {isNew ? "New" : "Used"}
            </span>
            <span className={`${styles.badge} ${inStock ? styles.stockBadgeInStock : styles.stockBadgeOutOfStock}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className={styles.infoSection}>
          {categoryName && (
            <span className={styles.categoryTag}>{categoryName}</span>
          )}

          <h1 className={styles.productName}>{displayName}</h1>

          {brandName && (
            <p className={styles.brandName}>by {brandName}</p>
          )}

          <div className={styles.priceSection}>
            <span className={styles.price}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <div className={styles.stockInfo}>
            <span className={`${styles.stockDot} ${inStock ? styles.stockDotInStock : styles.stockDotOutOfStock}`} />
            <span className={styles.stockText}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
            {inStock && (
              <span className={styles.stockCount}>({product.stock} available)</span>
            )}
          </div>

          {product.description && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p className={styles.description}>{product.description}</p>
            </div>
          )}

          {specsText && (
            <div className={styles.specsSection}>
              <h3 className={styles.sectionTitle}>Specifications</h3>
              <p className={styles.description}>{specsText}</p>
            </div>
          )}

          <div className={styles.addToCartSection}>
            <div className={styles.quantityRow}>
              <span className={styles.quantityLabel}>Quantity:</span>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || !inStock}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock || !inStock}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.addToCartWrapper}>
              <AddToCartButton
                productId={product.id}
                disabled={!inStock}
                size="large"
                initialQuantity={quantity}
              />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
        <ReviewList productId={product.id} />

        <h3 className={styles.writeReviewTitle}>Write a Review</h3>
        <ReviewCrudPage productId={product.id} />
      </section>

      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Discussion</h2>
        <CommentList
          entityType="Product"
          entityId={product.id}
          currentUserId={user?.id}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </div>
  );
};

export default ProductDetails;
