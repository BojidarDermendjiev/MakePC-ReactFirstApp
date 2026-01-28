import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getFilterOptions } from "../../api/keyboardService";
import styles from "../../assets/styles/keyboardFilters.module.css";

export const KeyboardFilters = ({ filters, onFilterChange, onClear }) => {
  const [options, setOptions] = useState({
    layouts: [],
    switchTypes: [],
    switchCharacteristics: [],
    sizes: [],
    connectivityTypes: [],
    backlightTypes: [],
    keycapMaterials: [],
    brands: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getFilterOptions();
        setOptions(data || {});
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleToggle = (key) => {
    const currentValue = filters[key];
    const newValue = currentValue === true ? undefined : true;
    onFilterChange({ ...filters, [key]: newValue });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        <button className={styles.clearButton} onClick={onClear}>
          Clear All
        </button>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Switch Characteristic</label>
        <div className={styles.checkboxGroup}>
          {["Linear", "Tactile", "Clicky"].map((char) => {
            const checked = filters.switchCharacteristic === char;
            return (
              <label
                key={char}
                className={`${styles.checkboxLabel} ${checked ? styles.checkboxLabelChecked : ""}`}
              >
                <input
                  type="radio"
                  name="switchCharacteristic"
                  checked={checked}
                  onChange={() =>
                    handleChange("switchCharacteristic", checked ? "" : char)
                  }
                />
                {char}
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Size</label>
        <select
          className={styles.select}
          value={filters.size || ""}
          onChange={(e) => handleChange("size", e.target.value)}
        >
          <option value="">All Sizes</option>
          {(options.sizes || []).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Switch Type</label>
        <select
          className={styles.select}
          value={filters.switchType || ""}
          onChange={(e) => handleChange("switchType", e.target.value)}
        >
          <option value="">All Switch Types</option>
          {(options.switchTypes || []).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Layout</label>
        <select
          className={styles.select}
          value={filters.layout || ""}
          onChange={(e) => handleChange("layout", e.target.value)}
        >
          <option value="">All Layouts</option>
          {(options.layouts || []).map((layout) => (
            <option key={layout} value={layout}>
              {layout}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Connectivity</label>
        <select
          className={styles.select}
          value={filters.connectivity || ""}
          onChange={(e) => handleChange("connectivity", e.target.value)}
        >
          <option value="">All Types</option>
          {(options.connectivityTypes || []).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Brand</label>
        <select
          className={styles.select}
          value={filters.brandName || ""}
          onChange={(e) => handleChange("brandName", e.target.value)}
        >
          <option value="">All Brands</option>
          {(options.brands || []).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Price Range (BGN)</label>
        <div className={styles.priceRange}>
          <input
            className={styles.priceInput}
            type="number"
            placeholder={`Min (${options.minPrice ?? 0})`}
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            className={styles.priceInput}
            type="number"
            placeholder={`Max (${options.maxPrice ?? 1000})`}
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Features</label>
        <div className={styles.toggleGroup}>
          <label className={styles.toggle}>
            <span className={styles.toggleText}>Hot-swappable</span>
            <span
              className={`${styles.toggleSwitch} ${
                filters.isHotswap === true ? styles.toggleSwitchChecked : ""
              }`}
            >
              <input
                type="checkbox"
                checked={filters.isHotswap === true}
                onChange={() => handleToggle("isHotswap")}
              />
            </span>
          </label>

          <label className={styles.toggle}>
            <span className={styles.toggleText}>Backlight</span>
            <span
              className={`${styles.toggleSwitch} ${
                filters.hasBacklight === true ? styles.toggleSwitchChecked : ""
              }`}
            >
              <input
                type="checkbox"
                checked={filters.hasBacklight === true}
                onChange={() => handleToggle("hasBacklight")}
              />
            </span>
          </label>

          <label className={styles.toggle}>
            <span className={styles.toggleText}>N-Key Rollover</span>
            <span
              className={`${styles.toggleSwitch} ${
                filters.hasNkro === true ? styles.toggleSwitchChecked : ""
              }`}
            >
              <input
                type="checkbox"
                checked={filters.hasNkro === true}
                onChange={() => handleToggle("hasNkro")}
              />
            </span>
          </label>

          <label className={styles.toggle}>
            <span className={styles.toggleText}>In Stock Only</span>
            <span
              className={`${styles.toggleSwitch} ${
                filters.inStock === true ? styles.toggleSwitchChecked : ""
              }`}
            >
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={() => handleToggle("inStock")}
              />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

KeyboardFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default KeyboardFilters;
