import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getMyListings, deleteListing } from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
  animation: ${fadeIn} 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const CreateButton = styled(Link)`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const ListingCard = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  position: relative;
  padding-top: 60%;
  background: #f3f4f6;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;

  span {
    font-size: 14px;
    color: #6b7280;
    font-weight: normal;
  }
`;

const CardStats = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  font-size: 13px;
  color: #6b7280;
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #f3f4f6;
  background: #f8fafc;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: #1f2937;
    color: #fff;

    &:hover {
      background: #374151;
    }
  }

  &.secondary {
    background: #e5e7eb;
    color: #1f2937;

    &:hover {
      background: #d1d5db;
    }
  }

  &.danger {
    background: #fee2e2;
    color: #dc2626;

    &:hover {
      background: #fecaca;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  svg {
    width: 80px;
    height: 80px;
    color: #9ca3af;
    margin-bottom: 24px;
  }

  h2 {
    margin: 0 0 8px 0;
    font-size: 20px;
    color: #1f2937;
  }

  p {
    color: #6b7280;
    margin-bottom: 24px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 16px;
  color: #6b7280;
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    margin: 0 0 12px;
    color: #1f2937;
  }

  p {
    color: #6b7280;
    margin-bottom: 24px;
  }
`;

const LoginButton = styled(Link)`
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MyListings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchListings = useCallback(async () => {
    try {
      const data = await getMyListings();
      setListings(data.listings || data || []);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchListings();
    }
  }, [isAuthenticated, fetchListings]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    setDeletingId(id);
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const statusLabels = {
    0: "Active",
    1: "Sold",
    2: "Inactive",
    Active: "Active",
    Sold: "Sold",
    Inactive: "Inactive",
  };

  if (authLoading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading...</LoadingContainer>
      </PageContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <Container>
          <LoginPrompt>
            <h2>Login Required</h2>
            <p>Please login to view your listings.</p>
            <LoginButton to="/login">Login</LoginButton>
          </LoginPrompt>
        </Container>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading your listings...</LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>My Listings</Title>
          <CreateButton to="/secondhand/create">
            <PlusIcon />
            Create Listing
          </CreateButton>
        </Header>

        {listings.length === 0 ? (
          <EmptyState>
            <BoxIcon />
            <h2>No Listings Yet</h2>
            <p>Start selling your used hardware today!</p>
            <CreateButton to="/secondhand/create">
              <PlusIcon />
              Create Your First Listing
            </CreateButton>
          </EmptyState>
        ) : (
          <ListingsGrid>
            {listings.map((listing) => {
              const status = statusLabels[listing.status] || "Active";

              return (
                <ListingCard key={listing.id}>
                  <CardImage>
                    <img
                      src={listing.imageUrl || "/placeholder-product.png"}
                      alt={listing.title}
                      onError={(e) => {
                        e.target.src = "/placeholder-product.png";
                      }}
                    />
                    <StatusBadge $status={status}>{status}</StatusBadge>
                  </CardImage>

                  <CardContent>
                    <CardTitle>{listing.title}</CardTitle>
                    <CardPrice>
                      {listing.price?.toFixed(2)} <span>BGN</span>
                    </CardPrice>
                    <CardStats>
                      <StatItem>
                        <EyeIcon />
                        {listing.viewCount || 0} views
                      </StatItem>
                      <StatItem>
                        Created{" "}
                        {new Date(listing.createdAt).toLocaleDateString("bg-BG", {
                          day: "numeric",
                          month: "short",
                        })}
                      </StatItem>
                    </CardStats>
                  </CardContent>

                  <CardActions>
                    <ActionButton className="primary" onClick={() => navigate(`/secondhand/${listing.id}`)}>
                      View
                    </ActionButton>
                    <ActionButton className="secondary" onClick={() => navigate(`/secondhand/edit/${listing.id}`)}>
                      Edit
                    </ActionButton>
                    <ActionButton
                      className="danger"
                      onClick={() => handleDelete(listing.id)}
                      disabled={deletingId === listing.id}
                    >
                      {deletingId === listing.id ? "..." : "Delete"}
                    </ActionButton>
                  </CardActions>
                </ListingCard>
              );
            })}
          </ListingsGrid>
        )}
      </Container>
    </PageContainer>
  );
};

export default MyListings;
