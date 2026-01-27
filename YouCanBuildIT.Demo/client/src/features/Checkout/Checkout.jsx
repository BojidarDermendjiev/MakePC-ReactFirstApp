import { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import shoppingCartService from "../../api/shoppingCartService.js";
import orderService from "../../api/orderService.js";
import { AuthContext } from "../../context/AuthContextProvider";
import { navigation } from "../../common/navigations";
import { TURNSTILE_SITE_KEY, TURNSTILE_THEME } from "../../config/turnstile";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #eee;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: #333;
`;

const Subtitle = styled.p`
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #1976d2;
    color: white;
    border-radius: 50%;
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const OrderSummary = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 24px;
`;

const SummaryTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #333;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  background: #eee;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemInfo = styled.span`
  font-size: 12px;
  color: #666;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1976d2;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: ${(props) => (props.$bold ? "#333" : "#666")};
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 8px;
  border-top: 2px solid #eee;
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const TotalAmount = styled.span`
  color: #1976d2;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border: none;
  border-radius: 8px;
  background: #1976d2;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #1565c0;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const BackToCartLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 12px;
  color: #1976d2;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 18px;
  color: #666;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h2 {
    margin-bottom: 8px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #1565c0;
  }
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background: #ffebee;
  border-radius: 8px;
  color: #c62828;
  font-size: 14px;
  margin-bottom: 16px;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${(props) => (props.$selected ? "#1976d2" : "#ddd")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #1976d2;
  }

  input {
    width: 18px;
    height: 18px;
  }
`;

const PaymentLabel = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await shoppingCartService.getCartByUserId(user.id);
        setCart(data);
        if (user.fullName) {
          setShippingInfo((prev) => ({
            ...prev,
            fullName: user.fullName?.value || user.fullName || "",
            email: user.email?.value || user.email || "",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  // Load Turnstile script and render widget
  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: TURNSTILE_THEME,
          callback: (token) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        });
      }
    };

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ["fullName", "address", "city", "postalCode", "country"];
    for (const field of required) {
      if (!shippingInfo[field].trim()) {
        return `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const items = cart.items || [];
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal > 100 ? 0 : 9.99;
      const total = subtotal + shipping;

      const fullAddress = `${shippingInfo.fullName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

      const orderData = {
        userId: user.id,
        shippingAddress: fullAddress,
        paymentStatus: paymentMethod === "card" ? "Card Payment Pending" : "Cash on Delivery",
        totalPrice: total,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        turnstileToken: turnstileToken,
      };

      const createdOrder = await orderService.createOrder(orderData);

      // Clear the cart after successful order
      await shoppingCartService.clearCart(user.id);

      // Navigate to success page
      navigate(navigation.getOrderSuccessUrl(createdOrder.id));
    } catch (err) {
      console.error("Failed to create order:", err);
      setError(err.message || "Failed to place order. Please try again.");
      // Reset Turnstile on error
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>Loading checkout...</LoadingContainer>
      </Container>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Checkout</Title>
        </Header>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before proceeding to checkout.</p>
          <ShopButton to="/products">Browse Products</ShopButton>
        </EmptyCart>
      </Container>
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <Container>
      <Header>
        <Title>Checkout</Title>
        <Subtitle>Complete your order by filling in the details below</Subtitle>
      </Header>

      <CheckoutLayout>
        <div>
          <Section>
            <SectionTitle>
              <span>1</span> Shipping Information
            </SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>Address *</Label>
                <TextArea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite, etc."
                  required
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Postal Code *</Label>
                  <Input
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>Country *</Label>
                <Input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  required
                />
              </FormGroup>
            </Form>
          </Section>

          <Section>
            <SectionTitle>
              <span>2</span> Payment Method
            </SectionTitle>
            <PaymentOptions>
              <PaymentOption $selected={paymentMethod === "card"}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <PaymentLabel>
                  <h4>Credit/Debit Card</h4>
                  <p>Pay securely with your card</p>
                </PaymentLabel>
              </PaymentOption>
              <PaymentOption $selected={paymentMethod === "cod"}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <PaymentLabel>
                  <h4>Cash on Delivery</h4>
                  <p>Pay when you receive your order</p>
                </PaymentLabel>
              </PaymentOption>
            </PaymentOptions>
          </Section>
        </div>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>

          <CartItems>
            {items.map((item) => (
              <CartItem key={item.productId}>
                <ItemImage>
                  <img
                    src={item.imageUrl || "/placeholder-product.png"}
                    alt={item.productName}
                    onError={(e) => {
                      e.target.src = "/placeholder-product.png";
                    }}
                  />
                </ItemImage>
                <ItemDetails>
                  <ItemName title={item.productName}>{item.productName}</ItemName>
                  <ItemInfo>Qty: {item.quantity}</ItemInfo>
                </ItemDetails>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </CartItem>
            ))}
          </CartItems>

          <Divider />

          <SummaryRow>
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </SummaryRow>
          {shipping === 0 && (
            <SummaryRow style={{ color: "#4CAF50", fontSize: "12px" }}>
              <span>Free shipping applied!</span>
            </SummaryRow>
          )}

          <TotalRow>
            <span>Total</span>
            <TotalAmount>${total.toFixed(2)}</TotalAmount>
          </TotalRow>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* Cloudflare Turnstile widget */}
          <div
            ref={turnstileRef}
            style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}
          ></div>

          <PlaceOrderButton
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Place Order"}
          </PlaceOrderButton>

          <BackToCartLink to="/cart">Back to Cart</BackToCartLink>
        </OrderSummary>
      </CheckoutLayout>
    </Container>
  );
};

export default Checkout;
