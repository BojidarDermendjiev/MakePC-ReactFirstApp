import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  animation: ${slideUp} 0.4s ease-out;
`;

const Banner = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CookieIcon = styled.span`
  font-size: 1.25rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0;

  a {
    color: #60a5fa;
    text-decoration: underline;

    &:hover {
      color: #93c5fd;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1.5rem;
  }
`;

const AcceptAllButton = styled(Button)`
  background: #22c55e;
  color: white;

  &:hover {
    background: #16a34a;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AcceptNecessaryButton = styled(Button)`
  background: transparent;
  color: #cbd5e1;
  border: 1px solid #475569;

  &:hover {
    background: #475569;
    color: white;
  }
`;

const SettingsButton = styled(Button)`
  background: transparent;
  color: #94a3b8;
  padding: 0.625rem 1rem;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const COOKIE_CONSENT_KEY = "makepc_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay before showing for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      acceptedAt: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      acceptedAt: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Overlay>
      <Banner>
        <Content>
          <Title>
            <CookieIcon>🍪</CookieIcon>
            {t("cookies.title", "We use cookies")}
          </Title>
          <Description>
            {t(
              "cookies.description",
              "We use cookies to improve your experience on our site. Cookies help us understand how you use our website and allow us to remember your preferences."
            )}{" "}
            <a href="/privacy-policy">
              {t("cookies.learnMore", "Learn more")}
            </a>
          </Description>
        </Content>
        <ButtonGroup>
          <AcceptNecessaryButton onClick={handleAcceptNecessary}>
            {t("cookies.acceptNecessary", "Necessary Only")}
          </AcceptNecessaryButton>
          <AcceptAllButton onClick={handleAcceptAll}>
            {t("cookies.acceptAll", "Accept All")}
          </AcceptAllButton>
        </ButtonGroup>
      </Banner>
    </Overlay>
  );
}

// Utility function to check cookie consent
export const getCookieConsent = () => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
};

// Utility function to check if specific cookie type is allowed
export const isCookieAllowed = (type) => {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[type] === true;
};

// Utility function to reset cookie consent (for settings page)
export const resetCookieConsent = () => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
};
