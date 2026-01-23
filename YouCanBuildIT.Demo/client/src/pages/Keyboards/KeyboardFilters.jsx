import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getFilterOptions } from "../../api/keyboardService";

const FiltersContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const ClearButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c7f022;
    color: #1f2937;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.$checked ? "#c7f022" : "#e5e7eb")};
  border-radius: 8px;
  font-size: 13px;
  color: ${(props) => (props.$checked ? "#1f2937" : "#6b7280")};
  background: ${(props) => (props.$checked ? "#f7fee7" : "#fff")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c7f022;
  }

  input {
    display: none;
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;

  &:focus {
    outline: none;
    border-color: #c7f022;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PriceSeparator = styled.span`
  color: #9ca3af;
  font-size: 14px;
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c7f022;
  }
`;

const ToggleText = styled.span`
  font-size: 13px;
  color: #374151;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: ${(props) => (props.$checked ? "#c7f022" : "#e5e7eb")};
  position: relative;
  transition: background 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${(props) => (props.$checked ? "20px" : "2px")};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: left 0.2s ease;
  }

  input {
    display: none;
  }
`;

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
        setOptions(data);
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
    <FiltersContainer>
      <FilterHeader>
        <Title>Filters</Title>
        <ClearButton onClick={onClear}>Clear All</ClearButton>
      </FilterHeader>

      <FilterSection>
        <FilterLabel>Switch Characteristic</FilterLabel>
        <CheckboxGroup>
          {["Linear", "Tactile", "Clicky"].map((char) => (
            <CheckboxLabel
              key={char}
              $checked={filters.switchCharacteristic === char}
            >
              <input
                type="radio"
                name="switchCharacteristic"
                checked={filters.switchCharacteristic === char}
                onChange={() =>
                  handleChange(
                    "switchCharacteristic",
                    filters.switchCharacteristic === char ? "" : char
                  )
                }
              />
              {char}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Size</FilterLabel>
        <Select
          value={filters.size || ""}
          onChange={(e) => handleChange("size", e.target.value)}
        >
          <option value="">All Sizes</option>
          {options.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Switch Type</FilterLabel>
        <Select
          value={filters.switchType || ""}
          onChange={(e) => handleChange("switchType", e.target.value)}
        >
          <option value="">All Switch Types</option>
          {options.switchTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Layout</FilterLabel>
        <Select
          value={filters.layout || ""}
          onChange={(e) => handleChange("layout", e.target.value)}
        >
          <option value="">All Layouts</option>
          {options.layouts.map((layout) => (
            <option key={layout} value={layout}>
              {layout}
            </option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Connectivity</FilterLabel>
        <Select
          value={filters.connectivity || ""}
          onChange={(e) => handleChange("connectivity", e.target.value)}
        >
          <option value="">All Types</option>
          {options.connectivityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Brand</FilterLabel>
        <Select
          value={filters.brandName || ""}
          onChange={(e) => handleChange("brandName", e.target.value)}
        >
          <option value="">All Brands</option>
          {options.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Price Range (BGN)</FilterLabel>
        <PriceRange>
          <PriceInput
            type="number"
            placeholder={`Min (${options.minPrice})`}
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
          <PriceSeparator>-</PriceSeparator>
          <PriceInput
            type="number"
            placeholder={`Max (${options.maxPrice})`}
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </PriceRange>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Features</FilterLabel>
        <ToggleGroup>
          <Toggle>
            <ToggleText>Hot-swappable</ToggleText>
            <ToggleSwitch $checked={filters.isHotswap === true}>
              <input
                type="checkbox"
                checked={filters.isHotswap === true}
                onChange={() => handleToggle("isHotswap")}
              />
            </ToggleSwitch>
          </Toggle>
          <Toggle>
            <ToggleText>Backlight</ToggleText>
            <ToggleSwitch $checked={filters.hasBacklight === true}>
              <input
                type="checkbox"
                checked={filters.hasBacklight === true}
                onChange={() => handleToggle("hasBacklight")}
              />
            </ToggleSwitch>
          </Toggle>
          <Toggle>
            <ToggleText>N-Key Rollover</ToggleText>
            <ToggleSwitch $checked={filters.hasNkro === true}>
              <input
                type="checkbox"
                checked={filters.hasNkro === true}
                onChange={() => handleToggle("hasNkro")}
              />
            </ToggleSwitch>
          </Toggle>
          <Toggle>
            <ToggleText>In Stock Only</ToggleText>
            <ToggleSwitch $checked={filters.inStock === true}>
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={() => handleToggle("inStock")}
              />
            </ToggleSwitch>
          </Toggle>
        </ToggleGroup>
      </FilterSection>
    </FiltersContainer>
  );
};

KeyboardFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default KeyboardFilters;
