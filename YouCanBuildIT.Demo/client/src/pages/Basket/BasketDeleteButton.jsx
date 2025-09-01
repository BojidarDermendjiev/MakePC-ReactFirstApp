
import basketService from "../../API/basketService";
import { useNavigate } from "react-router-dom";

const BasketDeleteButton = ({ basketId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this basket?")) {
      await basketService.deleteBasket(basketId);
      navigate("/shop-basket");
    }
  };

  return <button onClick={handleDelete}>Delete Basket</button>;
};

export default BasketDeleteButton;
