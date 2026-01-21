import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import basketService from "../../api/basketService";

const BasketDetails = () => {
  const { id } = useParams();
  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    basketService
      .getBasketById(id)
      .then(setBasket)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading basket...</div>;
  if (!basket) return <div>Basket not found.</div>;

  return (
    <div>
      <button onClick={() => navigate("/shop-basket")}>Back to Baskets</button>
      <h2>Basket #{basket.id}</h2>
      <div>Status: {basket.status}</div>
      <div>
        Items:
        <ul>
          {basket.items?.map((item) => (
            <li key={item.productId}>
              {item.productName} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BasketDetails;
