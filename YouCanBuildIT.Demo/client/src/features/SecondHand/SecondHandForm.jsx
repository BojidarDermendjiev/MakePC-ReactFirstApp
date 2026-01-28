import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";
import styles from "../../assets/styles/secondHandForm.module.css";

const SecondHandForm = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  isEdit = false,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    brandId: "",
    imageUrl: "",
    additionalImageUrls: "",
    location: "",
    offersShipping: false,
    shippingCost: "",
    ...initialData,
  });

  useEffect(() => {
    Promise.all([getAllCategories(), getAllBrands()])
      .then(([cats, brds]) => {
        setCategories(cats || []);
        setBrands(brds || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title || formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    if (formData.title && formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.description || formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    if (formData.description && formData.description.length > 2000) {
      newErrors.description = "Description must be less than 2000 characters";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (!formData.imageUrl) {
      newErrors.imageUrl = "Please provide an image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : null,
      categoryId: parseInt(formData.categoryId, 10),
      brandId: formData.brandId ? parseInt(formData.brandId, 10) : null,
      shippingCost: formData.shippingCost
        ? parseFloat(formData.shippingCost)
        : null,
    };

    onSubmit(submitData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {isEdit ? "Edit Listing" : "Create New Listing"}
      </h2>

      <div className={styles.formGrid}>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Title <span>*</span>
          </label>
          <input
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., NVIDIA GeForce RTX 3080 - Excellent Condition"
          />
          {errors.title && (
            <span className={styles.errorText}>{errors.title}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Description <span>*</span>
          </label>
          <textarea
            className={`${styles.textarea} ${errors.description ? styles.textareaError : ""}`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your item in detail. Include condition, reason for selling, any defects, etc."
          />
          {errors.description && (
            <span className={styles.errorText}>{errors.description}</span>
          )}
          <span className={styles.helpText}>
            {formData.description.length}/2000 characters
          </span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Category <span>*</span>
          </label>
          <select
            className={`${styles.select} ${errors.categoryId ? styles.selectError : ""}`}
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name?.value || cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className={styles.errorText}>{errors.categoryId}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Brand</label>
          <select
            className={styles.select}
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
          >
            <option value="">Select a brand (optional)</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name?.value || brand.name}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <div className={styles.priceRow}>
            <div>
              <label className={styles.label}>
                Price (BGN) <span>*</span>
              </label>
              <input
                className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
              />
              {errors.price && (
                <span className={styles.errorText}>{errors.price}</span>
              )}
            </div>
            <div>
              <label className={styles.label}>Original Price (BGN)</label>
              <input
                className={styles.input}
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00 (optional)"
                min="0"
                step="0.01"
              />
              <span className={styles.helpText}>Show buyers the savings</span>
            </div>
          </div>
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>
            Image URL <span>*</span>
          </label>
          <input
            className={`${styles.input} ${errors.imageUrl ? styles.inputError : ""}`}
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && (
            <span className={styles.errorText}>{errors.imageUrl}</span>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label className={styles.label}>Additional Image URLs</label>
          <input
            className={styles.input}
            type="text"
            name="additionalImageUrls"
            value={formData.additionalImageUrls}
            onChange={handleChange}
            placeholder="https://url1.jpg, https://url2.jpg (comma-separated)"
          />
          <span className={styles.helpText}>
            Add multiple images separated by commas
          </span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Location</label>
          <input
            className={styles.input}
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Sofia, Bulgaria"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Shipping</label>
          <div className={styles.checkboxGroup}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="offersShipping"
              name="offersShipping"
              checked={formData.offersShipping}
              onChange={handleChange}
            />
            <label className={styles.checkboxLabel} htmlFor="offersShipping">
              I offer shipping
            </label>
          </div>
        </div>

        {formData.offersShipping && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Shipping Cost (BGN)</label>
            <input
              className={styles.input}
              type="number"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleChange}
              placeholder="0.00 (leave empty for free shipping)"
              min="0"
              step="0.01"
            />
          </div>
        )}
      </div>

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
        </button>
      </div>
    </form>
  );
};

SecondHandForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isEdit: PropTypes.bool,
};

export default SecondHandForm;
