import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SecondHandForm from "./SecondHandForm";
import { createListing } from "../../api/secondHandListingService";
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

const LoginButton = styled.a`
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

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SecondHandCreate = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createListing(formData);
      navigate(`/secondhand/${result.id}`);
    } catch (err) {
      console.error("Failed to create listing:", err);
      setError(err?.error || "Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/secondhand");
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Container>Loading...</Container>
      </PageContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <Container>
          <LoginPrompt>
            <h2>Login Required</h2>
            <p>You need to be logged in to create a listing.</p>
            <LoginButton href="/login">Login</LoginButton>
          </LoginPrompt>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <BackLink onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Back
        </BackLink>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SecondHandForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
      </Container>
    </PageContainer>
  );
};

export default SecondHandCreate;
