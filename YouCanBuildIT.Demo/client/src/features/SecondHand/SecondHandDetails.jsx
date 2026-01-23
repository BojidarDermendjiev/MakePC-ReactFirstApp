import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { getListingById, deleteListing, markAsSold } from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";
import { CommentList } from "../Comments";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #6b7280;

  a {
    color: #6b7280;
    text-decoration: none;
    &:hover {
      color: #1f2937;
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div``;

const ImageGallery = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
`;

const MainImage = styled.div`
  width: 100%;
  padding-top: 66%;
  position: relative;
  background: #f3f4f6;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  overflow-x: auto;
`;

const Thumbnail = styled.button`
  width: 80px;
  height: 60px;
  border: 2px solid ${(props) => (props.$active ? "#c7f022" : "#e5e7eb")};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  background: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 16px;
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

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const Category = styled.span`
  display: block;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const Price = styled.span`
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
`;

const Currency = styled.span`
  font-size: 18px;
  color: #6b7280;
`;

const OriginalPrice = styled.span`
  font-size: 18px;
  color: #9ca3af;
  text-decoration: line-through;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
    color: #6b7280;
  }
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
`;

const Description = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: #4b5563;
    white-space: pre-wrap;
  }
`;

const SellerCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`;

const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const SellerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`;

const SellerInfo = styled.div``;

const SellerName = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const SellerJoined = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px 24px;
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
  }
`;

const SecondaryButton = styled(Link)`
  width: 100%;
  padding: 14px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  color: #1f2937;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  display: block;

  &:hover {
    border-color: #c7f022;
  }
`;

const DangerButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: 2px solid #fecaca;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  background: #fff;
  color: #dc2626;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
    border-color: #dc2626;
  }
`;

const ViewCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 14px;
  color: #6b7280;
  margin-top: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;

  h2 {
    margin: 0 0 12px;
    color: #1f2937;
  }

  p {
    color: #6b7280;
    margin-bottom: 24px;
  }
`;

const CommentsSection = styled.section`
  margin-top: 32px;
`;

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const ShippingIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const SecondHandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListing(data);
      } catch (err) {
        console.error("Failed to fetch listing:", err);
        setError("Listing not found");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const isOwner = user && listing && user.id === listing.sellerId;

  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    setDeleting(true);
    try {
      await deleteListing(id);
      navigate("/secondhand/my-listings");
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleMarkAsSold = async () => {
    if (!window.confirm("Mark this item as sold?")) return;

    try {
      await markAsSold(id, user.id);
      setListing((prev) => ({ ...prev, status: "Sold" }));
    } catch (err) {
      console.error("Failed to mark as sold:", err);
      alert("Failed to mark as sold. Please try again.");
    }
  };

  const getAllImages = () => {
    const images = [listing?.imageUrl];
    if (listing?.additionalImageUrls) {
      const additional = listing.additionalImageUrls.split(",").filter(Boolean);
      images.push(...additional);
    }
    return images.filter(Boolean);
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading listing...</LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !listing) {
    return (
      <PageContainer>
        <Container>
          <ErrorContainer>
            <h2>Listing Not Found</h2>
            <p>The listing you are looking for does not exist or has been removed.</p>
            <PrimaryButton as={Link} to="/secondhand">
              Browse Listings
            </PrimaryButton>
          </ErrorContainer>
        </Container>
      </PageContainer>
    );
  }

  const status = statusLabels[listing.status] || "Active";
  const images = getAllImages();

  return (
    <PageContainer>
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/secondhand">Second Hand</Link>
          <span>/</span>
          <span>{listing.title}</span>
        </Breadcrumb>

        <ContentGrid>
          <MainSection>
            <ImageGallery>
              <MainImage>
                <img
                  src={images[selectedImage] || "/placeholder-product.png"}
                  alt={listing.title}
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
              </MainImage>
              {images.length > 1 && (
                <ThumbnailRow>
                  {images.map((img, index) => (
                    <Thumbnail
                      key={index}
                      $active={selectedImage === index}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${listing.title} ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/placeholder-product.png";
                        }}
                      />
                    </Thumbnail>
                  ))}
                </ThumbnailRow>
              )}
            </ImageGallery>

            <DetailsCard>
              <Description>
                <h3>Description</h3>
                <p>{listing.description}</p>
              </Description>
            </DetailsCard>
          </MainSection>

          <div>
            <DetailsCard>
              <StatusBadge $status={status}>{status}</StatusBadge>
              <Title>{listing.title}</Title>
              {listing.category && (
                <Category>
                  {listing.category.name?.value || listing.category.name}
                  {listing.brand && ` - ${listing.brand.name?.value || listing.brand.name}`}
                </Category>
              )}

              <PriceSection>
                <Price>{listing.price?.toFixed(2)}</Price>
                <Currency>BGN</Currency>
                {listing.originalPrice && listing.originalPrice > listing.price && (
                  <OriginalPrice>{listing.originalPrice.toFixed(2)} BGN</OriginalPrice>
                )}
              </PriceSection>

              <InfoGrid>
                {listing.location && (
                  <InfoItem>
                    <LocationIcon />
                    <div>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>{listing.location}</InfoValue>
                    </div>
                  </InfoItem>
                )}
                <InfoItem>
                  <ShippingIcon />
                  <div>
                    <InfoLabel>Shipping</InfoLabel>
                    <InfoValue>
                      {listing.offersShipping
                        ? listing.shippingCost
                          ? `${listing.shippingCost.toFixed(2)} BGN`
                          : "Free shipping"
                        : "Pickup only"}
                    </InfoValue>
                  </div>
                </InfoItem>
              </InfoGrid>

              <SellerCard>
                <SellerHeader>
                  <SellerAvatar>
                    {(listing.seller?.fullName?.value || listing.seller?.fullName || "S")
                      .charAt(0)
                      .toUpperCase()}
                  </SellerAvatar>
                  <SellerInfo>
                    <SellerName>
                      {listing.seller?.fullName?.value || listing.seller?.fullName || "Seller"}
                    </SellerName>
                    <SellerJoined>Member since 2024</SellerJoined>
                  </SellerInfo>
                </SellerHeader>
              </SellerCard>

              <ActionButtons>
                {isOwner ? (
                  <>
                    <SecondaryButton to={`/secondhand/edit/${id}`}>Edit Listing</SecondaryButton>
                    {status === "Active" && (
                      <PrimaryButton onClick={handleMarkAsSold}>Mark as Sold</PrimaryButton>
                    )}
                    <DangerButton onClick={handleDelete} disabled={deleting}>
                      {deleting ? "Deleting..." : "Delete Listing"}
                    </DangerButton>
                  </>
                ) : (
                  <>
                    {status === "Active" && isAuthenticated && (
                      <PrimaryButton>Contact Seller</PrimaryButton>
                    )}
                    {!isAuthenticated && (
                      <SecondaryButton to="/login">Login to Contact Seller</SecondaryButton>
                    )}
                  </>
                )}
              </ActionButtons>

              <ViewCount>
                <EyeIcon />
                {listing.viewCount || 0} views
              </ViewCount>
            </DetailsCard>
          </div>
        </ContentGrid>

        <CommentsSection>
          <CommentList
            entityType="SecondHandListing"
            entityId={listing.id}
            currentUserId={user?.id}
            isAuthenticated={isAuthenticated}
          />
        </CommentsSection>
      </Container>
    </PageContainer>
  );
};

export default SecondHandDetails;
