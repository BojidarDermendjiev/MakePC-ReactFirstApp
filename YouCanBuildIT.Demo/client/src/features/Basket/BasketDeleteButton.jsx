import PropTypes from "prop-types";
import basketService from "../../api/basketService";
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

BasketDeleteButton.propTypes = {
  basketId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BasketDeleteButton;
