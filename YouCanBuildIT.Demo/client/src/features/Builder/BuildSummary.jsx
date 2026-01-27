import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const BuildInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const BuildName = styled.h4`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.25rem;
`;

const BuildPurpose = styled.p`
  font-size: 0.85rem;
  color: #666;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const ItemImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  background: white;
  border-radius: 6px;
`;

const ItemPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemType = styled.p`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ItemName = styled.p`
  font-size: 0.85rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2563eb;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: #dc2626;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #9ca3af;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const TotalSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.span`
  font-size: 1rem;
  color: #333;
`;

const TotalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
`;

const WattageRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const ComponentCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #666;
`;

export default function BuildSummary({ build, onRemoveItem }) {
  const { t } = useTranslation();

  if (!build) return null;

  const { name, purpose, items = [], totalPriceBgn = 0, totalWattage = 0 } = build;

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

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.priceBgn || 0) * (item.quantity || 1), 0);
  };

  const total = totalPriceBgn || calculateTotal();

  return (
    <Container>
      <Title>🛒 {t("builder.yourBuild", "Your Build")}</Title>

      <BuildInfo>
        <BuildName>{name}</BuildName>
        <BuildPurpose>{purpose}</BuildPurpose>
      </BuildInfo>

      <ComponentCount>
        <span>{t("builder.components", "Components")}:</span>
        <span>{items.length} / 8</span>
      </ComponentCount>

      {items.length > 0 ? (
        <ItemList>
          {items.map((item) => (
            <Item key={item.id}>
              {item.productImageUrl ? (
                <ItemImage src={item.productImageUrl} alt={item.productName} />
              ) : (
                <ItemPlaceholder>{getComponentIcon(item.componentType)}</ItemPlaceholder>
              )}
              <ItemInfo>
                <ItemType>{item.componentType}</ItemType>
                <ItemName title={item.productName}>{item.productName}</ItemName>
              </ItemInfo>
              <ItemPrice>{item.priceBgn?.toFixed(2)} лв.</ItemPrice>
              <RemoveBtn onClick={() => onRemoveItem(item.id)} title={t("builder.remove", "Remove")}>
                ✕
              </RemoveBtn>
            </Item>
          ))}
        </ItemList>
      ) : (
        <EmptyState>
          <EmptyIcon>📦</EmptyIcon>
          <p>{t("builder.noComponents", "No components added yet")}</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
            {t("builder.selectComponents", "Select components to build your PC")}
          </p>
        </EmptyState>
      )}

      <TotalSection>
        <TotalRow>
          <TotalLabel>{t("builder.total", "Total")}</TotalLabel>
          <TotalPrice>{total.toFixed(2)} лв.</TotalPrice>
        </TotalRow>
        {totalWattage > 0 && (
          <WattageRow>
            <span>⚡ {t("builder.estimatedPower", "Estimated Power")}</span>
            <span>{totalWattage}W</span>
          </WattageRow>
        )}
      </TotalSection>
    </Container>
  );
}
