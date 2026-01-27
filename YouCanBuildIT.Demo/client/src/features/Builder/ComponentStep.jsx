import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SelectedComponent = styled.div`
  background: #ecfdf5;
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SelectedImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
`;

const SelectedInfo = styled.div`
  flex: 1;
`;

const SelectedName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.25rem;
`;

const SelectedBrand = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const SelectedPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #10b981;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #fecaca;
  }
`;

const SuggestionsSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const ProductCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const ProductName = styled.h4`
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductBrand = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2563eb;
  margin-top: auto;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const RecommendedBadge = styled.span`
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export default function ComponentStep({
  componentType,
  products = [],
  suggestions = [],
  selectedItem,
  onSelect,
  onRemove,
  loading,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getComponentIcon = (type) => {
    const icons = {
      CPU: "🧠",
      Motherboard: "📟",
      RAM: "💾",
      GPU: "🎮",
      Storage: "💿",
      PSU: "⚡",
      Case: "🖥️",
      Cooler: "❄️",
    };
    return icons[type] || "🔧";
  };

  return (
    <Container>
      <StepHeader>
        <StepTitle>
          {getComponentIcon(componentType)}{" "}
          {t(`builder.select${componentType}`, `Select ${componentType}`)}
        </StepTitle>
      </StepHeader>

      {selectedItem && (
        <SelectedComponent>
          {selectedItem.productImageUrl ? (
            <SelectedImage src={selectedItem.productImageUrl} alt={selectedItem.productName} />
          ) : (
            <div style={{ width: 80, height: 80, background: "#f3f4f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
              {getComponentIcon(componentType)}
            </div>
          )}
          <SelectedInfo>
            <SelectedName>{selectedItem.productName}</SelectedName>
            <SelectedBrand>{selectedItem.brandName}</SelectedBrand>
            <SelectedPrice>{selectedItem.priceBgn?.toFixed(2)} лв.</SelectedPrice>
          </SelectedInfo>
          <RemoveButton onClick={() => onRemove(selectedItem.id)}>
            {t("builder.remove", "Remove")}
          </RemoveButton>
        </SelectedComponent>
      )}

      <SearchInput
        type="text"
        placeholder={t("builder.searchProducts", "Search products...")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <SuggestionsSection>
          <SectionTitle>
            ⭐ {t("builder.recommended", "Recommended for Your Build")}
          </SectionTitle>
          <ProductGrid>
            {suggestions.slice(0, 3).map((suggestion) => (
              <ProductCard key={suggestion.productId}>
                <RecommendedBadge>{suggestion.reason}</RecommendedBadge>
                {suggestion.imageUrl ? (
                  <ProductImage src={suggestion.imageUrl} alt={suggestion.productName} />
                ) : (
                  <PlaceholderImage>{getComponentIcon(componentType)}</PlaceholderImage>
                )}
                <ProductName>{suggestion.productName}</ProductName>
                <ProductBrand>{suggestion.brandName}</ProductBrand>
                <ProductPrice>{suggestion.priceBgn?.toFixed(2)} лв.</ProductPrice>
                <AddButton
                  onClick={() => onSelect({ id: suggestion.productId, name: suggestion.productName, price: suggestion.priceBgn })}
                  disabled={loading || selectedItem}
                >
                  {t("builder.addToBuild", "Add to Build")}
                </AddButton>
              </ProductCard>
            ))}
          </ProductGrid>
        </SuggestionsSection>
      )}

      <SectionTitle>{t("builder.allProducts", "All Products")}</SectionTitle>

      {filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              {product.imageUrl ? (
                <ProductImage src={product.imageUrl} alt={product.name} />
              ) : (
                <PlaceholderImage>{getComponentIcon(componentType)}</PlaceholderImage>
              )}
              <ProductName>{product.name}</ProductName>
              <ProductBrand>{product.brand?.name || product.brandName}</ProductBrand>
              <ProductPrice>{product.price?.toFixed(2)} лв.</ProductPrice>
              <AddButton
                onClick={() => onSelect(product)}
                disabled={loading || selectedItem}
              >
                {t("builder.addToBuild", "Add to Build")}
              </AddButton>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <NoProducts>
          {t("builder.noProducts", "No products found for this component type.")}
        </NoProducts>
      )}
    </Container>
  );
}
