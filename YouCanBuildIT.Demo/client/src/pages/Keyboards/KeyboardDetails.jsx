import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { getKeyboardById } from "../../api/keyboardService";
import { AuthContext } from "../../context/AuthContextProvider";
import AddToCartButton from "../../features/ShoppingCart/AddToCartButton";
import { CommentList } from "../../features/Comments";

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

const ImageContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const DetailsCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Brand = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f4f6;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
`;

const Currency = styled.span`
  font-size: 18px;
  color: #6b7280;
`;

const StockBadge = styled.span`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => (props.$inStock ? "#ecfdf5" : "#fef2f2")};
  color: ${(props) => (props.$inStock ? "#059669" : "#dc2626")};
`;

const SpecsSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const SpecItem = styled.div`
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
`;

const SpecLabel = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
`;

const FeatureBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Badge = styled.span`
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => (props.$active ? "#f0fdf4" : "#f3f4f6")};
  color: ${(props) => (props.$active ? "#15803d" : "#6b7280")};
`;

const Description = styled.div`
  margin-bottom: 24px;

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #4b5563;
  }
`;

const ActionSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 18px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #c7f022;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
`;

const CommentsSection = styled.section`
  margin-top: 32px;
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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #c7f022 0%, #a8d810 100%);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(199, 240, 34, 0.4);
  }
`;

const KeyboardDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchKeyboard = async () => {
      try {
        const data = await getKeyboardById(id);
        setKeyboard(data);
      } catch (err) {
        console.error("Failed to fetch keyboard:", err);
        setError("Keyboard not found");
      } finally {
        setLoading(false);
      }
    };

    fetchKeyboard();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (keyboard?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>Loading keyboard details...</LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !keyboard) {
    return (
      <PageContainer>
        <Container>
          <ErrorContainer>
            <h2>Keyboard Not Found</h2>
            <p>The keyboard you are looking for does not exist.</p>
            <BackButton to="/keyboards">Browse Keyboards</BackButton>
          </ErrorContainer>
        </Container>
      </PageContainer>
    );
  }

  const specs = keyboard.specs;
  const inStock = keyboard.stock > 0;

  return (
    <PageContainer>
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/keyboards">Keyboards</Link>
          <span>/</span>
          <span>{keyboard.name}</span>
        </Breadcrumb>

        <ContentGrid>
          <MainSection>
            <ImageContainer>
              <MainImage
                src={keyboard.imageUrl || "/placeholder-product.png"}
                alt={keyboard.name}
                onError={(e) => {
                  e.target.src = "/placeholder-product.png";
                }}
              />
            </ImageContainer>

            {keyboard.description && (
              <DetailsCard>
                <Description>
                  <h3>Description</h3>
                  <p>{keyboard.description}</p>
                </Description>
              </DetailsCard>
            )}
          </MainSection>

          <div>
            <DetailsCard>
              {keyboard.brandName && <Brand>{keyboard.brandName}</Brand>}
              <Title>{keyboard.name}</Title>

              <PriceSection>
                <Price>{keyboard.price?.toFixed(2)}</Price>
                <Currency>BGN</Currency>
                <StockBadge $inStock={inStock}>
                  {inStock ? `${keyboard.stock} in stock` : "Out of Stock"}
                </StockBadge>
              </PriceSection>

              {specs && (
                <>
                  <FeatureBadges>
                    {specs.switchCharacteristic && (
                      <Badge $active>{specs.switchCharacteristic}</Badge>
                    )}
                    {specs.size && <Badge $active>{specs.size}</Badge>}
                    {specs.isHotswap && <Badge $active>Hot-swap</Badge>}
                    {specs.hasBacklight && (
                      <Badge $active>{specs.backlightType || "Backlit"}</Badge>
                    )}
                    {specs.hasNkro && <Badge $active>NKRO</Badge>}
                  </FeatureBadges>

                  <SpecsSection>
                    <SectionTitle>Specifications</SectionTitle>
                    <SpecsGrid>
                      <SpecItem>
                        <SpecLabel>Layout</SpecLabel>
                        <SpecValue>{specs.layout}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Switch Type</SpecLabel>
                        <SpecValue>{specs.switchType}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Size</SpecLabel>
                        <SpecValue>{specs.size}</SpecValue>
                      </SpecItem>
                      <SpecItem>
                        <SpecLabel>Connectivity</SpecLabel>
                        <SpecValue>{specs.connectivity}</SpecValue>
                      </SpecItem>
                      {specs.keycapMaterial && (
                        <SpecItem>
                          <SpecLabel>Keycap Material</SpecLabel>
                          <SpecValue>{specs.keycapMaterial}</SpecValue>
                        </SpecItem>
                      )}
                      {specs.frameMaterial && (
                        <SpecItem>
                          <SpecLabel>Frame</SpecLabel>
                          <SpecValue>{specs.frameMaterial}</SpecValue>
                        </SpecItem>
                      )}
                      {specs.actuationForceGrams && (
                        <SpecItem>
                          <SpecLabel>Actuation Force</SpecLabel>
                          <SpecValue>{specs.actuationForceGrams}g</SpecValue>
                        </SpecItem>
                      )}
                      {specs.weightGrams && (
                        <SpecItem>
                          <SpecLabel>Weight</SpecLabel>
                          <SpecValue>{specs.weightGrams}g</SpecValue>
                        </SpecItem>
                      )}
                      {specs.dimensions && (
                        <SpecItem>
                          <SpecLabel>Dimensions</SpecLabel>
                          <SpecValue>{specs.dimensions}</SpecValue>
                        </SpecItem>
                      )}
                    </SpecsGrid>
                  </SpecsSection>
                </>
              )}

              <ActionSection>
                <QuantityRow>
                  <QuantityLabel>Quantity:</QuantityLabel>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || !inStock}
                    >
                      -
                    </QuantityButton>
                    <QuantityDisplay>{quantity}</QuantityDisplay>
                    <QuantityButton
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= keyboard.stock || !inStock}
                    >
                      +
                    </QuantityButton>
                  </QuantityControls>
                </QuantityRow>

                <AddToCartButton
                  productId={keyboard.id}
                  disabled={!inStock}
                  size="large"
                  initialQuantity={quantity}
                />
              </ActionSection>
            </DetailsCard>
          </div>
        </ContentGrid>

        <CommentsSection>
          <CommentList
            entityType="Product"
            entityId={keyboard.id}
            currentUserId={user?.id}
            isAuthenticated={isAuthenticated}
          />
        </CommentsSection>
      </Container>
    </PageContainer>
  );
};

export default KeyboardDetails;
