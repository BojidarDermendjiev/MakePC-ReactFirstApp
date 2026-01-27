import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { handleOAuthResponse, verifySession } from "../../api/authentication";
import { navigation } from "../../common/navigations";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h2`
  margin: 0 0 10px;
  color: #333;
  font-size: 24px;
`;

const Message = styled.p`
  margin: 0;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  margin: 20px 0 0;
  color: #d32f2f;
  font-size: 14px;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565c0;
  }
`;

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // The backend OAuth complete endpoint returns the user data directly
        // After external auth, the backend sets HTTP-only cookies with the tokens
        // We need to verify the session to get the user data

        setStatus("verifying");

        // Small delay to ensure cookies are set
        await new Promise(resolve => setTimeout(resolve, 500));

        // Verify session to get user data (this will use the HTTP-only cookie)
        const userData = await verifySession();

        if (userData) {
          handleOAuthResponse({ user: userData }, setUser);
          setStatus("success");

          // Redirect to home page after successful login
          setTimeout(() => {
            navigate(navigation.getHomeUrl(), { replace: true });
          }, 1000);
        } else {
          throw new Error("Failed to verify authentication session");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(err.message || "Authentication failed. Please try again.");
        setStatus("error");
      }
    };

    handleCallback();
  }, [navigate, setUser, searchParams]);

  const handleRetry = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Container>
      <Card>
        {status === "processing" || status === "verifying" ? (
          <>
            <Spinner />
            <Title>
              {status === "processing" ? "Processing..." : "Verifying..."}
            </Title>
            <Message>
              {status === "processing"
                ? "Completing authentication..."
                : "Verifying your account..."}
            </Message>
          </>
        ) : status === "success" ? (
          <>
            <Title>Success!</Title>
            <Message>You have been logged in successfully. Redirecting...</Message>
          </>
        ) : (
          <>
            <Title>Authentication Failed</Title>
            <Message>
              We couldn&apos;t complete your sign-in. Please try again.
            </Message>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <RetryButton onClick={handleRetry}>Back to Login</RetryButton>
          </>
        )}
      </Card>
    </Container>
  );
};

export default OAuthCallback;
