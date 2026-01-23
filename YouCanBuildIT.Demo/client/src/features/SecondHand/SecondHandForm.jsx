import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getAllCategories } from "../../api/categoryService";
import { getAllBrands } from "../../api/brandService";

const Form = styled.form`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  ${(props) => props.$fullWidth && "grid-column: 1 / -1;"}
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #dc2626;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.$error ? "#fecaca" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#dc2626" : "#c7f022")};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$error ? "rgba(220, 38, 38, 0.1)" : "rgba(199, 240, 34, 0.2)")};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.$error ? "#fecaca" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#dc2626" : "#c7f022")};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$error ? "rgba(220, 38, 38, 0.1)" : "rgba(199, 240, 34, 0.2)")};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${(props) => (props.$error ? "#fecaca" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 15px;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? "#dc2626" : "#c7f022")};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$error ? "rgba(220, 38, 38, 0.1)" : "rgba(199, 240, 34, 0.2)")};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  display: block;
  color: #dc2626;
  font-size: 13px;
  margin-top: 6px;
`;

const HelpText = styled.span`
  display: block;
  color: #6b7280;
  font-size: 13px;
  margin-top: 6px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #c7f022;
`;

const CheckboxLabel = styled.label`
  font-size: 15px;
  color: #374151;
  cursor: pointer;
`;

const PriceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  padding: 16px 32px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  color: #6b7280;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c7f022;
    color: #1f2937;
  }
`;

const SecondHandForm = ({ initialData, onSubmit, onCancel, loading, isEdit = false }) => {
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

    // Clear error when field is modified
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
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      categoryId: parseInt(formData.categoryId, 10),
      brandId: formData.brandId ? parseInt(formData.brandId, 10) : null,
      shippingCost: formData.shippingCost ? parseFloat(formData.shippingCost) : null,
    };

    onSubmit(submitData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>{isEdit ? "Edit Listing" : "Create New Listing"}</FormTitle>

      <FormGrid>
        <FormGroup $fullWidth>
          <Label>
            Title <span>*</span>
          </Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., NVIDIA GeForce RTX 3080 - Excellent Condition"
            $error={errors.title}
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
        </FormGroup>

        <FormGroup $fullWidth>
          <Label>
            Description <span>*</span>
          </Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your item in detail. Include condition, reason for selling, any defects, etc."
            $error={errors.description}
          />
          {errors.description && <ErrorText>{errors.description}</ErrorText>}
          <HelpText>{formData.description.length}/2000 characters</HelpText>
        </FormGroup>

        <FormGroup>
          <Label>
            Category <span>*</span>
          </Label>
          <Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            $error={errors.categoryId}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name?.value || cat.name}
              </option>
            ))}
          </Select>
          {errors.categoryId && <ErrorText>{errors.categoryId}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Brand</Label>
          <Select name="brandId" value={formData.brandId} onChange={handleChange}>
            <option value="">Select a brand (optional)</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name?.value || brand.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup $fullWidth>
          <PriceRow>
            <div>
              <Label>
                Price (BGN) <span>*</span>
              </Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                $error={errors.price}
              />
              {errors.price && <ErrorText>{errors.price}</ErrorText>}
            </div>
            <div>
              <Label>Original Price (BGN)</Label>
              <Input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00 (optional)"
                min="0"
                step="0.01"
              />
              <HelpText>Show buyers the savings</HelpText>
            </div>
          </PriceRow>
        </FormGroup>

        <FormGroup $fullWidth>
          <Label>
            Image URL <span>*</span>
          </Label>
          <Input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            $error={errors.imageUrl}
          />
          {errors.imageUrl && <ErrorText>{errors.imageUrl}</ErrorText>}
        </FormGroup>

        <FormGroup $fullWidth>
          <Label>Additional Image URLs</Label>
          <Input
            type="text"
            name="additionalImageUrls"
            value={formData.additionalImageUrls}
            onChange={handleChange}
            placeholder="https://url1.jpg, https://url2.jpg (comma-separated)"
          />
          <HelpText>Add multiple images separated by commas</HelpText>
        </FormGroup>

        <FormGroup>
          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Sofia, Bulgaria"
          />
        </FormGroup>

        <FormGroup>
          <Label>Shipping</Label>
          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="offersShipping"
              name="offersShipping"
              checked={formData.offersShipping}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="offersShipping">I offer shipping</CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>

        {formData.offersShipping && (
          <FormGroup>
            <Label>Shipping Cost (BGN)</Label>
            <Input
              type="number"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleChange}
              placeholder="0.00 (leave empty for free shipping)"
              min="0"
              step="0.01"
            />
          </FormGroup>
        )}
      </FormGrid>

      <ButtonRow>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
        </SubmitButton>
      </ButtonRow>
    </Form>
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
