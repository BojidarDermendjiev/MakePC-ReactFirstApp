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

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
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
  padding-top: 75%;
  background: #f3f4f6;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.$status) {
      case "Active":
        return "linear-gradient(135deg, #c7f022 0%, #a8d810 100%)";
      case "Sold":
        return "#dc2626";
      case "Inactive":
        return "#6b7280";
      default:
        return "#9ca3af";
    }
  }};
  color: ${(props) => (props.$status === "Sold" ? "#fff" : "#1f2937")};
`;

const ViewCount = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Category = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
`;

const Currency = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6b7280;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
`;

const Seller = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const ShippingBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: ${(props) => (props.$offers ? "#ecfdf5" : "#fef2f2")};
  color: ${(props) => (props.$offers ? "#059669" : "#dc2626")};
`;

// Skeleton for loading state
const SkeletonCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SkeletonImage = styled.div`
  padding-top: 75%;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonContent = styled.div`
  padding: 16px;
`;

const SkeletonText = styled.div`
  height: ${(props) => props.$height || "16px"};
  width: ${(props) => props.$width || "100%"};
  border-radius: 4px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-bottom: ${(props) => props.$mb || "0"};
`;

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const SecondHandCard = ({ listing, index = 0 }) => {
  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  const status = statusLabels[listing.status] || "Active";

  return (
    <Card to={`/secondhand/${listing.id}`} $index={index}>
      <ImageContainer>
        <Image
          src={listing.imageUrl || "/placeholder-product.png"}
          alt={listing.title}
          onError={(e) => {
            e.target.src = "/placeholder-product.png";
          }}
        />
        <StatusBadge $status={status}>{status}</StatusBadge>
        {listing.viewCount > 0 && (
          <ViewCount>
            <EyeIcon />
            {listing.viewCount}
          </ViewCount>
        )}
      </ImageContainer>
      <Content>
        {listing.category && (
          <Category>{listing.category.name?.value || listing.category.name}</Category>
        )}
        <Title>{listing.title}</Title>
        <PriceRow>
          <Price>{listing.price?.toFixed(2)}</Price>
          <Currency>BGN</Currency>
          {listing.originalPrice && listing.originalPrice > listing.price && (
            <OriginalPrice>{listing.originalPrice.toFixed(2)} BGN</OriginalPrice>
          )}
        </PriceRow>
        {listing.location && (
          <Location>
            <LocationIcon />
            {listing.location}
          </Location>
        )}
        <SellerInfo>
          <Seller>
            {listing.seller?.fullName?.value || listing.seller?.fullName || "Seller"}
          </Seller>
          <ShippingBadge $offers={listing.offersShipping}>
            {listing.offersShipping ? "Ships" : "Pickup only"}
          </ShippingBadge>
        </SellerInfo>
      </Content>
    </Card>
  );
};

SecondHandCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    imageUrl: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    viewCount: PropTypes.number,
    location: PropTypes.string,
    offersShipping: PropTypes.bool,
    category: PropTypes.object,
    seller: PropTypes.object,
  }).isRequired,
  index: PropTypes.number,
};

export const SecondHandCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonText $height="12px" $width="60px" $mb="8px" />
      <SkeletonText $height="20px" $width="90%" $mb="8px" />
      <SkeletonText $height="24px" $width="40%" $mb="12px" />
      <SkeletonText $height="14px" $width="50%" />
    </SkeletonContent>
  </SkeletonCard>
);

export default SecondHandCard;
