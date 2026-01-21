import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import orderService from "../../api/orderService.js";
import { navigation } from "../../common/navigations";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 24px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
    height: 40px;
    stroke: white;
    stroke-width: 3;
  }
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 32px;
  color: #333;
`;

const Subtitle = styled.p`
  margin: 0 0 32px 0;
  font-size: 16px;
  color: #666;
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  text-align: left;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

const OrderNumber = styled.div`
  h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const OrderStatus = styled.span`
  padding: 8px 16px;
  background: ${(props) => {
    switch (props.$status?.toLowerCase()) {
      case "completed":
        return "#e8f5e9";
      case "pending":
        return "#fff3e0";
      case "cancelled":
        return "#ffebee";
      default:
        return "#e3f2fd";
    }
  }};
  color: ${(props) => {
    switch (props.$status?.toLowerCase()) {
      case "completed":
        return "#2e7d32";
      case "pending":
        return "#ef6c00";
      case "cancelled":
        return "#c62828";
      default:
        return "#1565c0";
    }
  }};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  h5 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1976d2;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const SummaryItem = styled.div`
  p {
    margin: 0 0 4px 0;
    font-size: 12px;
    color: #666;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid #eee;
  margin-top: 16px;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const TotalAmount = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #1976d2;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  padding: 14px 28px;
  background: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #1565c0;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: 14px 28px;
  background: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
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

const ErrorContainer = styled.div`
  text-align: center;
  padding: 48px;

  h2 {
    margin-bottom: 8px;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 24px;
  }
`;

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>Loading order details...</LoadingContainer>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container>
        <ErrorContainer>
          <h2>Order Not Found</h2>
          <p>We could not find the order you are looking for.</p>
          <PrimaryButton to={navigation.getOrdersUrl()}>View All Orders</PrimaryButton>
        </ErrorContainer>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container>
      <SuccessIcon>
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </SuccessIcon>

      <Title>Order Placed Successfully!</Title>
      <Subtitle>
        Thank you for your purchase. A confirmation email has been sent to your email address.
      </Subtitle>

      <OrderCard>
        <OrderHeader>
          <OrderNumber>
            <h3>Order #{order.id}</h3>
            <p>Placed on {formatDate(order.orderDate)}</p>
          </OrderNumber>
          <OrderStatus $status={order.paymentStatus}>
            {order.paymentStatus}
          </OrderStatus>
        </OrderHeader>

        <Section>
          <SectionTitle>Items Ordered</SectionTitle>
          <ItemsList>
            {order.items?.map((item) => (
              <OrderItem key={item.id}>
                <ItemInfo>
                  <h5>{item.productName}</h5>
                  <p>Qty: {item.quantity} x ${item.unitPrice?.toFixed(2)}</p>
                </ItemInfo>
                <ItemPrice>${(item.quantity * item.unitPrice).toFixed(2)}</ItemPrice>
              </OrderItem>
            ))}
          </ItemsList>
        </Section>

        <Section>
          <SectionTitle>Delivery Details</SectionTitle>
          <SummaryGrid>
            <SummaryItem>
              <p>Shipping Address</p>
              <span>{order.shippingAddress}</span>
            </SummaryItem>
            <SummaryItem>
              <p>Payment Method</p>
              <span>{order.paymentStatus}</span>
            </SummaryItem>
          </SummaryGrid>
        </Section>

        <TotalSection>
          <TotalLabel>Total Amount</TotalLabel>
          <TotalAmount>${order.totalPrice?.toFixed(2)}</TotalAmount>
        </TotalSection>
      </OrderCard>

      <ButtonsContainer>
        <SecondaryButton to={navigation.getOrdersUrl()}>View All Orders</SecondaryButton>
        <PrimaryButton to={navigation.getProductsUrl()}>Continue Shopping</PrimaryButton>
      </ButtonsContainer>
    </Container>
  );
};

export default OrderSuccess;
