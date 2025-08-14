import React, { useEffect, useState, useContext } from "react";
import basketService from "../../API/basketService";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const BasketList = ({ forCurrentUser = false }) => {
  const { user } = useContext(AuthContext);
  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBaskets = async () => {
      setLoading(true);
      if (forCurrentUser && user?.id) {
        const data = await basketService.getBasketByUserId(user.id);
        setBaskets([data].filter(Boolean));
      } else {
        const data = await basketService.getAllBaskets();
        setBaskets(data);
      }
      setLoading(false);
    };
    fetchBaskets();
  }, [forCurrentUser, user?.id]);

  if (loading) return <div>Loading baskets...</div>;
  if (!baskets.length) return <div>No baskets found.</div>;

  return (
    <div>
      <h2>{forCurrentUser ? "Your Basket" : "All Baskets"}</h2>
      <ul>
        {baskets.map((basket) => (
          <li key={basket.id}>
            Basket #{basket.id} - {basket.status}
            <button onClick={() => navigate(`/basket/${basket.id}`)}>
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasketList;
