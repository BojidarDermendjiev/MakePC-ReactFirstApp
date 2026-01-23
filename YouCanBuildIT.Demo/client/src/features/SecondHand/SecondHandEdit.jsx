import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SecondHandForm from "./SecondHandForm";
import { getListingById, updateListing } from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 24px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: color 0.2s ease;

  &:hover {
    color: #1f2937;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  color: #dc2626;
  font-size: 14px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 16px;
  color: #6b7280;
`;

const NotFoundContainer = styled.div`
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

const ActionButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  color: #1f2937;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SecondHandEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError(null);

    try {
      await updateListing(id, formData);
      navigate(`/secondhand/${id}`);
    } catch (err) {
      console.error("Failed to update listing:", err);
      setError(err?.error || "Failed to update listing. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/secondhand/${id}`);
  };

  if (authLoading || loading) {
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
          <NotFoundContainer>
            <h2>Login Required</h2>
            <p>You need to be logged in to edit listings.</p>
            <ActionButton onClick={() => navigate("/login")}>Login</ActionButton>
          </NotFoundContainer>
        </Container>
      </PageContainer>
    );
  }

  if (!listing) {
    return (
      <PageContainer>
        <Container>
          <NotFoundContainer>
            <h2>Listing Not Found</h2>
            <p>The listing you are trying to edit does not exist.</p>
            <ActionButton onClick={() => navigate("/secondhand")}>Browse Listings</ActionButton>
          </NotFoundContainer>
        </Container>
      </PageContainer>
    );
  }

  // Check if user is the owner
  if (user?.id !== listing.sellerId) {
    return (
      <PageContainer>
        <Container>
          <NotFoundContainer>
            <h2>Access Denied</h2>
            <p>You can only edit your own listings.</p>
            <ActionButton onClick={() => navigate("/secondhand")}>Browse Listings</ActionButton>
          </NotFoundContainer>
        </Container>
      </PageContainer>
    );
  }

  const initialData = {
    title: listing.title || "",
    description: listing.description || "",
    price: listing.price?.toString() || "",
    originalPrice: listing.originalPrice?.toString() || "",
    categoryId: listing.categoryId?.toString() || "",
    brandId: listing.brandId?.toString() || "",
    imageUrl: listing.imageUrl || "",
    additionalImageUrls: listing.additionalImageUrls || "",
    location: listing.location || "",
    offersShipping: listing.offersShipping || false,
    shippingCost: listing.shippingCost?.toString() || "",
  };

  return (
    <PageContainer>
      <Container>
        <BackLink onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Back
        </BackLink>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SecondHandForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={saving}
          isEdit
        />
      </Container>
    </PageContainer>
  );
};

export default SecondHandEdit;
