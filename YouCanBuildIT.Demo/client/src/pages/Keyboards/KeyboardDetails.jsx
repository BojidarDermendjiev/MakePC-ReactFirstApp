import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getKeyboardById } from "../../api/keyboardService";
import { AuthContext } from "../../context/AuthContextProvider";
import AddToCartButton from "../../features/ShoppingCart/AddToCartButton";
import { CommentList } from "../../features/Comments";
import styles from "../../assets/styles/keyboardDetails.module.css";

const KeyboardDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchKeyboard = async () => {
      try {
        const data = await getKeyboardById(id);
        setKeyboard(data);
      } catch (err) {
        console.error("Failed to fetch keyboard:", err);
        setError("Keyboard not found");
      } finally {
        setLoading(false);
      }
    };

    fetchKeyboard();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (keyboard?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          Loading keyboard details...
        </div>
      </div>
    );
  }

  if (error || !keyboard) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <h2>Keyboard Not Found</h2>
            <p>The keyboard you are looking for does not exist.</p>
            <Link className={styles.backButton} to="/keyboards">
              Browse Keyboards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const specs = keyboard.specs;
  const inStock = keyboard.stock > 0;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/keyboards">Keyboards</Link>
          <span>/</span>
          <span>{keyboard.name}</span>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.mainSection}>
            <div className={styles.imageContainer}>
              <img
                className={styles.mainImage}
                src={keyboard.imageUrl || "/placeholder-product.png"}
                alt={keyboard.name}
                onError={(e) => {
                  e.target.src = "/placeholder-product.png";
                }}
              />
            </div>

            {keyboard.description && (
              <div className={styles.detailsCard}>
                <div className={styles.description}>
                  <h3>Description</h3>
                  <p>{keyboard.description}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className={styles.detailsCard}>
              {keyboard.brandName && (
                <span className={styles.brand}>{keyboard.brandName}</span>
              )}
              <h1 className={styles.title}>{keyboard.name}</h1>

              <div className={styles.priceSection}>
                <span className={styles.price}>
                  {keyboard.price?.toFixed(2)}
                </span>
                <span className={styles.currency}>BGN</span>
                <span
                  className={`${styles.stockBadge} ${inStock ? styles.stockIn : styles.stockOut}`}
                >
                  {inStock ? `${keyboard.stock} in stock` : "Out of Stock"}
                </span>
              </div>

              {specs && (
                <>
                  <div className={styles.featureBadges}>
                    {specs.switchCharacteristic && (
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        {specs.switchCharacteristic}
                      </span>
                    )}
                    {specs.size && (
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        {specs.size}
                      </span>
                    )}
                    {specs.isHotswap && (
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        Hot-swap
                      </span>
                    )}
                    {specs.hasBacklight && (
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        {specs.backlightType || "Backlit"}
                      </span>
                    )}
                    {specs.hasNkro && (
                      <span className={`${styles.badge} ${styles.badgeActive}`}>
                        NKRO
                      </span>
                    )}
                  </div>

                  <div className={styles.specsSection}>
                    <h3 className={styles.sectionTitle}>Specifications</h3>
                    <div className={styles.specsGrid}>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Layout</span>
                        <span className={styles.specValue}>{specs.layout}</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Switch Type</span>
                        <span className={styles.specValue}>
                          {specs.switchType}
                        </span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Size</span>
                        <span className={styles.specValue}>{specs.size}</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Connectivity</span>
                        <span className={styles.specValue}>
                          {specs.connectivity}
                        </span>
                      </div>
                      {specs.keycapMaterial && (
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>
                            Keycap Material
                          </span>
                          <span className={styles.specValue}>
                            {specs.keycapMaterial}
                          </span>
                        </div>
                      )}
                      {specs.frameMaterial && (
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Frame</span>
                          <span className={styles.specValue}>
                            {specs.frameMaterial}
                          </span>
                        </div>
                      )}
                      {specs.actuationForceGrams && (
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>
                            Actuation Force
                          </span>
                          <span className={styles.specValue}>
                            {specs.actuationForceGrams}g
                          </span>
                        </div>
                      )}
                      {specs.weightGrams && (
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Weight</span>
                          <span className={styles.specValue}>
                            {specs.weightGrams}g
                          </span>
                        </div>
                      )}
                      {specs.dimensions && (
                        <div className={styles.specItem}>
                          <span className={styles.specLabel}>Dimensions</span>
                          <span className={styles.specValue}>
                            {specs.dimensions}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className={styles.actionSection}>
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
                      disabled={quantity >= keyboard.stock || !inStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <AddToCartButton
                  productId={keyboard.id}
                  disabled={!inStock}
                  size="large"
                  initialQuantity={quantity}
                />
              </div>
            </div>
          </div>
        </div>

        <section className={styles.commentsSection}>
          <CommentList
            entityType="Product"
            entityId={keyboard.id}
            currentUserId={user?.id}
            isAuthenticated={isAuthenticated}
          />
        </section>
      </div>
    </div>
  );
};

export default KeyboardDetails;
