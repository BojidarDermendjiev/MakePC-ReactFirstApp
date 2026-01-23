import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled(Link)`
  display: block;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.4s ease forwards;
  animation-delay: ${(props) => props.$index * 0.05}s;
  opacity: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 66%;
  background: #f3f4f6;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  padding: 16px;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const BadgeRow = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${(props) => props.$bg || "#f3f4f6"};
  color: ${(props) => props.$color || "#374151"};
`;

const StockBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${(props) => (props.$inStock ? "#ecfdf5" : "#fef2f2")};
  color: ${(props) => (props.$inStock ? "#059669" : "#dc2626")};
`;

const Content = styled.div`
  padding: 16px;
`;

const Brand = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 12px;
  margin-bottom: 12px;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
`;

const Currency = styled.span`
  font-size: 14px;
  color: #6b7280;
  margin-left: 4px;
`;

const FeatureBadges = styled.div`
  display: flex;
  gap: 4px;
`;

const FeatureBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  background: #f0fdf4;
  color: #15803d;
`;

const SwitchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 5h10v2h-10v-2zm0 12h10v2h-10v-2zm0-6h10v2h-10v-2z" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
);

const LightIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
  </svg>
);

export const KeyboardCard = ({ keyboard, index = 0 }) => {
  const specs = keyboard.specs;

  return (
    <Card to={`/keyboards/${keyboard.id}`} $index={index}>
      <ImageContainer>
        <Image
          src={keyboard.imageUrl || "/placeholder-keyboard.png"}
          alt={keyboard.name}
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
        <BadgeRow>
          {specs?.size && (
            <Badge $bg="#e0e7ff" $color="#3730a3">
              {specs.size}
            </Badge>
          )}
          {specs?.switchCharacteristic && (
            <Badge $bg="#fef3c7" $color="#92400e">
              {specs.switchCharacteristic}
            </Badge>
          )}
        </BadgeRow>
        <StockBadge $inStock={keyboard.stock > 0}>
          {keyboard.stock > 0 ? "In Stock" : "Out of Stock"}
        </StockBadge>
      </ImageContainer>
      <Content>
        {keyboard.brandName && <Brand>{keyboard.brandName}</Brand>}
        <Title>{keyboard.name}</Title>
        {specs && (
          <SpecsGrid>
            <SpecItem>
              <SwitchIcon />
              <span>{specs.switchType}</span>
            </SpecItem>
            <SpecItem>
              <KeyboardIcon />
              <span>{specs.layout}</span>
            </SpecItem>
            <SpecItem>
              <WifiIcon />
              <span>{specs.connectivity}</span>
            </SpecItem>
            {specs.hasBacklight && (
              <SpecItem>
                <LightIcon />
                <span>{specs.backlightType || "Backlit"}</span>
              </SpecItem>
            )}
          </SpecsGrid>
        )}
        <PriceRow>
          <div>
            <Price>{keyboard.price?.toFixed(2)}</Price>
            <Currency>BGN</Currency>
          </div>
          <FeatureBadges>
            {specs?.isHotswap && <FeatureBadge>Hot-swap</FeatureBadge>}
            {specs?.hasNkro && <FeatureBadge>NKRO</FeatureBadge>}
          </FeatureBadges>
        </PriceRow>
      </Content>
    </Card>
  );
};

KeyboardCard.propTypes = {
  keyboard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brandName: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number,
    imageUrl: PropTypes.string,
    specs: PropTypes.shape({
      layout: PropTypes.string,
      switchType: PropTypes.string,
      switchCharacteristic: PropTypes.string,
      size: PropTypes.string,
      connectivity: PropTypes.string,
      hasBacklight: PropTypes.bool,
      backlightType: PropTypes.string,
      isHotswap: PropTypes.bool,
      hasNkro: PropTypes.bool,
    }),
  }).isRequired,
  index: PropTypes.number,
};

export default KeyboardCard;
